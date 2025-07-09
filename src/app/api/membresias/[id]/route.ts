import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    if (isNaN(Number(id))) {
        return NextResponse.json(
            { error: "ID de usuario inválido" },
            { status: 400 }
        )
    }

    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                usuario_id: Number(id)
            }
        })

        if (!usuarioExistente) {
            return NextResponse.json(
                { error: "El usuario no existe" },
                { status: 404 }
            )
        }

        const planMembresias = await prisma.membresia.findMany({
            where: {
                usuario_id: Number(id)
            },
            include: {
                usuario: true,
                plan_membresia: true
            }
        })

        if (planMembresias.length === 0) {
            return NextResponse.json(
                { error: "El usuario no tiene membresía" },
                { status: 404 }
            )
        }

        return NextResponse.json(planMembresias, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener la membresía', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    if (isNaN(Number(id))) {
        return NextResponse.json(
            { error: "ID de usuario inválido" },
            { status: 400 }
        )
    }

    try {
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                usuario_id: Number(id)
            }
        })

        if (!usuarioExistente) {
            return NextResponse.json(
                { error: "El usuario no existe" },
                { status: 404 }
            )
        }

        const planExistente = await prisma.membresia.findFirst({
            where: {
                usuario_id: Number(id),
                estado: true,
            }
        })

        if (planExistente) {
            return NextResponse.json(
                { error: "El usuario ya tiene una membresía activa" },
                { status: 400 }
            )
        }

        const { duracion, plan_membresia_id } = await request.json()
        const fecha_inicio = new Date()
        // Definir duración predeterminada según el plan
        let duracionPredeterminada: number
        switch (plan_membresia_id) {
            case 1:
                duracionPredeterminada = 30
                break
            case 2:
                duracionPredeterminada = 90
                break
            case 3:
                duracionPredeterminada = 365
                break
            default:
                return NextResponse.json(
                    { error: "ID de plan de membresía inválido" },
                    { status: 400 }
                )
        }

        // Si no se envía duración, usar la predeterminada
        const duracionFinal = duracion ?? duracionPredeterminada

        // Calcular la fecha de fin, sumando los días de la duración al inicio
        const fecha_fin = new Date(fecha_inicio)
        fecha_fin.setDate(fecha_fin.getDate() + duracionFinal)

        const nuevaMembresia = await prisma.$transaction(async (prisma) => {

            const membresiaCreada = await prisma.membresia.create({
                data: {
                    usuario_id: Number(id),
                    fecha_inicio: new Date(fecha_inicio),
                    fecha_fin: fecha_fin,
                    duracion: duracionFinal,
                    estado: true,
                    plan_membresia_id: plan_membresia_id,
                }
            })

            await prisma.usuario.update({
                where: {
                    usuario_id: Number(id)
                },
                data: {
                    miembro: true
                }
            })

            return membresiaCreada
        })

        return NextResponse.json(nuevaMembresia, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear la membresía', details: (error as Error).message },
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
