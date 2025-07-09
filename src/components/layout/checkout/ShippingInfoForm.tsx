"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

interface ShippingInfoFormProps {
    deliveryMethod: string
    setDeliveryMethod: (value: string) => void
    fullName: string
    setFullName: (value: string) => void
    email: string
    setEmail: (value: string) => void
    phone: string
    setPhone: (value: string) => void
    address: string
    setAddress: (value: string) => void
    city: string
    setCity: (value: string) => void
    postalCode: string
    setPostalCode: (value: string) => void
}

export const ShippingInfoForm: React.FC<ShippingInfoFormProps> = ({
    deliveryMethod,
    setDeliveryMethod,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
}) => {
    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            // Inicializa los valores con los datos de sesión si están disponibles
            setFullName(session.user.nombre + " " + session.user.apellido || "")
            setEmail(session.user.correo || "")
            setPhone(session.user.telefono || "")
            setAddress(session.user.direccion || "")
            setCity(session.user.ciudad || "")
            setPostalCode(session.user.codigo_postal || "")
        }
    }, [session, setFullName, setEmail, setPhone, setAddress, setCity, setPostalCode])

    return (
        <div className="space-y-6">
            {/* Opciones de entrega */}
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="font-medium">Envío a domicilio</div>
                        <div className="text-sm text-muted-foreground">Entrega en 2-5 días hábiles</div>
                    </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="font-medium">Recojo en tienda</div>
                        <div className="text-sm text-muted-foreground">Disponible para recoger en 24 horas</div>
                    </Label>
                </div>
            </RadioGroup>

            {/* Información personal */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre completo *</Label>
                        <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                        id="phone"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Dirección de envío */}
            {deliveryMethod === "delivery" && (
                <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">Dirección de envío</h3>
                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección *</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">Ciudad *</Label>
                            <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Código postal *</Label>
                            <Input
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Información de recojo en tienda */}
            {deliveryMethod === "pickup" && (
                <div className="space-y-4 border-t pt-4">
                    <h3 className="font-medium">Información de recojo en tienda</h3>
                    <div className="bg-muted/30 p-3 rounded-md">
                        <p className="font-medium">Recojo disponible en cualquier tienda M Club GYM</p>
                        <p className="text-sm text-muted-foreground">
                            Podrás recoger tu pedido en cualquiera de nuestras tiendas presentando tu DNI y el número
                            de pedido.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Horario de atención: Lunes a Sábado de 9am a 9pm, Domingos de 10am a 6pm
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
