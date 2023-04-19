from flask import Flask
from dotenv import load_dotenv
import os

#Importamos nuevas librerias clase 3
from flask_restful import Api #Agrego la clase Api

#Importar SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

#Importo dir de recursos 
import main.resources as resources

#Inicio Restful
api = Api()

#Inicializar SQLAlchemy
db = SQLAlchemy()

#Metodo que inicializa la app
def create_app():
    #Inicio Flask
    app = Flask(__name__)

    #variables de entorno
    load_dotenv()

    # Si no existe el archivo de base de datos, crearlo (solo válido si se utiliza sqlite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    #cargar a la API el recurso Animales y especificar la ruta 
    api.add_resource(resources.AnimalesResource, '/animales')
    #cargar a la API el recurso Animal y especificar la ruta 
    api.add_resource(resources.AnimalResource, '/animal/<id>')

    api.add_resource(resources.UsuariosResource, '/usuarios')

    api.add_resource(resources.UsuarioResource, '/usuario/<id>')

    api.add_resource(resources.UsuariosAlumnosResource, '/alumnos')

    api.add_resource(resources.UsuarioAlumnoResource, '/alumno/<id>')

    api.add_resource(resources.UsuariosProfesoresResource, '/profesor/<id>')

    api.add_resource(resources.ClasesProfesoresResource, '/clases')

    api.add_resource(resources.LoginResource, '/login')
    
    api.add_resource(resources.PagoResource, '/pagos/<id>')

    api.add_resource(resources.PlanificacionAlumnoResource, '/planificacion_alum/<id>')

    api.add_resource(resources.PlanificacionProfesoresResource, '/planificacion_prof/<id>')
    
    api.add_resource(resources.PlanificacionesProfesoresResource, '/planificaciones')
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #Url de configuracion de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    #Cargar la aplicacion en la API de Flask Restful
    #es para que la aplicacion de flask funcione como API
    api.init_app(app)

    #Por ultimo retornamos la aplicacion inicializada
    return app