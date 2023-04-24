from .. import db 

class Usuarios(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    def __repr__(self):
        return '<Usuarios: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        usuarios_json = {
            'id': self.id,
            'nombre': str(self.nombre),

        }
        return usuarios_json

    def to_json_short(self):
        usuarios_json = {
            'id': self.id,
            'nombre': str(self.nombre),

        }
        return usuarios_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuarios_json):
        id = usuarios_json.get('id')
        nombre = usuarios_json.get('nombre')
        return Usuarios(id=id,
                    nombre=nombre,
                    )