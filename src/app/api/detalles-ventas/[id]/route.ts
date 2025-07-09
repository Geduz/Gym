import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    if (isNaN(Number(id))) {
        return NextResponse.json(
            { error: "ID de venta inválido" },
            { status: 400 }
        )
    }

    try {
        const ventaExistente = await prisma.venta.findUnique({
            where: {
                venta_id: Number(id)
            }
        })

        if (!ventaExistente) {
            return NextResponse.json(
                { error: "La venta no existe" },
                { status: 404 }
            )
        }

        const detalleVenta = await prisma.detalle_venta.findMany({
            where: {
                venta_id: Number(id)
            },
            include: {
                venta: true,
                plan_membresia: true,
                producto: true,
                metodo_pago: true,
                estado_pago: true
            }
        })
        return NextResponse.json(detalleVenta, { status: 200 })

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

export async function DELETE() {
    return NextResponse.json({ error: 'Método no permitido' }, { status: 405 })
}