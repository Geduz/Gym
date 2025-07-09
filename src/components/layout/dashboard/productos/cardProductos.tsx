"use client"

import { Package, DollarSign, TrendingDown, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useProductos } from "@/hooks/useProductos"
import { getEstado } from '@/utils/productoUtils'

const CardProductos = () => {
    const { productos, loading } = useProductos()

    // Cálculos
    const totalProductos = productos.length
    const totalValor = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0)
    const lowStock = productos.filter(p => getEstado(p.stock) === "stock-bajo").length
    const agotados = productos.filter(p => getEstado(p.stock) === "agotado").length

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
                <span className="ml-2 text-muted-foreground">Cargando...</span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-[#D72638]">{totalProductos}</div>
                            <p className="text-sm text-muted-foreground">Total Productos</p>
                        </div>
                        <Package className="h-8 w-8 text-[#D72638]" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-green-600">S/.{totalValor.toFixed(2)}</div>
                            <p className="text-sm text-muted-foreground">Valor Inventario</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">{lowStock}</div>
                            <p className="text-sm text-muted-foreground">Stock Bajo</p>
                        </div>
                        <TrendingDown className="h-8 w-8 text-yellow-600" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-red-600">{agotados}</div>
                            <p className="text-sm text-muted-foreground">Agotados</p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardProductos
