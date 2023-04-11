# Planificaion, PlanificacionAlumno, PlanificacionesProfesores, 
from flask_restful import Resource
from flask import request

from .usuarios import USUARIOS_ALUMNOS

PLANIFICACIONES = {
    1: {'nombre':'PLANIFICACION 1', 'Ejercicios':'Press de banca 4x10, Biceps 4x10, Remo 3x15, Abdominales 4x15'},
    2: {'nombre':'PLANIFICACION 2', 'Ejercicios':'Sentadillas 4x10, Estocadas 4x8, Peso Muerto 4x10, Press de banca 4x10'},
    3: {'nombre':'PLANIFICACION 3', 'Ejercicios':'Estocadas 4x8, Espinales 4x15, Dominadas: MAXx3, Cargada: 3x10'}
}

PLANIFICACIONES_ALUMNOS = {
    1: {'Alumno': 'Charlie Messi' , 'Planificacion': str(PLANIFICACIONES[1])},
    2: {'Alumno': 'William Di Maria', 'Planificacion': str(PLANIFICACIONES[2])},
    3: {'Alumno': 'Edward Montiel', 'Planificacion': str(PLANIFICACIONES[3])}
}


class PlanificacionAlumno(Resource):
    def get(self, id):
        #Verifico que exista
        if int(id) in PLANIFICACIONES_ALUMNOS:
            #retorno
            return PLANIFICACIONES_ALUMNOS[int(id)]
        #Si no existe 404
        return '', 404
    
    
class PlanificacionesProfesores(Resource):
    def get(self):
        return PLANIFICACIONES
    #insertar recurso
    def post(self):
        planificacion = request.get_json()
        id = int(max(PLANIFICACIONES.keys()))+1
        PLANIFICACIONES[id] = planificacion
        return PLANIFICACIONES[id], 201
    

class PlanificacionProfesores(Resource):
    #obtener recurso
    def get(self, id):
        #Verifico que exista la planificacion
        if int(id) in PLANIFICACIONES:
            #retorno usuario
            return PLANIFICACIONES[int(id)]
        #Si no existe 404
        return '', 404
    #eliminar recurso
    def delete(self, id):
        #Verifico que exista el usuario
        if int(id) in PLANIFICACIONES:
            #elimino usuario
            del PLANIFICACIONES[int(id)]
            return '', 204
        #Si no existe 404
        return '', 404
    #Modificar el recurso planificaciones
    def put(self, id):
        if int(id) in PLANIFICACIONES:
            planificacion = PLANIFICACIONES[int(id)]
            data = request.get_json()
            planificacion.update(data)
            return '', 201
        return '', 404