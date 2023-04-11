# ProfesorClases
from flask_restful import Resource
from flask import request

#Datos de prueba de JSON

CLASESPROFESORES = {
    1: {'nombre':'Pepe', 'apellido':'Argento', 'clase':'Crossfit'},
    2: {'nombre':'Monica', 'apellido':'Argento', 'clase':'Pesas'},
    3: {'nombre':'Stephen', 'apellido':'Perez', 'clase':'Zumba'}
}

class ClasesProfesores(Resource):
    def get(self):
        return CLASESPROFESORES