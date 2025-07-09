import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DetalleVentas } from "@/types/ventas"

interface GridDetalleVentasProps {
    detalleVentas: DetalleVentas[]
}

const GridReportes = ({ detalleVentas }: GridDetalleVentasProps) => {

    if (detalleVentas.length === 0) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>No hay membresías compradas</CardTitle>
                        <CardDescription>No se han realizado compras de membresías hasta el momento.</CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>No hay productos comprados</CardTitle>
                        <CardDescription>No se han comprado productos hasta el momento.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    // Distribución de Membresías
    const membershipStats = [1, 2, 3].map(planId => {
        const planVentas = detalleVentas.filter(venta => venta.plan_membresia_id === planId)
        const planName = planId === 1 ? "Plan Básico" : planId === 2 ? "Plan Estándar" : "Plan Premium"
        const totalRevenue = planVentas.reduce((sum, venta) => sum + venta.precio_unitario, 0)
        const totalCount = planVentas.length

        return {
            plan: planName,
            count: totalCount,
            revenue: totalRevenue,
            percentage: (totalRevenue / detalleVentas.reduce((sum, venta) => sum + venta.precio_unitario, 0)) * 100
        }
    })

    // Top Productos
    const topProducts = detalleVentas.filter(venta => venta.producto_id !== null).reduce((acc, venta) => {
        const productId = venta.producto_id as number
        const existingProduct = acc.find(item => item.producto_id === productId)

        if (existingProduct) {
            existingProduct.sold += venta.cantidad
            existingProduct.revenue += venta.subtotal
        } else {
            acc.push({
                producto_id: productId,
                sold: venta.cantidad,
                revenue: venta.subtotal,
                name: venta.producto?.nombre || "Producto Desconocido",
            })
        }

        return acc
    }, [] as { producto_id: number, sold: number, revenue: number, name: string }[])

    // Ordenamos los productos por cantidad vendida
    topProducts.sort((a, b) => b.sold - a.sold)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Distribución de Membresías */}
            <Card>
                <CardHeader>
                    <CardTitle>Distribución de Membresías</CardTitle>
                    <CardDescription>Ingresos por tipo de plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {membershipStats.map((stat) => (
                        <div key={stat.plan} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Badge variant="outline">{stat.plan}</Badge>
                                    <span className="text-sm text-muted-foreground">{stat.count} miembros</span>
                                </div>
                                <span className="font-medium">S/ {stat.revenue.toFixed(2)}</span>
                            </div>
                            <Progress value={stat.percentage} className="h-2" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Productos Más Vendidos */}
            <Card>
                <CardHeader>
                    <CardTitle>Productos Más Vendidos</CardTitle>
                    <CardDescription>Top productos por ventas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={product.producto_id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-[#D72638] text-white rounded-full flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-sm text-muted-foreground">{product.sold} unidades</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">S/ {product.revenue.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GridReportes