import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const productos = await prisma.producto.findMany({
            include: {
                categoria: true
            }
        })

        return NextResponse.json(productos, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al obtener los productos', details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { descripcion, nombre, precio, stock, categoriaId, estado, imagen } = body

        if (!descripcion || !nombre || !precio || !stock || !categoriaId || !estado || !imagen) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            )
        }
        const newProducto = await prisma.producto.create({
            data: {
                descripcion,
                nombre,
                precio,
                stock,
                categoriaId,
                estado,
                imagen
            }
        }
        )
        return NextResponse.json(newProducto, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Error al crear el producto', details: (error as Error).message },
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