from .. import db 

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.Integer, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return '<Usuario: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': int(self.dni),
            'edad': int(self.edad),
            'email':str(self.email),
            'contrasena': str(self.contrasena),

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'apellido': str(self.apellido),
            'dni': int(self.dni),
            'edad': int(self.edad),
            'email':str(self.email),
            'contrasena': str(self.contrasena),
            
        }
        return usuario_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        id = usuario_json.get('id')
        nombre = usuario_json.get('nombre')
        apellido = usuario_json.get('apellido')
        dni = usuario_json.get('dni')
        edad = usuario_json.get('edad')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        return Usuario(id=id,
                    nombre=nombre,
                    apellido=apellido,
                    dni=dni,
                    edad=edad,
                    email=email,
                    contrasena=contrasena
                    )