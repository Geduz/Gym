import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const entrenadores = await prisma.entrenador.findMany()

        return NextResponse.json(entrenadores, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener los roles', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(req: NextRequest) {
    try {
        const { nombre, apellido, descripcion, experiencia, especialidad, precio, correo, imagen } = await req.json()

        if (!nombre || !apellido || !descripcion || !experiencia || !especialidad || !precio || !correo) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 })
        }

        const existingEntrenador = await prisma.entrenador.findFirst({ where: { correo } })
        if (existingEntrenador) {
            return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 })
        }

        const newEntrenador = await prisma.entrenador.create({
            data: {
                nombre,
                apellido,
                descripcion,
                experiencia,
                especialidad,
                precio,
                correo,
                imagen,
                estado_entrenador_id: 1,
                creado_en: new Date(),
                actualizado_en: new Date()
            },
        })

        return NextResponse.json({ message: "Entrenador registrado con éxito", entrenador: newEntrenador }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Error al registrar entrenador', details: (error as Error).message },
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
