import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, BarChart, Eye } from "lucide-react"
import { ProductDetailsDialogProps } from '@/types/productos'
import { getEstadoLabel, getEstado } from '@/utils/productoUtils'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

const DetailsProductDialog = ({ open, onOpenChange, product }: ProductDetailsDialogProps) => {
    const estado = getEstado(product.stock)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <DialogTitle className="text-2xl">{product.nombre}</DialogTitle>
                <DialogDescription>Detalles completos del producto</DialogDescription>
            </DialogHeader>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-[#D72638]" />
                        Detalles del Producto
                    </DialogTitle>
                    <DialogDescription>Información completa del producto seleccionado</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                            <Image
                                src={product.imagen || "/placeholder.svg?height=200&width=200"}
                                alt={product.nombre}
                                width={200}  // Ajusta el ancho adecuado
                                height={200} // Ajusta la altura adecuada
                                className="w-full h-full rounded-lg object-cover border"
                                layout="intrinsic"  // Usar layout "intrinsic" para que se adapte al tamaño de la imagen
                            />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">{product.nombre}</h3>
                                <p className="text-muted-foreground mt-1">{product.descripcion}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{product.categoria?.nombre}</Badge>
                                <Badge
                                    variant={
                                        estado === "agotado"
                                            ? "destructive"
                                            : estado === "stock-bajo"
                                                ? "secondary"
                                                : "default"
                                    }
                                    className={
                                        estado === "agotado"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                            : estado === "stock-bajo"
                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                    }
                                >
                                    {getEstadoLabel(estado)}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    <div>
                                        <CardTitle className="text-lg">Información de Precio</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Precio Unitario:</span>
                                    <span className="font-semibold text-2xl text-[#D72638]">S/ {product.precio}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <BarChart className="h-5 w-5 text-primary" />
                                    <div>
                                        <CardTitle className="text-lg">Inventario</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Stock Actual:</span>
                                    <span className={`font-semibold ${product.stock < 10 ? "text-orange-600" : "text-green-600"}`}>
                                        {product.stock} unidades
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DetailsProductDialog;
