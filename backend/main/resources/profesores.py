from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ProfesorModel, ClaseModel



class UsuariosProfesores(Resource):
    #obtener lista de los Profesores
    def get(self):
        page = 1
        per_page = 10
        profesores = db.session.query(ProfesorModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))
        
        profesores = profesores.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'profesores': [profesor.to_json() for profesor in profesores],
                  'total': profesores.total,
                  'pages': profesores.pages,
                  'page': page
                })
    
    def post(self):
        clases_ids = request.get_json().get('clases')
        profesor = ProfesorModel.from_json(request.get_json())
        
        if clases_ids:
            clases = ClaseModel.query.filter(ClaseModel.id.in_(clases_ids)).all()
            profesor.clases.extend(clases)
            
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json(), 201

class UsuarioProfesor(Resource): #A la clase UsuarioProfesor le indico que va a ser del tipo recurso(Resource)
    def get(self, id):
        profesor = db.session.query(ProfesorModel).get_or_404(id)
        return profesor.to_json()
    
    def delete(self, id):
        profesor = db.session.query(ProfesorModel).get_or_404(id)
        db.session.delete(profesor)
        db.session.commit()
        return '', 204
    
    #Modificar el recurso usuario
    def put(self, id):
        profesor = db.session.query(ProfesorModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(profesor, key, value)
        db.session.add(profesor)
        db.session.commit()
        return profesor.to_json() , 201
