"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Package } from "lucide-react"
import { ProductGridProps } from '@/types/productos'

const ProductGrid = ({ products, loading, onAddToCart }: ProductGridProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
                <span className="ml-2 text-muted-foreground">Cargando productos...</span>
            </div>
        )
    }

    if (!products.length) {
        return (
            <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground">Intenta ajustar tus filtros o términos de búsqueda</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {products.map((product) => (
                <Card key={product.producto_id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                        <div className="relative">
                            <Image
                                src={product.imagen || "/placeholder.svg"}
                                alt={product.nombre}
                                width={300}
                                height={300}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            {!product.stock && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                                    <span className="text-white font-semibold">Agotado</span>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-foreground mb-2">{product.nombre}</CardTitle>
                        <CardDescription className="text-sm mb-4">{product.descripcion}</CardDescription>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[#D72638]">S/{product.precio}</span>
                            <Button
                                onClick={() => onAddToCart(product)}
                                disabled={!product.stock}
                                className="bg-[#D72638] hover:bg-[#B91E2F] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.stock ? "Agregar al Carrito" : "Agotado"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default ProductGrid