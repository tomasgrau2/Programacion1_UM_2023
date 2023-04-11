#Cambiar el nombre en la importación para clarificar y evitar conflictos
from .animal import Animal as AnimalResource
from .animal import Animales as AnimalesResource
from .usuarios import Usuarios as UsuariosResource
from .usuarios import Usuario as UsuarioResource
from .usuarios import UsuariosAlumnos as UsuariosAlumnosResource
from .usuarios import UsuarioProfesor as UsuariosProfesoresResource
from .usuarios import UsuarioAlumno as UsuarioAlumnoResource
from .login import Login as LoginResource
from .clases import ClasesProfesores as ClasesProfesoresResource
from .planificacion import PlanificacionAlumno as PlanificacionAlumnoResource
from .pago import Pago as PagoResource
from .planificacion import PlanificacionesProfesores as PlanificacionesProfesoresResource
from .planificacion import PlanificacionProfesores as PlanificacionProfesoresResource