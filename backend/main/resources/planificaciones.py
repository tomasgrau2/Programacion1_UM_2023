# Planificaciones por alumno y profesor
from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PlanificacionModel, AlumnoModel, ProfesorModel, UsuarioModel
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required, get_jwt_identity

class Planificaciones(Resource):
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def get(self):
        page = 1
        per_page = 10
        planificaciones = db.session.query(PlanificacionModel)
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Filtrar por profesor (si es profesor, solo ver sus planificaciones)
        current_user_id = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get(current_user_id)
        
        if current_user and current_user.rol == 'profesor':
            # Buscar el profesor asociado al usuario
            profesor = db.session.query(ProfesorModel).filter_by(id_usuario=current_user_id).first()
            if profesor:
                planificaciones = planificaciones.filter(PlanificacionModel.id_profesor == profesor.id)

        # Filtrar por alumno específico
        if request.args.get('id_alumno'):
            planificaciones = planificaciones.filter(PlanificacionModel.id_alumno == request.args.get('id_alumno'))

        # Filtrar por profesor específico (solo admin puede hacer esto)
        if request.args.get('id_profesor') and current_user.rol == 'admin':
            planificaciones = planificaciones.filter(PlanificacionModel.id_profesor == request.args.get('id_profesor'))

        # Busqueda por día
        if request.args.get('lunes'):
            planificaciones=planificaciones.filter(PlanificacionModel.lunes.like("%"+request.args.get('lunes')+"%"))

        if request.args.get('martes'):
            planificaciones=planificaciones.filter(PlanificacionModel.martes.like("%"+request.args.get('martes')+"%"))
        
        if request.args.get('miercoles'):
            planificaciones=planificaciones.filter(PlanificacionModel.miercoles.like("%"+request.args.get('miercoles')+"%"))
        
        if request.args.get('jueves'):
            planificaciones=planificaciones.filter(PlanificacionModel.jueves.like("%"+request.args.get('jueves')+"%"))
        
        if request.args.get('viernes'):
            planificaciones=planificaciones.filter(PlanificacionModel.viernes.like("%"+request.args.get('viernes')+"%"))
        
        # Ordenar por fecha de creación (más recientes primero)
        planificaciones = planificaciones.order_by(PlanificacionModel.fecha_creacion.desc())
        
        planificaciones = planificaciones.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'planificaciones': [planificacion.to_json() for planificacion in planificaciones],
                  'total': planificaciones.total,
                  'pages': planificaciones.pages,
                  'page': page
                })
    
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json() , 201
    
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def post(self):
        data = request.get_json()
        
        # Obtener el profesor actual
        current_user_id = get_jwt_identity()
        current_user = db.session.query(UsuarioModel).get(current_user_id)
        
        if current_user.rol == 'profesor':
            # Buscar el profesor asociado al usuario
            profesor = db.session.query(ProfesorModel).filter_by(id_usuario=current_user_id).first()
            if not profesor:
                return {'error': 'Profesor no encontrado'}, 404
            data['id_profesor'] = profesor.id
        elif current_user.rol == 'admin':
            # Admin puede especificar el profesor
            if not data.get('id_profesor'):
                return {'error': 'id_profesor es requerido'}, 400
        
        # Validar que el alumno existe
        if not data.get('id_alumno'):
            return {'error': 'id_alumno es requerido'}, 400
            
        alumno = db.session.query(AlumnoModel).get(data['id_alumno'])
        if not alumno:
            return {'error': 'Alumno no encontrado'}, 404
        
        planificacion = PlanificacionModel.from_json(data)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json(), 201


class PlanificacionesByAlumno(Resource):
    """Recurso para que los alumnos vean sus planificaciones por id_alumno"""
    @jwt_required()
    @role_required(roles = ['alumno'])
    def get(self, id_alumno):
        page = 1
        per_page = 10
        
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Verificar que el alumno existe
        alumno = db.session.query(AlumnoModel).get(id_alumno)
        if not alumno:
            return {'error': 'Alumno no encontrado'}, 404

        # Obtener las planificaciones del alumno
        planificaciones = db.session.query(PlanificacionModel).filter_by(id_alumno=id_alumno)
        
        # Ordenar por fecha de creación (más recientes primero)
        planificaciones = planificaciones.order_by(PlanificacionModel.fecha_creacion.desc())
        
        planificaciones = planificaciones.paginate(page=page, per_page=per_page, error_out=True, max_per_page=30)

        return jsonify({'planificaciones': [planificacion.to_json() for planificacion in planificaciones],
                  'total': planificaciones.total,
                  'pages': planificaciones.pages,
                  'page': page
                })



    
class Planificacion(Resource): #A la clase usuario le indico que va a ser del tipo recurso(Resource)
    #obtener recurso
    @jwt_required()
    @role_required(roles = ['admin', 'profesor','alumno'])
    def get(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        return planificacion.to_json()
    
    #eliminar recurso
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def delete(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        db.session.delete(planificacion)
        db.session.commit()
        return '', 204
    
    #Modificar el recurso usuario
    @jwt_required()
    @role_required(roles = ['admin', 'profesor'])
    def put(self, id):
        planificacion = db.session.query(PlanificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(planificacion, key, value)
        db.session.add(planificacion)
        db.session.commit()
        return planificacion.to_json() , 201