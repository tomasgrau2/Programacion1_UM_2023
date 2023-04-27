
from .. import db

class ProfesorClase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_profesor = db.Column(db.Integer, nullable=False)
    id_clase = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<ProfesorClase: %r >' % (self.id_profesor)
    #Convertir objeto en JSON
    def to_json(self):
        profesorclase_json = {
            'id': self.id,
            'id_profesor': self.id_profesor,
            'id_clase': self.id_clase,
        }
        return profesorclase_json

    def to_json_short(self):
        profesorclase_json = {
            'id': self.id,
            'id_profesor': self.id_profesor,
            'id_clase': self.id_clase,
        }
        return profesorclase_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(profesorclase_json):
        id = profesorclase_json.get('id')
        id_profesor = profesorclase_json.get('id_profesor')
        id_clase = profesorclase_json.get('id_clase')
        return ProfesorClase(
                    id=id,
                    id_profesor=id_profesor,
                    id_clase=id_clase
                    )