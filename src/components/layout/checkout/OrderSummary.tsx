"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Dumbbell } from "lucide-react"

interface OrderItem {
    id: string | number
    name: string
    image?: string
    price: number
    quantity: number
    type: string
}

interface OrderSummaryProps {
    products: OrderItem[]
    memberships: OrderItem[]
    deliveryMethod: string
    paymentMethod: string
    totalPrice: number
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    products,
    memberships,
    deliveryMethod,
    paymentMethod,
    totalPrice,
}) => {
    return (
        <Card className="sticky top-4 max-h-[500px] overflow-auto">
            <CardHeader>
                <CardTitle>Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {products.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="font-medium">Productos</h3>
                        {products.map((item) => (
                            <div
                                key={`product-${item.id}`}
                                className="flex items-center space-x-3 py-2 border-b last:border-0"
                            >
                                <div className="h-10 w-10 relative flex-shrink-0">
                                    <Image
                                        src={item.image || "/placeholder.svg?height=40&width=40"}
                                        alt={item.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Cant: {item.quantity}</span>
                                        <span className="text-sm font-medium">S/ {item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {memberships.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="font-medium">Membresías</h3>
                        {memberships.map((item) => (
                            <div
                                key={`membership-${item.id}`}
                                className="flex items-center space-x-3 py-2 border-b last:border-0"
                            >
                                <div className="h-10 w-10 bg-[#D72638]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Dumbbell className="h-5 w-5 text-[#D72638]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Cant: {item.quantity}</span>
                                        <span className="text-sm font-medium">S/ {item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between">
                    <span className="text-muted-foreground">Método de entrega</span>
                    <span>{deliveryMethod === "delivery" ? "Envío a domicilio" : "Recojo en tienda"}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>S/ {totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Envío</span>
                        <span>Gratis</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Método de pago</span>
                        <span>
                            {paymentMethod === "creditCard"
                                ? "Tarjeta de crédito"
                                : paymentMethod === "paypal"
                                    ? "PayPal"
                                    : paymentMethod === "cash"
                                        ? "Contra Entrega"
                                        : ""}
                        </span>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>S/ {totalPrice}</span>
                </div>
            </CardContent>
        </Card>
    )
}
