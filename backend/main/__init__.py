import os

from flask import Flask
from dotenv import load_dotenv

#Importamos nuevas librerias clase 3
from flask_restful import Api #Agrego la clase Api

#Importar SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

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

    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    # if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
    #     os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))
    

    if not os.path.exists(('/home/tomas_grau/Desktop/Programacion oficial/Programacion1_UM_2023/backend/')+('clase4.db')):
        os.mknod(('/home/tomas_grau/Desktop/Programacion oficial/Programacion1_UM_2023/backend/')+('clase4.db'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Url de configuración de base de datos
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+('/home/tomas_grau/Desktop/Programacion oficial/Programacion1_UM_2023/backend/')+('clase4.db')
    db.init_app(app)

    #Importar directorio de recursos
    import main.resources as resources

    #cargar a la API el recurso Animales y especificar la ruta 
    api.add_resource(resources.AnimalesResource, '/animales')
    #cargar a la API el recurso Animal y especificar la ruta 
    api.add_resource(resources.AnimalResource, '/animal/<id>')

    api.add_resource(resources.UsuariosResource, '/usuarios')

    api.add_resource(resources.UsuarioResource, '/usuario/<id>')

    api.add_resource(resources.UsuariosAlumnosResource, '/alumnos')

    api.add_resource(resources.UsuarioAlumnoResource, '/alumno/<id>')

    api.add_resource(resources.UsuarioProfesorResource, '/profesor/<id>')

    api.add_resource(resources.UsuariosProfesoresResource, '/profesores')

    api.add_resource(resources.ClasesResource, '/clases')

    api.add_resource(resources.ClaseResource, '/clases/<id>')

    api.add_resource(resources.LoginResource, '/login')
    
    api.add_resource(resources.PagoResource, '/pagos/<id>')

    api.add_resource(resources.PlanificacionesResource, '/planificaciones')
    
    api.add_resource(resources.PlanificacionResource, '/planificaciones/<id>')

    api.add_resource(resources.PlanificacionClasesResource, '/planificaciones_clases/<id>')

    api.add_resource(resources.ProfesoresClasesResource, '/profesores_clases')

    api.add_resource(resources.ProfesorClaseResource, '/profesores_clases/<id>')

    #Cargar la aplicacion en la API de Flask Restful
    #es para que la aplicacion de flask funcione como API
    api.init_app(app)

    #Por ultimo retornamos la aplicacion inicializada
    return app