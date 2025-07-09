export interface Usuario {
    usuario_id: number
    nombre: string
    apellido: string
    dni?: string
    telefono?: number
    fecha_nacimiento?: string
    correo: string
    contrasena: string
    direccion?: string
    ciudad?: string
    codigo_postal?: string
    rol_id: number
    fecha_registro: string
    estado: boolean
    miembro: boolean
    asistencia?: number
    imagen?: string
    entrenador_id?: number
    rol: {
        rol_id: number
        nombre: string
    }
}

export interface UsuarioSession {
    usuario_id: number
    nombre: string
    apellido: string
    correo: string
    direccion: string | null
    ciudad: string | null
    codigo_postal: string | null
    rol_id: number
    role: string
    miembro: boolean
}