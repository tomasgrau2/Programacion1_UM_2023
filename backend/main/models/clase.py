from .. import db

class Clase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    horario = db.Column(db.DateTime, nullable=False)
    def __repr__(self):
        return '<Clase: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        clase_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'horario': self.horario,
        }
        return clase_json

    def to_json_short(self):
        clase_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'horario': self.horario,
        }
        return clase_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(clase_json):
        id = clase_json.get('id')
        nombre = clase_json.get('nombre')
        horario = clase_json.get('horario')
        return Clase(id=id,
                    nombre=nombre,
                    horario=horario
                    )