from .. import db 

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return '<Usuarios: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        usuarios_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': int(self.dni),
            'edad': int(self.edad),
            'email':str(self.email),
            'contrasena': str(self.contrasena)
        }
        return usuarios_json

    def to_json_short(self):
        usuarios_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': int(self.dni),
            'edad': int(self.edad),
            'email':str(self.email),
            'contrasena': str(self.contrasena)
        }
        return usuarios_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuarios_json):
        id = usuarios_json.get('id')
        nombre = usuarios_json.get('nombre')
        apellido = usuarios_json.get('apellido')
        dni = usuarios_json.get('dni')
        edad = usuarios_json.get('edad')
        email = usuarios_json.get('email')
        contrasena = usuarios_json.get('contrasena')
        return Usuarios(id=id,
                    nombre=nombre,
                    )