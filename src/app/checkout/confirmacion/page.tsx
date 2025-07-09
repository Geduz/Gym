"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dumbbell, CheckCircle2, ArrowRight, Download, ShoppingBag, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/contexts/cart-context"
import confetti from "canvas-confetti"

interface OrderDetails {
  detalle_venta_id: number
  venta_id: number
  producto_id: number | null
  plan_membresia_id: number | null
  cantidad: number
  precio_unitario: number
  subtotal: number
  metodo_pago_id: number
  telefono: string
  direccion: string | null
  ciudad: string | null
  codigo_postal: string | null
  venta: {
    venta_id: number
    fecha_venta: string
    total: number
    usuario_id: number
  }
  plan_membresia: {
    plan_membresia_id: number
    nombre: string
    precio: number
    descripcion: string[]
  } | null
  producto: {
    producto_id: number
    descripcion: string
    precio: number
    stock: number
    estado: boolean
    categoriaId: number
    nombre: string
    imagen: string
  } | null
  metodo_pago: {
    metodo_pago_id: number
    nombre: string
  }
  estado_pago: {
    estado_pago_id: number
    nombre: string
  }
}

export default function ConfirmacionCompraPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { clearCart } = useCart()
  const [orderDetails, setOrderDetails] = useState<OrderDetails[] | null>(null)
  const [loading, setLoading] = useState(true)
  // const { id } = useParams()

  // Lanzar confetti y obtener detalles de la orden solo una vez
  useEffect(() => {
    // Verificar si estamos en el navegador
    if (typeof window !== "undefined" && loading) {
      // Lanzar confetti solo una vez
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      const queryParams = new URLSearchParams(window.location.search)
      const id = queryParams.get('id')

      if (id) {
        const fetchOrderDetails = async () => {
          try {
            const response = await fetch(`/api/detalles-ventas/${id}`)
            if (response.ok) {
              const data = await response.json()
              setOrderDetails(data)
            } else {
              throw new Error("No se pudo obtener los detalles de la compra.")
            }
          } catch (error) {
            void error
            toast({
              title: "Error",
              description: "Hubo un problema al obtener los detalles de la compra.",
              variant: "destructive",
            })
          }
        }
        fetchOrderDetails()
      }

      // Limpiar el carrito solo una vez
      clearCart()

      // Finalizar carga
      setLoading(false)
    }
  }, [clearCart, loading])

  // Función para generar y descargar la factura en PDF
  const downloadInvoice = () => {
    if (!orderDetails) return

    // Crear un nuevo documento PDF
    const doc = new jsPDF()

    // Añadir logo y título
    doc.setFontSize(20)
    doc.setTextColor(215, 38, 56) // Color #D72638
    doc.text("M Club GYM", 105, 20, { align: "center" })
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text("FACTURA", 105, 30, { align: "center" })

    // Información de la factura
    doc.setFontSize(10)
    doc.text(`Nº de Factura: ${orderDetails[0].venta_id}`, 20, 45)
    doc.text(`Fecha: ${format(new Date(orderDetails[0].venta.fecha_venta), "dd/MM/yyyy", { locale: es })}`, 20, 52)


    const metodoPago = orderDetails[0].metodo_pago.nombre

    // Condicional para verificar el método de pago y asignar el texto adecuado
    let metodoPagoTexto = ""
    if (metodoPago === "Contra_Entrega") {
      metodoPagoTexto = "Contra entrega"
    } else if (metodoPago === "Paypal") {
      metodoPagoTexto = "Paypal"
    } else if (metodoPago === "Tarjeta_de_credito_debito") {
      metodoPagoTexto = "Tarjeta de crédito/débito"
    }

    doc.text(`Método de pago: ${metodoPagoTexto}`, 20, 59)
    doc.text(`Método de entrega: ${metodoPagoTexto}`, 20, 66)

    // Información de la empresa
    doc.text("Gym M Club", 140, 45)
    doc.text("RUC: 10740807221", 140, 52)
    doc.text("Av. Los Libertadores - San Vicente, Cañete", 140, 59)
    doc.text("Teléfono: +51 996-239-668", 140, 66)
    doc.text("M Club GYM", 140, 45)
    doc.text("RUC: 10740807221", 140, 52)
    doc.text("Av. Libertadores, San Vicente de Cañete", 140, 59)
    doc.text("Teléfono: +51 996239668", 140, 66)
    // Línea separadora
    doc.setDrawColor(215, 38, 56) // Color #D72638
    doc.setLineWidth(0.5)
    doc.line(20, 75, 190, 75)

    // Tabla de productos y membresías
    const tableColumn = ["Producto/Membresía", "Cantidad", "Precio Unit.", "Total"]
    const tableRows: (string | number)[][] = []

    // Iterar sobre todas las órdenes (orderDetails es un array de OrderDetails)
    if (orderDetails && orderDetails.length > 0) {
      orderDetails.forEach((order: OrderDetails) => {
        // Verificar si existe un producto y añadirlo a la tabla
        if (order.producto) {
          const productData: (string | number)[] = [
            order.producto.nombre, // Producto
            order.cantidad, // Cantidad
            `S/ ${order.producto.precio.toFixed(2)}`, // Precio Unitario
            `S/ ${(order.producto.precio * order.cantidad).toFixed(2)}`, // Total
          ]
          tableRows.push(productData)
        }

        // Verificar si existe una membresía y añadirla a la tabla
        if (order.plan_membresia) {
          const membershipData: (string | number)[] = [
            order.plan_membresia.nombre, // Membresía
            order.cantidad, // Cantidad
            `S/ ${order.plan_membresia.precio.toFixed(2)}`, // Precio Unitario
            `S/ ${(order.plan_membresia.precio * order.cantidad).toFixed(2)}`, // Total
          ]
          tableRows.push(membershipData)
        }
      })
    } else {
      tableRows.push(["No hay productos ni membresías en esta orden", "", "", ""])
    }


    // Generar la tabla
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 85,
      theme: "striped",
      headStyles: {
        fillColor: [215, 38, 56], // Color #D72638
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    })

    // Calcular la posición Y después de la tabla
    const docWithTable = doc as jsPDF & { lastAutoTable: { finalY: number } }
    const finalY = docWithTable.lastAutoTable.finalY + 10

    const subtotal = orderDetails.reduce((acc, order) => {
      // Sumar productos
      if (order.producto) {
        return acc + (order.producto.precio * order.cantidad)
      }
      // Sumar membresías
      if (order.plan_membresia) {
        return acc + (order.plan_membresia.precio * order.cantidad)
      }
      return acc
    }, 0)

    const total = subtotal

    // Resumen de totales
    doc.text("Subtotal:", 130, finalY + 10)
    doc.text(`S/ ${total.toFixed(2)}`, 175, finalY + 10, { align: "right" })

    doc.text("Envío:", 130, finalY + 17)
    doc.text("Gratis", 175, finalY + 17, { align: "right" })

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("TOTAL:", 130, finalY + 27)
    doc.text(`S/ ${total.toFixed(2)}`, 175, finalY + 27, { align: "right" })

    // Pie de página
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text("Este documento es una representación impresa de la factura electrónica.", 105, finalY + 45, {
      align: "center",
    })
    doc.text("Gracias por tu compra en M Club GYM.", 105, finalY + 50, { align: "center" })
    // Guardar el PDF
    doc.save(`Factura_${orderDetails[0].venta_id}.pdf`)

    // Mostrar toast de confirmación
    toast({
      title: "Factura descargada",
      description: "La factura se ha descargado correctamente",
      duration: 3000,
    })
  }

  // Si está cargando, mostrar un spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#D72638] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Procesando tu compra...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-16 min-h-screen bg-background">

      <Navbar currentPage="productos" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mensaje de éxito */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">¡Compra Exitosa!</h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Tu pedido ha sido procesado correctamente. Hemos enviado un correo electrónico con los detalles de tu
            compra.
          </p>
        </div>

        {/* Detalles del pedido */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-[#D72638]/5 border-b border-[#D72638]/10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Detalles del Pedido</CardTitle>
                <CardDescription>
                  {orderDetails && orderDetails.length > 0 ? (
                    <>
                      Pedido #{orderDetails[0].venta_id} • {" "}
                      {orderDetails[0].venta?.fecha_venta
                        ? format(new Date(orderDetails[0].venta.fecha_venta), "d 'de' MMMM, yyyy", { locale: es })
                        : "Fecha no disponible"}
                    </>
                  ) : (
                    "Detalles no disponibles"
                  )}
                </CardDescription>

              </div>

              <Button variant="outline" className="flex items-center gap-2" onClick={downloadInvoice}>
                <Download className="h-4 w-4" /> Factura
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-4">Información del Pedido</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Estado del Pedido</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails?.[0]?.estado_pago.nombre || "Tarjeta de crédito"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Método de Pago</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails?.[0]?.metodo_pago?.nombre === "Contra_Entrega"
                          ? "Contra Entrega"
                          : orderDetails?.[0]?.metodo_pago?.nombre === "Paypal"
                            ? "Paypal"
                            : orderDetails?.[0]?.metodo_pago?.nombre === "Tarjeta_de_credito_debito"
                              ? "Tarjeta de crédito/débito"
                              : "Tarjeta de crédito"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-start gap-3">
                    <div className="bg-[#D72638]/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-[#D72638]" />
                    </div>
                    <div>
                      <p className="font-medium">Entrega Estimada</p>
                      <p className="text-sm text-muted-foreground">
                        {orderDetails?.estimatedDelivery &&
                          format(new Date(orderDetails.estimatedDelivery), "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-4">Resumen de Compra</h3>
                <div className="space-y-3">
                  {orderDetails && orderDetails.length > 0 ? (
                    orderDetails.map((order: OrderDetails, orderIndex: number) => (
                      <div key={orderIndex} className="border-b pb-4">
                        <div className="space-y-3">
                          {order.producto || order.plan_membresia ? (
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                                  {/* Si es producto */}
                                  {order.producto ? (
                                    <ShoppingBag className="h-5 w-5 text-[#D72638]" />
                                  ) : (
                                    <Dumbbell className="h-5 w-5 text-[#D72638]" />
                                  )}
                                </div>

                                <div>
                                  {/* Si es producto */}
                                  {order.producto ? (
                                    <>
                                      <p className="font-medium text-sm">{order.producto?.nombre}</p>
                                      <p className="text-xs text-muted-foreground">Cant: {order.cantidad}</p>
                                    </>
                                  ) : (
                                    // Si es membresía
                                    <>
                                      <p className="font-medium text-sm">{order.plan_membresia?.nombre}</p>
                                      <p className="text-xs text-muted-foreground">Cant: {order.cantidad}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="font-medium">
                                S/ {order.precio_unitario * order.cantidad}
                              </p>
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No hay productos en este pedido.</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No se encontraron detalles de la compra.</p>
                  )}
                </div>



                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      S/ {orderDetails?.reduce((acc, order) => acc + (order.precio_unitario * order.cantidad), 0) || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>
                      S/ {orderDetails?.reduce((acc, order) => acc + (order.precio_unitario * order.cantidad), 0) || 0}
                    </span>
                  </div>
                </div>
              </div>


            </div>
          </CardContent>
        </Card>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push("/")}>
            Seguir Comprando
          </Button>

          <Button
            className="bg-[#D72638] hover:bg-[#B91E2F] text-white flex items-center gap-2"
            onClick={() => {
              // Verificar si hay membresías en la orden
              const hasMembership = orderDetails?.some((order: OrderDetails) =>
                order.plan_membresia !== null
              )

              if (hasMembership) {
                router.push("/membresias/mi-membresia")
              } else {
                router.push("/")
              }
            }}
          >
            {orderDetails?.some((order: OrderDetails) => order.plan_membresia !== null)
              ? "Ver Mi Membresía"
              : "Mi Cuenta"}
            <ArrowRight className="h-4 w-4" />
          </Button>

        </div>
      </main>

      <Toaster />
    </div>
  )
}
