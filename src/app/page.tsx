"use client"

import { Users, Package, Dumbbell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"
import { Navbar } from "@/components/navbar"

// Datos de entrenadores
const trainers = [
  {
    id: 1,
    name: "Carlos Mendoza",
    specialty: "Entrenamiento Funcional",
    experience: "5 años",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    description: "Especialista en entrenamiento funcional y acondicionamiento físico.",
  },
  {
    id: 2,
    name: "Ana García",
    specialty: "Yoga y Pilates",
    experience: "8 años",
    price: 120,
    image: "/placeholder.svg?height=200&width=200",
    description: "Instructora certificada en yoga y pilates para todos los niveles.",
  },
  {
    id: 3,
    name: "Miguel Torres",
    specialty: "Musculación",
    experience: "10 años",
    price: 180,
    image: "/placeholder.svg?height=200&width=200",
    description: "Experto en musculación y desarrollo de masa muscular.",
  },
  {
    id: 4,
    name: "Laura Rodríguez",
    specialty: "Cardio y Pérdida de Peso",
    experience: "6 años",
    price: 140,
    image: "/placeholder.svg?height=200&width=200",
    description: "Especialista en programas de cardio y pérdida de peso efectiva.",
  },
]

export default function PowerFitHome() {
  // Remove setShowTrainers since it's not used
  const showTrainers = false
  const { addToCart } = useCart()

  // Actualizar la función handleAddTrainer para manejar el resultado de addToCart
  const handleAddTrainer = (trainer: {
    id: number
    name: string
    specialty: string
    price: number
    image: string
    description: string
  }) => {
    const added = addToCart({
      id: `trainer-${trainer.id}`,
      name: `Entrenador: ${trainer.name}`,
      price: trainer.price,
      quantity: 1,
      image: trainer.image,
      type: "product",
      description: `${trainer.specialty} - ${trainer.description}`,
    })

    // Opcionalmente, mostrar un mensaje de éxito si se desea
    if (added) {
      toast({
        title: "¡Entrenador agregado!",
        description: `Has agregado a ${trainer.name} a tu carrito`,
        duration: 3000,
      })
    }
  }

  return (
    <div className="mt-16 min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Trainers Section */}
      {showTrainers && (
        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Entrenadores</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Profesionales certificados listos para ayudarte a alcanzar tus objetivos fitness
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trainers.map((trainer) => (
                <Card key={trainer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Image
                      src={trainer.image || "/placeholder.svg"}
                      alt={trainer.name}
                      width={200}
                      height={200}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-foreground">{trainer.name}</CardTitle>
                    <CardDescription>{trainer.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Experiencia: {trainer.experience}</p>
                    <p className="text-sm text-muted-foreground mb-4">{trainer.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#D72638]">${trainer.price}/mes</span>
                      <Button
                        onClick={() => handleAddTrainer(trainer)}
                        className="bg-[#D72638] hover:bg-[#B91E2F] text-white"
                        size="sm"
                      >
                        Agregar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Transforma tu cuerpo, transforma tu vida
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                M Club GYM ofrece instalaciones de primera clase, entrenadores expertos y una comunidad motivadora para
                ayudarte a alcanzar tus objetivos fitness, nos ubicamos en la Av. Libertadores en San Vicente de Cañete.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/membresias">
                  <Button className="bg-[#D72638] hover:bg-[#B91E2F] text-white px-8 py-3">Ver Membresías</Button>
                </Link>
                <Link href="/productos">
                  <Button
                    variant="outline"
                    className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3"
                  >
                    Explorar Productos
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <Image
                src="/images/logo.jpg"
                alt="M Club GYM"
                width={800}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para alcanzar tus metas fitness en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Membresías Flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Planes adaptados a tus necesidades y horarios, sin contratos largos.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Tienda de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Suplementos, ropa y accesorios de las mejores marcas para optimizar tu entrenamiento.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">Contáctanos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nuestro número de consultas es +51 996239668.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
