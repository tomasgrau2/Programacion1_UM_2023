from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import AlumnoModel, PlanificacionModel

class UsuariosAlumnos(Resource):
    #obtener lista de los alumnos
    def get(self):
        alumnos = db.session.query(AlumnoModel).all()
        return jsonify([alumno.to_json() for alumno in alumnos])
    
    def post(self):
        planificaciones_ids = request.get_json().get('planificaciones')
        alumno = AlumnoModel.from_json(request.get_json())
        
        if planificaciones_ids:
            planificaciones = PlanificacionModel.query.filter(PlanificacionModel.id.in_(planificaciones_ids)).all()
            alumno.planificaciones.extend(planificaciones)
            
        db.session.add(alumno)
        db.session.commit()
        return alumno.to_json(), 201
class UsuarioAlumno(Resource): #A la clase usuarioalumno le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        alumno = db.session.query(AlumnoModel).get_or_404(id)
        return alumno.to_json()
    
    #eliminar recurso
    def delete(self, id):
        alumno = db.session.query(AlumnoModel).get_or_404(id)
        db.session.delete(alumno)
        db.session.commit()
        return '', 204
    #Modificar el recurso usuario
    
    def put(self, id):
        alumno = db.session.query(AlumnoModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(alumno, key, value)
        db.session.add(alumno)
        db.session.commit()
        return alumno.to_json() , 201
