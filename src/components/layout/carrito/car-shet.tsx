"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, CreditCard, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  image: string
  description?: string
}

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  updateQuantity: (id: string, newQuantity: number) => void
  removeItem: (id: string) => void
}

export function CartSheet({ isOpen, onClose, cartItems, updateQuantity, removeItem }: CartSheetProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.16 // 16% IVA
  const total = subtotal + tax
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Membresía":
        return "bg-blue-100 text-blue-800"
      case "Servicios":
        return "bg-green-100 text-green-800"
      case "Suplementos":
        return "bg-purple-100 text-purple-800"
      case "Clases":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrito de Compras
            {totalItems > 0 && (
              <Badge variant="secondary">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="text-muted-foreground mb-4">Agrega productos para comenzar</p>
            <Button onClick={onClose}>Explorar Productos</Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                          <Badge className={`mt-1 text-xs ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} c/u</p>
                          <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>IVA (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <p>• Membresías se activan inmediatamente</p>
                <p>• Clases válidas por 6 meses</p>
                <p>• Envío gratuito en productos</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <SheetFooter className="flex flex-col gap-2 pt-4">
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceder al Pago
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Continuar Comprando
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
