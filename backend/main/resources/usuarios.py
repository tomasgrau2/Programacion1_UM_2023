from flask_restful import Resource
from flask import request
from .. import db
from main.models import UsuariosModel

#Datos de prueba en JSON
USUARIOS = {
    1: {'nombre':'Carlos', 'apellido':'Samso'},
    2: {'nombre':'Guillermo', 'apellido':'Freytes'},
    3: {'nombre':'Eduardo', 'apellido':'Grau'}
}

USUARIOS_ALUMNOS = {
    1: {'nombre':'Charlie', 'apellido':'Messi'},
    2: {'nombre':'William', 'apellido':'Di Maria'},
    3: {'nombre':'Edward', 'apellido':'Montiel'}
}

USUARIOS_PROFESORES = {
    1: {'nombre':'Pepe', 'apellido':'Argento'},
    2: {'nombre':'Monica', 'apellido':'Argento'},
    3: {'nombre':'Stephen', 'apellido':'Perez'}
}

#Defino el recurso usuario
class Usuario(Resource): #A la clase usuario le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        #Verifico que exista el usuario
        if int(id) in USUARIOS:
            #retorno usuario
            return USUARIOS[int(id)]
        #Si no existe 404
        return '', 404
    #eliminar recurso
    def delete(self, id):
        #Verifico que exista el usuario
        if int(id) in USUARIOS:
            #elimino usuario
            del USUARIOS[int(id)]
            return '', 204
        #Si no existe 404
        return '', 404
    #Modificar el recurso usuario
    def put(self, id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            data = request.get_json()
            usuario.update(data)
            return '', 201
        return '', 404

#Coleccion de recurso Usuarios
class Usuarios(Resource):
    #obtener lista de los usuarios
    def get(self):
        return USUARIOS
    #insertar recurso
    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys()))+1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201


class UsuariosAlumnos(Resource):
    #obtener lista de los alumnos
    def get(self):
        return USUARIOS_ALUMNOS
    #insertar recurso
    def post(self):
        alumno = request.get_json()
        id = int(max(USUARIOS_ALUMNOS.keys()))+1
        USUARIOS_ALUMNOS[id] = alumno
        return USUARIOS_ALUMNOS[id], 201
    
class UsuarioAlumno(Resource): #A la clase usuarioalumno le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        #Verifico que exista el usuario
        if int(id) in USUARIOS_ALUMNOS:
            #retorno usuario
            return USUARIOS_ALUMNOS[int(id)]
        #Si no existe 404
        return '', 404
    #eliminar recurso
    def delete(self, id):
        #Verifico que exista el usuario
        if int(id) in USUARIOS_ALUMNOS:
            #elimino usuario
            del USUARIOS_ALUMNOS[int(id)]
            return '', 204
        #Si no existe 404
        return '', 404
    #Modificar el recurso usuario
    def put(self, id):
        if int(id) in USUARIOS_ALUMNOS:
            alumno = USUARIOS_ALUMNOS[int(id)]
            data = request.get_json()
            alumno.update(data)
            return '', 201
        return '', 404


class UsuarioProfesor(Resource): #A la clase UsuarioProfesor le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    def get(self, id):
        #Verifico que exista el profesor
        if int(id) in USUARIOS_PROFESORES:
            #retorno profesor
            return USUARIOS_PROFESORES[int(id)]
        #Si no existe 404
        return '', 404

    #Modificar el recurso usuario_alumno
    def put(self, id):
        if int(id) in USUARIOS_ALUMNOS:
            usuario_alumno = USUARIOS_ALUMNOS[int(id)]
            data = request.get_json()
            usuario_alumno.update(data)
            return '', 201
        return '', 404




