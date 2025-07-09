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

        const ventasUsuario = await prisma.venta.findMany({
            where: {
                usuario_id: Number(id)
            },
            include: {
                usuario: true,
            }
        })

        if (ventasUsuario.length === 0) {
            return NextResponse.json(
                { message: "El usuario no tiene ventas registradas" },
                { status: 404 }
            )
        }

        return NextResponse.json(ventasUsuario, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener la venta', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}

export async function PUT() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}

export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}