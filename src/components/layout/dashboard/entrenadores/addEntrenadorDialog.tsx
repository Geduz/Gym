'use client'

import { useState } from "react"
import { Plus, Trash2, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useEntrenadores } from "@/hooks/useEntrenadores"

const AddTrainerDialog = ({ onAddTrainer }: { onAddTrainer: () => void }) => {
    const { createEntrenador } = useEntrenadores()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        experiencia: "",
        precio: "",
        descripcion: "",
        especialidades: [] as string[],  // Iniciar especialidades como un arreglo vacío
        especialidadInput: ""  // Campo de entrada para la especialidad
    })
    const [saving, setSaving] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleAddSpecialty = () => {
        if (form.especialidades.includes(form.especialidadInput)) {
            return; // Evitar agregar duplicados
        }
        setForm({
            ...form,
            especialidades: [...form.especialidades, form.especialidadInput],
            especialidadInput: "", // Limpiar campo de especialidad
        })
    }

    const handleRemoveSpecialty = (index: number) => {
        setForm({
            ...form,
            especialidades: form.especialidades.filter((_, i) => i !== index),
        })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        let imageUrl = ""
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

        const entrenadorBody = {
            nombre: form.nombre,
            apellido: form.apellido,
            correo: form.correo,
            experiencia: Number(form.experiencia),
            precio: Number(form.precio),
            descripcion: form.descripcion,
            especialidad: form.especialidades,
            imagen: imageUrl
        }

        await createEntrenador(entrenadorBody)

        onAddTrainer()

        // Limpiar formulario después de guardar
        setForm({
            nombre: "",
            apellido: "",
            correo: "",
            experiencia: "",
            precio: "",
            descripcion: "",
            especialidades: [],
            especialidadInput: ""
        })

        // Limpiar imagen
        setSelectedImage(null)
        setPreviewUrl(null)

        setSaving(false)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-[#D72638] hover:bg-[#B91E2F]">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Entrenador
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Agregar Nuevo Entrenador</DialogTitle>
                        <DialogDescription>Completa la información del nuevo entrenador.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Sección izquierda: Formulario */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input
                                            id="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label htmlFor="apellido">Apellido</Label>
                                        <Input
                                            id="apellido"
                                            value={form.apellido}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="correo">Correo</Label>
                                    <Input
                                        id="correo"
                                        type="email"
                                        value={form.correo}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="experiencia">Experiencia</Label>
                                    <Input
                                        id="experiencia"
                                        type="number"
                                        value={form.experiencia}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="precio">Precio</Label>
                                    <Input
                                        id="precio"
                                        type="number"
                                        value={form.precio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                        id="descripcion"
                                        value={form.descripcion}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Especialidades */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium">Especialidades</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={handleAddSpecialty}
                                            disabled={saving}
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Agregar especialidad
                                        </Button>
                                    </div>

                                    {form.especialidades.length > 0 && (
                                        <div className="space-y-2 mt-2">
                                            {form.especialidades.map((especialidad, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                    <span>{especialidad}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveSpecialty(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Campo para nueva especialidad */}
                                    <div className="mt-4">
                                        <Input
                                            id="especialidadInput"
                                            value={form.especialidadInput}
                                            onChange={handleChange}
                                            placeholder="Ingrese especialidad"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sección derecha: Imagen */}
                            <div className="flex flex-col items-center gap-4">
                                <Label className="mb-2 text-right">Foto de Perfil</Label>
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
                                        width={100}
                                        height={100}
                                        className="mt-2 rounded-lg shadow w-40 h-40 object-cover border"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancelar</Button>
                            </DialogClose>
                            <Button className="bg-[#D72638] hover:bg-[#B91E2F]" type="submit" disabled={saving}>
                                {saving ? "Guardando..." : "Guardar"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTrainerDialog
