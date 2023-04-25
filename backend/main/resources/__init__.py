#Cambiar el nombre en la importación para clarificar y evitar conflictos
from .animales import Animal as AnimalResource
from .animales import Animales as AnimalesResource
from .usuarios import Usuarios as UsuariosResource
from .usuarios import Usuario as UsuarioResource
from .profesores import UsuariosProfesores as UsuariosProfesoresResource
from .profesores import UsuarioProfesor as UsuariosProfesoresResource
from .alumnos import UsuarioAlumno as UsuarioAlumnoResource
from .login import Login as LoginResource
from .clases import ClasesProfesores as ClasesProfesoresResource
from .planificaciones import PlanificacionAlumno as PlanificacionAlumnoResource
from .pagos import Pago as PagoResource
from .planificaciones import PlanificacionesProfesores as PlanificacionesProfesoresResource
from .planificaciones import PlanificacionProfesores as PlanificacionProfesoresResource