"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus, ShoppingCart, Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"

export default function CarritoPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  // Agrupar items por tipo
  const products = cartItems.filter((item) => item.type === "product")
  const memberships = cartItems.filter((item) => item.type === "membership")

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos o membresías antes de continuar",
        variant: "destructive",
      })
      return
    }

    // Redirigir a la página de checkout
    router.push("/checkout")
  }

  return (
    <div className="mt-16 min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Seguir comprando
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Mi Carrito</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">Agrega productos o membresías para continuar</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#D72638] hover:bg-[#B91E2F] text-white" onClick={() => router.push("/productos")}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Ver Productos
              </Button>
              <Button variant="outline" onClick={() => router.push("/membresias")}>
                <Dumbbell className="mr-2 h-4 w-4" />
                Ver Membresías
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Productos */}
              {products.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Productos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {products.map((item) => (
                      <div
                        key={`product-${item.id}`}
                        className="flex items-center space-x-4 py-4 border-b last:border-0"
                      >
                        <div className="h-20 w-20 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold">S/ {item.price * item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id, item.type)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Membresías */}
              {memberships.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Dumbbell className="h-5 w-5 mr-2" />
                      Membresías
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {memberships.map((item) => (
                      <div
                        key={`membership-${item.id}`}
                        className="flex items-center space-x-4 py-4 border-b last:border-0"
                      >
                        <div className="h-16 w-16 bg-[#D72638]/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Dumbbell className="h-8 w-8 text-[#D72638]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-muted-foreground">Cantidad: {item.quantity}</span>
                            <div className="flex items-center space-x-4">
                              <span className="font-semibold">S/ {item.price * item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id, item.type)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Resumen del pedido */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Productos ({products.length})</span>
                      <span>S/ {products.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Membresías ({memberships.length})</span>
                      <span>S/ {memberships.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>Gratis</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>S/ {totalPrice}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button
                    className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white"
                    onClick={handleProceedToCheckout}
                  >
                    Proceder al Pago
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground" onClick={clearCart}>
                    Vaciar Carrito
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Toaster />
    </div>
  )
}
