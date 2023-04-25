from .. import db


class Alumno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, nullable=False)
    nro_socio = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<Alumno: %r >' % (self.id)

    def to_json(self):
        alumno_json = {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'socio': self.nro_socio,
        }
        return alumno_json

    @staticmethod
    def from_json(alumno_json):
        id = alumno_json.get('id')
        id_usuario = alumno_json.get('id_usuario')
        nro_socio = alumno_json.get('socio')
        return Alumno(id=id,
                    id_usuario=id_usuario,
                    nro_socio=nro_socio
                    )

