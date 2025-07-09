import prisma from "../lib/prisma"
import { initialData } from "./seed"

async function main() {

    //Elimina registros de la base de datos
    await prisma.entrenador.deleteMany()
    await prisma.estado_entrenador.deleteMany()
    await prisma.asistencia.deleteMany()
    await prisma.detalle_venta.deleteMany()
    await prisma.venta.deleteMany()
    await prisma.membresia.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.rol.deleteMany()
    await prisma.metodo_pago.deleteMany()
    await prisma.estado_pago.deleteMany()
    await prisma.plan_membresia.deleteMany()
    await prisma.producto.deleteMany()
    await prisma.categoria_producto.deleteMany()

    // Reiniciar los índices de autoincremento
    await prisma.$executeRaw`ALTER SEQUENCE "usuario_usuario_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "rol_rol_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "estado_entrenador_estado_entrenador_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "entrenador_entrenador_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "metodo_pago_metodo_pago_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "estado_pago_estado_pago_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "membresia_membresia_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "detalle_venta_detalle_venta_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "venta_venta_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "plan_membresia_plan_membresia_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "producto_producto_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "categoria_producto_categoria_id_seq" RESTART WITH 1`
    await prisma.$executeRaw`ALTER SEQUENCE "asistencia_asistencia_id_seq" RESTART WITH 1`

    //Extrae los datos de initialData
    const {
        roles,
        metodoPago,
        estadoPago,
        usuarios,
        planMembresias,
        membresias,
        productos,
        categoria,
        ventas,
        detallesVentas,
        asistencia,
        estadoEntrenadores,
        entrenadores
    } = initialData

    //Inserta los datos a la base de datos
    await prisma.rol.createMany({
        data: roles
    })

    await prisma.metodo_pago.createMany({
        data: metodoPago
    })

    await prisma.estado_pago.createMany({
        data: estadoPago
    })

    await prisma.estado_entrenador.createMany({
        data: estadoEntrenadores
    })

    await prisma.entrenador.createMany({
        data: entrenadores
    })

    const usuariosConRolId = usuarios.map((usuario) => ({
        ...usuario,
        telefono: usuario.telefono ? usuario.telefono.toString() : undefined,
        rol_id: usuario.rol_id,
        miembro: usuario.miembro !== undefined ? usuario.miembro : false,
    }));

    await prisma.usuario.createMany({
        data: usuariosConRolId,
    })

    await prisma.plan_membresia.createMany({
        data: planMembresias
    })

    await prisma.membresia.createMany({
        data: membresias
    })

    await prisma.categoria_producto.createMany({
        data: categoria
    })

    await prisma.producto.createMany({
        data: productos
    })

    await prisma.venta.createMany({
        data: ventas
    })

    await prisma.detalle_venta.createMany({
        data: detallesVentas
    })

    await prisma.asistencia.createMany({
        data: asistencia
    })



    console.log('Seed ejecutado correctamente')
}

(() => {
    main()
})()