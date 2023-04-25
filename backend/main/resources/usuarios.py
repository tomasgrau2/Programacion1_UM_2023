from flask_restful import Resource
from flask import request, jsonify
from .. import db
from main.models import UsuarioModel

# #Datos de prueba en JSON
# USUARIOS = {
#     1: {'nombre':'Carlos', 'apellido':'Samso'},
#     2: {'nombre':'Guillermo', 'apellido':'Freytes'},
#     3: {'nombre':'Eduardo', 'apellido':'Grau'}
# }

# USUARIOS_ALUMNOS = {
#     1: {'nombre':'Charlie', 'apellido':'Messi'},
#     2: {'nombre':'William', 'apellido':'Di Maria'},
#     3: {'nombre':'Edward', 'apellido':'Montiel'}
# }

# USUARIOS_PROFESORES = {
#     1: {'nombre':'Pepe', 'apellido':'Argento'},
#     2: {'nombre':'Monica', 'apellido':'Argento'},
#     3: {'nombre':'Stephen', 'apellido':'Perez'}
# }

#Defino el recurso usuario
class Usuario(Resource): #A la clase usuario le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json()
    
    #eliminar recurso
    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204
    
    #Modificar el recurso usuario
    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201

#Coleccion de recurso Usuarios
class Usuarios(Resource):
    #obtener lista de los usuarios
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()
        return jsonify([usuario.to_json() for usuario in usuarios])
    
# def get(self):
#         animales = db.session.query(AnimalModel).all()
#         return jsonify([animal.to_json() for animal in animales])

    #insertar recurso
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json())
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201





