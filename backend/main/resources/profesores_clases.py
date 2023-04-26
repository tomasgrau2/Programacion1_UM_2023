from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import ProfesorClaseModel


class ProfesoresClases(Resource):
    def get(self):
        profesores_cl = db.session.query(ProfesorClaseModel).all()
        return jsonify([profesor.to_json() for profesor in profesores_cl])
    
    
class ProfesorClase(Resource):  
    def get(self, id):
        profesor_cl = db.session.query(ProfesorClaseModel).get_or_404(id)
        return profesor_cl.to_json()
    

    def delete(self, id):
        profesor_cl = db.session.query(ProfesorClaseModel).get_or_404(id)
        db.session.delete(profesor_cl)
        db.session.commit()
        return '', 204

    def post(self):
        profesor_cl = ProfesorClaseModel.from_json(request.get_json())
        db.session.add(profesor_cl)
        db.session.commit()
        return profesor_cl.to_json(), 201