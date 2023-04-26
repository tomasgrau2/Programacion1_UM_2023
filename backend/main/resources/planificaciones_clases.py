from flask_restful import Resource
from flask import request
from .. import db
from main.models import PlanificacionClaseModel

class PlanificacionesClases(Resource):
    def get(self, id):
        planificacion_cl = db.session.query(PlanificacionClaseModel).get_or_404(id)
        return planificacion_cl.to_json()
    
    def put(self, id):
        planificacion_cl = db.session.query(PlanificacionClaseModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion_cl, key, value)
        db.session.add(planificacion_cl)
        db.session.commit()
        return planificacion_cl.to_json() , 201

    def delete(self, id):
        planificacion_cl = db.session.query(PlanificacionClaseModel).get_or_404(id)
        db.session.delete(planificacion_cl)
        db.session.commit()
        return '', 204

    def post(self):
        planificaciones_cl = PlanificacionClaseModel.from_json(request.get_json())
        db.session.add(planificaciones_cl)
        db.session.commit()
        return planificaciones_cl.to_json(), 201