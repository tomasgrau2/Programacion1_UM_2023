#Cambiar el nombre en la importación para clarificar y evitar conflictos
from .usuarios import Usuarios as UsuariosResource
from .usuarios import Usuario as UsuarioResource
from .usuarios import UsuarioActual as UsuarioActualResource
from .profesores import UsuariosProfesores as UsuariosProfesoresResource
from .profesores import UsuarioProfesor as UsuarioProfesorResource
from .profesores import ProfesorByUsuario as ProfesorByUsuarioResource
from .profesores import ProfesoresPublicos as ProfesoresPublicosResource
from .alumnos import UsuarioAlumno as UsuarioAlumnoResource
from .alumnos import UsuariosAlumnos as UsuariosAlumnosResource
from .alumnos import AlumnoByUsuario as AlumnoByUsuarioResource
from .planificaciones import Planificaciones as PlanificacionesResource
from .planificaciones import Planificacion as PlanificacionResource
from .planificaciones import PlanificacionesByAlumno as PlanificacionesByAlumnoResource
