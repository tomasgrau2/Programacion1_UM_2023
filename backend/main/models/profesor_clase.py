from .. import db

class ProfesorClase(db.Model):
    id_profesor = db.Column(db.Integer, nullable=False)
    id_clase = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<ProfesorClase: %r >' % (self.nombre)
    #Convertir objeto en JSON
    def to_json(self):
        profesorclase_json = {
            'id_profesor': self.id_profesor,
            'id_clase': self.id_clase,
        }
        return profesorclase_json

    def to_json_short(self):
        profesorclase_json = {
            'id_profesor': self.id_profesor,
            'id_clase': self.id_clase,
        }
        return profesorclase_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(profesorclase_json):
        id_profesor = profesorclase_json.get('id_profesor')
        id_clase = profesorclase_json.get('id_clase')
        return ProfesorClase(id=id,
                    nombre=nombre,
                    id_clase=
                    )