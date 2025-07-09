import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData()
        const file: File | null = data.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No se proporcionó imagen' }, { status: 400 })
        }

        const ext = file.name.split('.').pop()
        const fileName = `img_${Date.now()}.${ext}`
        const buffer = Buffer.from(await file.arrayBuffer())

        const filePath = path.join(process.cwd(), 'public', 'images', fileName)
        await writeFile(filePath, buffer)

        return NextResponse.json({ url: `/images/${fileName}` })
    } catch (err) {
        console.error('Error al subir la imagen:', err)
        return NextResponse.json({ error: 'Error al procesar la solicitud. Intenta nuevamente.' }, { status: 500 })
    }
}
