from .. import db
from . import UsuarioModel

class Alumno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    r_usuario = db.relationship("Usuario", back_populates="r_alumno")

     #animal = db.relationship("Animal", back_populates="historias", uselist=False, single_parent=True)
    
    def __repr__(self):
        return '<Alumno: %r >' % (self.id)

    def to_json(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.id_usuario)
        alumno_json = {
            'id': self.id,
            'id_usuario': int(self.id_usuario),
            'usuario' : self.usuario.to_json() #le paso el usuario pasado a JSON / tengo todos lo datos juntos
        }
        return alumno_json
    
    def to_json_short(self):
        alumno_json = {
            'id': self.id,
        }
        return alumno_json

    @staticmethod
    def from_json(alumno_json):
        id = alumno_json.get('id')
        id_usuario = alumno_json.get('id_usuario')
        return Alumno(id=id,
                    id_usuario=id_usuario,
                    )
