from .. import db

class Planificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lunes = db.Column(db.String, nullable=False)
    martes = db.Column(db.String, nullable=False)
    miercoles = db.Column(db.String, nullable=False)
    jueves = db.Column(db.String, nullable=False)
    viernes = db.Column(db.String, nullable=False)
    def __repr__(self):
        return '<Planificacion: %r >' % (self.id)

    def to_json(self):
        planificacion_json = {
            'id': self.id,
            'lunes': str(self.lunes),
            'martes': str(self.martes),
            'miercoles': str(self.miercoles),
            'jueves': str(self.jueves),
            'viernes': str(self.viernes),
        }
        return planificacion_json

    @staticmethod
    def from_json(planificacion_json):
        id = planificacion_json.get('id')
        lunes = planificacion_json.get('lunes')
        martes = planificacion_json.get('martes')
        miercoles = planificacion_json.get('miercoles')
        jueves = planificacion_json.get('jueves')
        viernes = planificacion_json.get('viernes')
        return Planificacion(id=id,
                    lunes=lunes,
                    martes=martes,
                    miercoles=miercoles,
                    jueves=jueves,
                    viernes=viernes,
                    )
