"use client"

import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"
import EntrenadoresGrid from "@/components/layout/entrenadores/EntrenadoresGrid"
import { useEntrenadores } from '@/hooks/useEntrenadores'
import { Entrenadores } from "@/types/entrenadores"

export default function EntrenadoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { trainers } = useEntrenadores()
  const { toast } = useToast()
  const { addToCart } = useCart()

  const filteredTrainers = trainers.filter((trainer) => trainer.nombre.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddTrainer = (trainer: Entrenadores) => {
    const price = trainer.precio ?? 0
    const added = addToCart({
      id: `trainer-${trainer.entrenador_id}`,
      name: `Entrenador: ${trainer.nombre}`,
      price,
      quantity: 1,
      image: trainer.imagen,
      type: "product",
      description: `${trainer.especialidad} - ${trainer.descripcion}`,
    })

    if (added) {
      toast({
        title: "¡Entrenador agregado!",
        description: `Has agregado a ${trainer.nombre} a tu carrito`,
        duration: 3000,
      })
    }
  }

  return (
    <div className="mt-16 min-h-screen bg-background">

      <Navbar currentPage="entrenadores" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nuestros Entrenadores</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profesionales certificados listos para ayudarte a alcanzar tus objetivos fitness
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar entrenadores por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="text-sm text-muted-foreground text-center mt-4">
              Mostrando {filteredTrainers.length} de {trainers.length} entrenadores
            </div>
          )}
        </div>

        <EntrenadoresGrid filteredTrainers={filteredTrainers} handleAddTrainer={handleAddTrainer} />

        {filteredTrainers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron entrenadores</h3>
            <p className="text-muted-foreground">{'No hay entrenadores que coincidan con "' + searchTerm + '"'}</p>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}
