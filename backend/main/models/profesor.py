from .. import db


class Profesor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, nullable=False)
    especialidad = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<Alumno: %r >' % (self.id)

    def to_json(self):
        clase_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'especialidad': self.especialidad,
        }
        return clase_json

    @staticmethod
    def from_json(clase_json):
        id = clase_json.get('id')
        id_usuario = clase_json.get('id_usuario')
        especialidad = clase_json.get('especialidad')
        return Profesor(id=id,
                    id_usuario=id_usuario,
                    especialidad=especialidad
                    )

