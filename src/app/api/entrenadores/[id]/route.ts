import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    if (isNaN(Number(id))) {
        return NextResponse.json(
            { error: "ID de Usuario inválido" },
            { status: 400 }
        )
    }

    try {
        const entrenadorExistente = await prisma.entrenador.findUnique({
            where: {
                entrenador_id: Number(id)
            }
        })

        if (!entrenadorExistente) {
            return NextResponse.json(
                { error: "El entrenador no existe" },
                { status: 404 }
            )
        }

        const entrenador = await prisma.entrenador.findMany({
            where: {
                entrenador_id: Number(id),
            }
        })


        return NextResponse.json(entrenador, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener el detalle de venta', details: (error as Error).message },
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

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    try {
        // Comprobamos si el ID es válido
        if (isNaN(Number(id))) {
            return NextResponse.json(
                { error: "ID de Usuario inválido" },
                { status: 400 }
            )
        }

        // Buscar el entrenador
        const entrenadorDelete = await prisma.entrenador.findUnique({
            where: { entrenador_id: Number(id) },
        })

        if (!entrenadorDelete) {
            return NextResponse.json(
                { error: "Entrenador no encontrado" },
                { status: 404 }
            )
        }

        // Verificar si la imagen existe y eliminarla si existe
        if (entrenadorDelete.imagen) {
            const imagePath = path.join(process.cwd(), 'public', entrenadorDelete.imagen)
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        // Eliminar el entrenador de la base de datos
        await prisma.entrenador.delete({
            where: { entrenador_id: Number(id) },
        })

        return NextResponse.json(
            { success: true, message: "Entrenador eliminado correctamente" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "Error al eliminar el entrenador", details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}