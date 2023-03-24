import os
from flask import Flask
from dotenv import load_dotenv

#Metodo que inicializa la app
def create_app():
    #Inicio Flask
    app = Flask(__name__)

    #variables de entorno
    load_dotenv()

    #Iniciamos los demas modulos de la app

    #Por ultimo retornamos la aplicacion inicializada
    return app