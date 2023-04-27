from .. import db
from . import ProfesorModel

class Clase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    id_profesor = db.Column(db.Integer, db.ForeignKey('profesor.id'))
    horario = db.Column(db.String(100), nullable=False)
    r_profesor = db.relationship("Profesor", back_populates="r_profesor")
    
    def __repr__(self):
        return '<Clase: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        self.profesor = db.session.query(ProfesorModel).get_or_404(self.id_profesor)
        clase_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'horario': self.horario,
            'profesor': self.profesor.to_json()
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