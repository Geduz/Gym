import {
    TrendingUp,
    Users,
    DollarSign,
    ShoppingBag,
    Dumbbell
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DetalleVentas } from "@/types/ventas";
import { Usuario } from "@/types/usuario";

const monthlyData = [
    { month: "Enero", members: 1150, revenue: 42500, classes: 85 },
    { month: "Febrero", members: 1180, revenue: 44200, classes: 88 },
    { month: "Marzo", members: 1200, revenue: 45800, classes: 92 },
    { month: "Abril", members: 1220, revenue: 46500, classes: 89 },
    { month: "Mayo", members: 1234, revenue: 47200, classes: 94 },
    { month: "Junio", members: 1245, revenue: 48100, classes: 96 },
]

interface CardDetalleVentasProps {
    detalleVentas: DetalleVentas[]
    usuarios: Usuario[]
}

const CardReportes = ({ detalleVentas, usuarios }: CardDetalleVentasProps) => {

    // Calculamos los datos reales basados en detalleVentas
    const ingresosTotales = detalleVentas.reduce((total, detalle) => total + detalle.subtotal, 0);

    const usuariosTotales = usuarios.length

    const totalProductos = detalleVentas
        .filter(detalle => detalle.producto_id !== null)
        .reduce((total, detalle) => total + detalle.cantidad, 0);

    const totalMembresias = detalleVentas.filter(detalle => detalle.plan_membresia_id !== null).length;

    // Mantenemos los datos estáticos para el cálculo de crecimiento de miembros
    const currentMonth = monthlyData[monthlyData.length - 1]
    const previousMonth = monthlyData[monthlyData.length - 2]

    const memberGrowth = (((currentMonth.members - previousMonth.members) / previousMonth.members) * 100).toFixed(1)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    S/.{ingresosTotales.toLocaleString()}
                                </div>
                                <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                    <span className="text-xs text-green-600">Basado en ventas</span>
                                </div>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-[#D72638]">{usuariosTotales}</div>
                                <p className="text-sm text-muted-foreground">Total miembros</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                    <span className="text-green-600">+{memberGrowth}%</span> vs mes anterior
                                </div>
                            </div>
                            <Users className="h-8 w-8 text-[#D72638]" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {totalProductos}
                                </div>
                                <p className="text-sm text-muted-foreground">Total Productos vendidos</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                    <span className="text-xs text-green-600">Productos únicos</span>
                                </div>
                            </div>
                            <ShoppingBag className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {totalMembresias}
                                </div>
                                <p className="text-sm text-muted-foreground">Total membresias vendidas</p>
                                <div className="flex items-center mt-1">
                                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                                    <span className="text-xs text-green-600">Membresías activas</span>
                                </div>
                            </div>
                            <Dumbbell className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

            </div >
        </>
    )
}

export default CardReportes