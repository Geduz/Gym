"use client"

import { useState, useEffect } from "react"
import { UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useCategorias } from "@/hooks/useCategorias"
import { useProductos } from "@/hooks/useProductos"
import Image from 'next/image'
import { UpdateProductDialogProps } from "@/types/productos"

const UpdateProductDialog = ({ open, onOpenChange, producto, onSuccess }: UpdateProductDialogProps) => {
    const { categorias, loading, error } = useCategorias()
    const { productos, updateProducto } = useProductos()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    // Estado para los campos del formulario
    const [form, setForm] = useState({
        nombre: "",
        categoriaId: "",
        precio: "",
        stock: "",
        descripcion: "",
        imagen: "",
    })
    const [saving, setSaving] = useState(false)

    // Cargar el producto a actualizar
    useEffect(() => {
        const product = productos.find(p => p.producto_id === producto?.producto_id)
        if (product) {
            setForm({
                nombre: product.nombre,
                categoriaId: String(product.categoriaId),
                precio: String(product.precio),
                stock: String(product.stock),
                descripcion: product.descripcion,
                imagen: product.imagen,
            })
            setPreviewUrl(product.imagen)
        }
    }, [producto, productos])

    // Cambios de campos de texto/textarea
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    // Cambio de select
    const handleCategoryChange = (value: string) => setForm(f => ({ ...f, categoriaId: value }))

    // Imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    // Guardar producto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        let imageUrl = form.imagen
        // Subir nueva imagen si existe
        if (selectedImage) {
            const formData = new FormData()
            formData.append("file", selectedImage)
            const resImg = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })
            const imgData = await resImg.json()
            if (!resImg.ok) {
                alert(imgData.error || "Error al subir imagen")
                setSaving(false)
                return
            }
            imageUrl = imgData.url
        }

        // Enviar producto actualizado a la API
        const productoBody = {
            producto_id: producto.producto_id,
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: Number(form.precio),
            stock: Number(form.stock),
            categoriaId: Number(form.categoriaId),
            estado: Number(form.stock) === 0 ? false : true,
            imagen: imageUrl,
        }

        await updateProducto(productoBody)
        onSuccess()
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Actualizar Producto</DialogTitle>
                    <DialogDescription>Completa la información del producto.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input id="nombre" className="col-span-3" value={form.nombre} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Categoría
                                </Label>
                                <Select value={form.categoriaId} onValueChange={handleCategoryChange}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder={loading ? "Cargando..." : "Seleccionar categoría"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {loading ? (
                                            <div className="px-3 py-2 text-muted-foreground text-sm">Cargando...</div>
                                        ) : error ? (
                                            <div className="px-3 py-2 text-red-500 text-sm">{error}</div>
                                        ) : (
                                            categorias.map((cat) => (
                                                <SelectItem key={cat.categoria_id} value={String(cat.categoria_id)}>{cat.nombre}</SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="precio" className="text-right">
                                    Precio
                                </Label>
                                <Input id="precio" type="number" step="0.01" className="col-span-3" value={form.precio} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock" className="text-right">
                                    Stock
                                </Label>
                                <Input id="stock" type="number" className="col-span-3" value={form.stock} onChange={handleChange} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="descripcion" className="text-right">
                                    Descripción
                                </Label>
                                <Textarea id="descripcion" className="col-span-3" value={form.descripcion} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <Label className="mb-2 text-right">Imagen</Label>
                            <label
                                htmlFor="product-image"
                                className="w-full flex flex-col items-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#D72638] transition"
                            >
                                <UploadCloud className="w-10 h-10 mb-2 text-[#D72638]" />
                                <span className="text-sm text-muted-foreground mb-1">Haz clic o arrastra una imagen</span>
                                <Input
                                    id="product-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <span className="text-xs text-gray-400">{selectedImage ? selectedImage.name : "No se ha seleccionado imagen"}</span>
                            </label>
                            {/* Preview */}
                            {previewUrl && (
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="mt-2 rounded-lg shadow w-full h-full object-cover border"
                                    layout="intrinsic"
                                />
                            )}
                            {form.imagen && !previewUrl && (
                                <Image
                                    src={form.imagen}
                                    alt="Producto Actual"
                                    width={200}
                                    height={200}
                                    className="mt-2 rounded-lg shadow w-full h-full object-cover border"
                                    layout="intrinsic"
                                />
                            )}

                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancelar</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="bg-[#D72638] hover:bg-[#B91E2F]"
                            disabled={saving}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProductDialog
