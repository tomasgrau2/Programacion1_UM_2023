# Planificaion, PlanificacionAlumno, PlanificacionesProfesores, 
from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PlanificacionModel, ClaseModel

class Planificaciones(Resource):
    def get(self):
        page = 1
        per_page = 10
        planificaciones = db.session.query(PlanificacionModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        planificaciones = planificaciones.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'planificaciones': [planificacion.to_json() for planificacion in planificaciones],
                  'total': planificaciones.total,
                  'pages': planificaciones.pages,
                  'page': page
                })
    
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json() , 201
    
    def post(self):
        clases_ids = request.get_json().get('clases')
        planificacion = PlanificacionModel.from_json(request.get_json())
        
        if clases_ids:
            clases = ClaseModel.query.filter(ClaseModel.id.in_(clases_ids)).all()
            planificacion.clases.extend(clases)
            
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json(), 201
    
class Planificacion(Resource): #A la clase usuario le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion.to_json()
    
    #eliminar recurso
    def delete(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion)
        db.session.commit()
        return '', 204
    
    #Modificar el recurso usuario
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json() , 201