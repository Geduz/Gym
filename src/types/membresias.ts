import { Usuario } from './usuario'

export interface PlanMembresias {
    plan_membresia_id: number
    nombre: string
    precio: number
    descripcion?: string[]
}

export interface Membresias {
    membresia_id: number
    usuario_id: number
    fecha_inicio: string
    fecha_fin: string
    duracion: number
    estado: boolean
    plan_membresia_id: number
    usuario: Usuario,
    plan_membresia: PlanMembresias
}