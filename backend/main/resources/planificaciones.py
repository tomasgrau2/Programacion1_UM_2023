# Planificaion, PlanificacionAlumno, PlanificacionesProfesores, 
from flask_restful import Resource
from flask import request
from .. import db
from main.models import PlanificacionModel

# from .usuarios import USUARIOS_ALUMNOS

# PLANIFICACIONES = {
#     1: {'nombre':'PLANIFICACION 1', 'Ejercicios':'Press de banca 4x10, Biceps 4x10, Remo 3x15, Abdominales 4x15'},
#     2: {'nombre':'PLANIFICACION 2', 'Ejercicios':'Sentadillas 4x10, Estocadas 4x8, Peso Muerto 4x10, Press de banca 4x10'},
#     3: {'nombre':'PLANIFICACION 3', 'Ejercicios':'Estocadas 4x8, Espinales 4x15, Dominadas: MAXx3, Cargada: 3x10'}
# }

# PLANIFICACIONES_ALUMNOS = {
#     1: {'Alumno': 'Charlie Messi' , 'Planificacion': str(PLANIFICACIONES[1])},
#     2: {'Alumno': 'William Di Maria', 'Planificacion': str(PLANIFICACIONES[2])},
#     3: {'Alumno': 'Edward Montiel', 'Planificacion': str(PLANIFICACIONES[3])}
# }


class Planificaciones(Resource):
    def get(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion.to_json()
    
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json() , 201
    
    