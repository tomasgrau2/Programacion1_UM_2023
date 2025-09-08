#Cambiar el nombre en la importación para clarificar y evitar conflictos
from .usuarios import Usuarios as UsuariosResource
from .usuarios import Usuario as UsuarioResource
from .profesores import UsuariosProfesores as UsuariosProfesoresResource
from .profesores import UsuarioProfesor as UsuarioProfesorResource
from .alumnos import UsuarioAlumno as UsuarioAlumnoResource
from .alumnos import UsuariosAlumnos as UsuariosAlumnosResource
from .login import Login as LoginResource
from .planificaciones import Planificaciones as PlanificacionesResource
from .planificaciones import Planificacion as PlanificacionResource
from .planificaciones import PlanificacionesAlumno as PlanificacionesAlumnoResource
