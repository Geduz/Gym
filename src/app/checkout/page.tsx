"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/contexts/cart-context"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TermsModal } from "@/components/terms-modal"
import { PrivacyModal } from "@/components/privacy-modal"
import { Navbar } from "@/components/navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { OrderSummary } from "@/components/layout/checkout/OrderSummary"
// import { PaymentCreditCard } from "@/components/layout/checkout/PaymentMethods/PaymentCreditCard"
import { PaymentPaypal } from "@/components/layout/checkout/PaymentMethods/PaymentPaypal"
import { PaymentCash } from "@/components/layout/checkout/PaymentMethods/PaymentCash"
import { ShippingInfoForm } from "@/components/layout/checkout/ShippingInfoForm"

// Meses para la fecha de expiración
// const months = [
//   { value: "01", label: "01 - Enero" },
//   { value: "02", label: "02 - Febrero" },
//   { value: "03", label: "03 - Marzo" },
//   { value: "04", label: "04 - Abril" },
//   { value: "05", label: "05 - Mayo" },
//   { value: "06", label: "06 - Junio" },
//   { value: "07", label: "07 - Julio" },
//   { value: "08", label: "08 - Agosto" },
//   { value: "09", label: "09 - Septiembre" },
//   { value: "10", label: "10 - Octubre" },
//   { value: "11", label: "11 - Noviembre" },
//   { value: "12", label: "12 - Diciembre" },
// ]

// // Años para la fecha de expiración
// const years = Array.from({ length: 10 }, (_, i) => {
//   const year = new Date().getFullYear() + i
//   return { value: year.toString(), label: year.toString() }
// })

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const { cartItems, totalPrice } = useCart()

  // Estados para el formulario
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [purchaseComplete, setPurchaseComplete] = useState(false)

  // Estados para los modales
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  // Información de envío
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [phone, setPhone] = useState("")

  // Método de entrega
  const [deliveryMethod, setDeliveryMethod] = useState("delivery") // "delivery" o "pickup"
  // Método de pago (ahora incluye "cash")
  const [paymentMethod, setPaymentMethod] = useState("creditCard") // "creditCard", "paypal", "cash"

  // Verificar si hay productos en el carrito
  useEffect(() => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No hay productos en tu carrito para proceder al pago",
        variant: "destructive",
      })
      router.push("/carrito")
    }
  }, [cartItems, router, toast])

  // Formatear número de tarjeta
  // const formatCardNumber = (value: string) => {
  //   const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  //   const matches = v.match(/\d{4,16}/g)
  //   const match = (matches && matches[0]) || ""
  //   const parts = []

  //   for (let i = 0, len = match.length; i < len; i += 4) {
  //     parts.push(match.substring(i, i + 4))
  //   }

  //   if (parts.length) {
  //     return parts.join(" ")
  //   } else {
  //     return value
  //   }
  // }

  // Manejar cambio en número de tarjeta
  // const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const formattedValue = formatCardNumber(e.target.value)
  //   setCardNumber(formattedValue)
  // }

  // Separar productos por tipo
  const products = cartItems.filter((item) => item.type === "product")
  const memberships = cartItems.filter((item) => item.type === "membership")

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar",
        variant: "destructive",
      })
      return
    }

    // Validación para tarjeta
    if (
      paymentMethod === "creditCard" &&
      (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv)
    ) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos del formulario de tarjeta de crédito",
        variant: "destructive",
      })
      return
    }

    // Validación para envío
    if (deliveryMethod === "delivery" && (!fullName || !email || !address || !city || !postalCode || !phone)) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos de envío",
        variant: "destructive",
      })
      return
    }

    // Validación para pickup
    if (deliveryMethod === "pickup" && (!fullName || !email || !phone)) {
      toast({
        title: "Datos incompletos",
        description: "Por favor completa todos los campos requeridos para el recojo en tienda",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Preparar datos para la solicitud
    const requestData = {
      total: totalPrice,
      usuario_id: session?.user.usuario_id,
      cartItems,
      paymentMethod,
      telefono: phone,
      direccion: address,
      ciudad: city,
      codigo_postal: postalCode,
    }

    try {
      // Realizar la solicitud POST al endpoint de ventas
      const response = await fetch("/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      const result = await response.json()

      if (!response.ok) {
        toast({
          title: "Error en la compra",
          description: result.error || "Hubo un error procesando tu compra",
          variant: "destructive",
        })
        setIsProcessing(false)
        return
      }

      setIsProcessing(false)
      setPurchaseComplete(true)

      // Guardar detalles de la compra en localStorage (si es necesario)
      localStorage.setItem("powerfit_last_order", JSON.stringify(result))

      // Mostrar toast de éxito
      toast({
        title: "¡Compra exitosa!",
        description: "Tu pedido ha sido procesado correctamente.",
        duration: 5000,
      })

      // Redirigir a la página de confirmación
      setTimeout(() => {
        router.push(`/checkout/confirmacion?id=${result.venta_id}`)
      }, 500)
    } catch (error) {
      void error
      setIsProcessing(false)
      toast({
        title: "Error",
        description: "Hubo un problema con la solicitud. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="mt-16 min-h-screen bg-background">
        <Navbar />
        <ProtectedRoute>
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {!purchaseComplete ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Finalizar Compra</h1>
                  <p className="text-muted-foreground">Completa tu información para procesar tu pedido</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Formulario de pago */}
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                      {/* Información de envío */}
                      <Card className="mb-6">
                        <CardHeader>
                          <CardTitle>Información de Entrega</CardTitle>
                          <CardDescription>Selecciona cómo quieres recibir tus productos</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <ShippingInfoForm
                            deliveryMethod={deliveryMethod}
                            setDeliveryMethod={setDeliveryMethod}
                            fullName={fullName}
                            setFullName={setFullName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            address={address}
                            setAddress={setAddress}
                            city={city}
                            setCity={setCity}
                            postalCode={postalCode}
                            setPostalCode={setPostalCode}
                          />
                        </CardContent>
                      </Card>

                      {/* Información de pago */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Información de Pago</CardTitle>
                          <CardDescription>Selecciona tu método de pago preferido</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Selección de método de pago */}
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                            {/* <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                              <RadioGroupItem value="creditCard" id="creditCard" />
                              <Label htmlFor="creditCard" className="flex-1 cursor-pointer">
                                <div className="font-medium">Tarjeta de Crédito/Débito</div>
                                <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                              </Label>
                              <div className="flex space-x-1">
                                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">
                                  VISA
                                </div>
                                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">MC</div>
                                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">
                                  AMEX
                                </div>
                              </div>
                            </div> */}

                            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                                <div className="font-medium">PayPal</div>
                                <div className="text-sm text-muted-foreground">Pago rápido y seguro con PayPal</div>
                              </Label>
                              <div className="h-6 w-16 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                                PAYPAL
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50 cursor-pointer">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                                <div className="font-medium">Contra Entrega</div>
                                <div className="text-sm text-muted-foreground">Paga en efectivo cuando recibas el pedido</div>
                              </Label>
                              <div className="h-6 w-20 bg-muted rounded flex items-center justify-center text-xs font-semibold">
                                EFECTIVO
                              </div>
                            </div>
                          </RadioGroup>

                          {/* Formulario de tarjeta de crédito */}
                          {/* {paymentMethod === "creditCard" && (
                            <PaymentCreditCard
                              cardNumber={cardNumber}
                              cardName={cardName}
                              expiryMonth={expiryMonth}
                              expiryYear={expiryYear}
                              cvv={cvv}
                              months={months}
                              years={years}
                              onChangeCardNumber={handleCardNumberChange}
                              onChangeCardName={(e) => setCardName(e.target.value)}
                              onChangeExpiryMonth={setExpiryMonth}
                              onChangeExpiryYear={setExpiryYear}
                              onChangeCVV={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                            />
                          )} */}

                          {/* Mensaje para PayPal */}
                          {paymentMethod === "paypal" && (
                            <PaymentPaypal />
                          )}

                          {/* Mensaje para Contra Entrega */}
                          {paymentMethod === "cash" && (
                            <PaymentCash />
                          )}

                          <div className="flex items-start space-x-2 pt-4">
                            <Checkbox
                              id="terms"
                              checked={acceptTerms}
                              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                            />
                            <Label htmlFor="terms" className="text-sm leading-tight">
                              Acepto los{" "}
                              <button
                                type="button"
                                onClick={() => setShowTermsModal(true)}
                                className="text-[#D72638] hover:underline"
                              >
                                términos y condiciones
                              </button>{" "}
                              y la{" "}
                              <button
                                type="button"
                                onClick={() => setShowPrivacyModal(true)}
                                className="text-[#D72638] hover:underline"
                              >
                                política de privacidad
                              </button>
                            </Label>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                          <Button
                            type="submit"
                            className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white"
                            disabled={isProcessing}
                          >
                            {isProcessing
                              ? "Procesando..."
                              : paymentMethod === "cash"
                                ? "Finalizar pedido"
                                : `Pagar S/ ${totalPrice}`
                            }
                          </Button>
                        </CardFooter>
                      </Card>
                    </form>
                  </div>

                  {/* Resumen de compra */}
                  <OrderSummary
                    products={products}
                    memberships={memberships}
                    deliveryMethod={deliveryMethod}
                    paymentMethod={paymentMethod}
                    totalPrice={totalPrice}
                  />
                </div>
              </>
            ) : (
              // Pantalla de compra exitosa
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">¡Compra Exitosa!</h1>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                  Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => router.push("/")}>
                    Ir al Inicio
                  </Button>
                  {memberships.length > 0 && (
                    <Button
                      className="bg-[#D72638] hover:bg-[#B91E2F] text-white"
                      onClick={() => router.push("/membresias/mi-membresia")}
                    >
                      Ver Mi Membresía
                    </Button>
                  )}
                </div>
              </div>
            )}
          </main>
          {/* Modales */}
          <TermsModal open={showTermsModal} onOpenChangeAction={setShowTermsModal} />
          <PrivacyModal open={showPrivacyModal} onOpenChangeAction={setShowPrivacyModal} />
          <Toaster />
        </ProtectedRoute>
      </div>
    </>
  )
}
