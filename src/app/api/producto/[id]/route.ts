import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import fs from 'fs'
import path from 'path'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    try {
        const producto = await prisma.producto.findUnique({
            where: {
                producto_id: Number(id),
            },
            include: {
                categoria: true
            }
        })

        if (!producto) {
            return NextResponse.json(
                { error: "Producto no encontrado" },
                { status: 404 }
            )
        }

        return NextResponse.json(producto, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { error: "Error al obtener el producto", details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const body = await request.json()
    const { descripcion, nombre, precio, stock, categoriaId, estado, imagen } = body

    if (!descripcion || !nombre || !precio || !stock || !categoriaId || !estado || !imagen) {
        return NextResponse.json(
            { error: 'Faltan campos requeridos' },
            { status: 400 }
        )
    }

    try {
        // Obtener el producto para eliminar la imagen anterior si existe
        const productToUpdate = await prisma.producto.findUnique({
            where: { producto_id: Number(id) },
        })

        if (!productToUpdate) {
            return NextResponse.json(
                { error: "Producto no encontrado" },
                { status: 404 }
            )
        }

        // Si se sube una nueva imagen, eliminar la anterior
        if (productToUpdate.imagen !== imagen) {
            const imagePath = path.join(process.cwd(), 'public', productToUpdate.imagen)

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        // Actualizar el producto
        const updatedProducto = await prisma.producto.update({
            where: { producto_id: Number(id) },
            data: {
                descripcion,
                nombre,
                precio,
                stock,
                categoriaId,
                estado,
                imagen,
            }
        })

        return NextResponse.json(updatedProducto, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar el producto", details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    try {
        const productToDelete = await prisma.producto.findUnique({
            where: { producto_id: Number(id) },
        })

        if (!productToDelete) {
            return NextResponse.json(
                { error: "Producto no encontrado" },
                { status: 404 }
            )
        }

        const imagePath = path.join(process.cwd(), 'public', productToDelete.imagen)

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }

        const deletedProduct = await prisma.producto.delete({
            where: { producto_id: Number(id) }
        })

        return NextResponse.json(deletedProduct, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: "Error al eliminar el producto", details: (error as Error).message },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}