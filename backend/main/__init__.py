from flask import Flask
from dotenv import load_dotenv

#Importamos nuevas librerias clase 3
from flask_restful import Api #Agrego la clase Api

#Importo dir de recursos 
import main.resources as resources

#Inicio Restful
api = Api()

#Metodo que inicializa la app
def create_app():
    #Inicio Flask
    app = Flask(__name__)

    #variables de entorno
    load_dotenv()
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
    
    #Cargar la aplicacion en la API de Flask Restful
    #es para que la aplicacion de flask funcione como API
    api.init_app(app)

    #Por ultimo retornamos la aplicacion inicializada
    return app