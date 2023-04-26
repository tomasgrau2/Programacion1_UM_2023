from .. import db

class PlanificacionClase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_planificacion = db.Column(db.Integer, nullable=False)
    id_clase = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return '<PlanificacionClase: %r >' % (self.id_planificacion)
    #Convertir objeto en JSON
    def to_json(self):
        planificacionclase_json = {
            'id': self.id,
            'id_planificacion': self.id_planificacion,
            'id_clase': self.id_clase,
        }
        return planificacionclase_json

    def to_json_short(self):
        planificacionclase_json = {
            'id': self.id,
            'id_planificacion': self.id_planificacion,
            'id_clase': self.id_clase,
        }
        return planificacionclase_json

    @staticmethod
    #Convertir JSON a objeto
    def from_json(planificacionclase_json):
        id = planificacionclase_json.get('id')
        id_planificacion = planificacionclase_json.get('id_planificacion')
        id_clase = planificacionclase_json.get('id_clase')
        return PlanificacionClase(id=id,
                    id_planificacion=id_planificacion,
                    id_clase=id_clase
                    )