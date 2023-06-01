import os

from flask import Flask
from dotenv import load_dotenv

#Importamos nuevas librerias clase 3
from flask_restful import Api #Agrego la clase Api

#Importar SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

#Importar Flask JWT
from flask_jwt_extended import JWTManager

#Inicio Restful
api = Api()

#Inicializar SQLAlchemy
db = SQLAlchemy()

#Inicializar JWT
jwt = JWTManager()

#Metodo que inicializa la app
def create_app():
    #Inicio Flask
    app = Flask(__name__)

    #variables de entorno
    load_dotenv()

    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Url de configuración de base de datos
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')

    db.init_app(app)

    #Importar directorio de recursos
    import main.resources as resources

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

    #Cargar la aplicacion en la API de Flask Restful
    #es para que la aplicacion de flask funcione como API
    api.init_app(app)

    #Cargar clave secreta
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    
    #Cargar tiempo de expiración de los tokens
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))

    jwt.init_app(app)

    from main.auth import routes
    #Importar blueprint
    app.register_blueprint(routes.auth)

    #Por ultimo retornamos la aplicacion inicializada
    return app