import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {

        const detalleVenta = await prisma.detalle_venta.findMany({
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