export interface DetalleVentas {
    detalle_venta_id: number
    venta_id: number
    producto_id: number | null
    plan_membresia_id: number | null
    cantidad: number
    precio_unitario: number
    subtotal: number
    metodo_pago_id: number
    telefono: string
    direccion: string | null
    ciudad: string | null
    codigo_postal: string | null
    venta: {
        venta_id: number
        fecha_venta: string
        total: number
        usuario_id: number
    }
    plan_membresia: {
        plan_membresia_id: number
        nombre: string
        precio: number
        descripcion: string[]
    } | null
    producto: {
        producto_id: number
        descripcion: string
        precio: number
        stock: number
        estado: boolean
        categoriaId: number
        nombre: string
        imagen: string
    } | null
    metodo_pago: {
        metodo_pago_id: number
        nombre: string
    }
    estado_pago: {
        estado_pago_id: number
        nombre: string
    }
}