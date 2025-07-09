import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const ventas = await prisma.venta.findMany()

        return NextResponse.json(ventas, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener las ventas', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}


export async function POST(request: NextRequest) {
    const data = await request.json()

    const {
        total,
        usuario_id,
        cartItems,
        paymentMethod,
        telefono,
        direccion,
        ciudad,
        codigo_postal,
    } = data

    if (!total || !usuario_id || !cartItems || cartItems.length === 0 || !telefono) {
        return NextResponse.json({ error: 'Faltan datos necesarios' }, { status: 400 })
    }

    try {
        const fecha_venta = new Date()

        // Registrar la venta
        const venta = await prisma.venta.create({
            data: {
                fecha_venta,
                total,
                usuario_id,
            },
        })

        // Insertar detalles de la venta y manejar productos, membresías y entrenadores
        for (const item of cartItems) {
            if (item.type === 'product') {
                // Si es un producto
                await prisma.detalle_venta.create({
                    data: {
                        venta_id: venta.venta_id,
                        producto_id: item.id,
                        cantidad: item.quantity,
                        precio_unitario: item.price,
                        subtotal: item.price * item.quantity,
                        telefono,
                        direccion: direccion || null,
                        ciudad: ciudad || null,
                        codigo_postal: codigo_postal || null,
                        metodo_pago_id: paymentMethod === "creditCard" ? 1 : paymentMethod === "paypal" ? 2 : 3,
                        estado_pago_id: paymentMethod === "creditCard" || paymentMethod === "paypal" ? 2 : paymentMethod === "cash" ? 1 : 3,
                    },
                })

                // Descontar el stock del producto
                await prisma.producto.update({
                    where: { producto_id: item.id },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                })
            } else if (item.type === 'membership') {
                const membresiaURL = `${process.env.NEXTAUTH_URL}/api/membresias/${usuario_id}`
                const membresiaResponse = await fetch(membresiaURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        plan_membresia_id: item.id,
                    }),
                })

                if (!membresiaResponse.ok) {
                    return NextResponse.json({ error: 'Error al crear la membresía' }, { status: 500 })
                }

                // Registrar el detalle de la venta para la membresía
                await prisma.detalle_venta.create({
                    data: {
                        venta_id: venta.venta_id,
                        plan_membresia_id: item.id,
                        cantidad: 1,
                        precio_unitario: item.price,
                        subtotal: item.price,
                        telefono,
                        direccion: direccion || null,
                        ciudad: ciudad || null,
                        codigo_postal: codigo_postal || null,
                        metodo_pago_id: paymentMethod === "creditCard" ? 1 : paymentMethod === "paypal" ? 2 : 3,
                        estado_pago_id: paymentMethod === "creditCard" || paymentMethod === "paypal" ? 2 : paymentMethod === "cash" ? 1 : 3,
                    },
                })
            }

            // else if (item.type === 'entrenador') {
            //     // Si es un entrenador
            //     await prisma.detalle_venta.create({
            //         data: {
            //             venta_id: venta.venta_id,
            //             entrenador_id: item.id, // Usamos el ID del entrenador
            //             cantidad: 1, // Podría ser también 1 en este caso
            //             precio_unitario: item.price,
            //             subtotal: item.price,
            //             metodo_pago_id: paymentMethod === "creditCard" ? 1 : paymentMethod === "paypal" ? 2 : 3,
            //             estado_pago_id: paymentMethod === "creditCard" || paymentMethod === "paypal" ? 2 : paymentMethod === "contraentrega" ? 1 : 3,
            //         },
            //     })

            //     // Lógica para asignar un entrenador a un usuario
            //     await prisma.entrenador.update({
            //         where: { entrenador_id: item.id },
            //         data: {
            //             // Lógica para asignar la sesión o el entrenador al usuario
            //         },
            //     })
            // }
        }

        // Retornar respuesta con la venta registrada
        return NextResponse.json(venta, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error al procesar la venta', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}

export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}