import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { nombre, apellido, correo, contrasena } = await req.json()

        if (!nombre || !apellido || !correo || !contrasena) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 })
        }

        const existingUser = await prisma.usuario.findFirst({ where: { correo } })
        if (existingUser) {
            return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10)
        const assignedRoleId = 2

        const newUser = await prisma.usuario.create({
            data: {
                nombre,
                apellido,
                correo,
                contrasena: hashedPassword,
                rol_id: assignedRoleId,
                estado: true,
                miembro: false,
                fecha_registro: new Date()
            },
        })

        return NextResponse.json({ message: "Usuario registrado con éxito", user: newUser }, { status: 201 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}

export async function PUT() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}

export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}