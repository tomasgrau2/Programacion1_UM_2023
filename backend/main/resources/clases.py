# ProfesorClases
from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ClaseModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

class Clases(Resource):
    @jwt_required()
    @role_required(roles = ['admin', 'profesor','alumno'])
    def get(self):
        page = 1
        per_page = 10
        clases = db.session.query(ClaseModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))


        #Obtener valor paginado
        clases = clases.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)


        return jsonify({'clases': [clase.to_json() for clase in clases],
                  'total': clases.total,
                  'pages': clases.pages,
                  'page': page
                })
        
    
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def post(self):
        clases = ClaseModel.from_json(request.get_json())
        print(clases)
        try:
            db.session.add(clases)
            db.session.commit()
        except:
            return 'Formato no correcto', 400
        return clases.to_json(), 201


class Clase(Resource):
    @jwt_required()
    @role_required(roles = ['admin', 'profesor','alumno'])
    def get(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        return clase.to_json()
    
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def delete(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        db.session.delete(clase)
        db.session.commit()
        return '', 204
    
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def put(self, id):
        clase = db.session.query(ClaseModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(clase, key, value)
        db.session.add(clase)
        db.session.commit()
        return clase.to_json() , 201