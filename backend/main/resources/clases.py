# ProfesorClases
from flask_restful import Resource
from flask import request
from .. import db
from main.models import ClassModel

#Datos de prueba de JSON

# CLASESPROFESORES = {
#     1: {'nombre':'Pepe', 'apellido':'Argento', 'clase':'Crossfit'},
#     2: {'nombre':'Monica', 'apellido':'Argento', 'clase':'Pesas'},
#     3: {'nombre':'Stephen', 'apellido':'Perez', 'clase':'Zumba'}
# }

class ClasesProfesores(Resource):
    def get(self):
        clase = db.session.query(ClassModel).get_or_404(id)
        return clase.to_json()