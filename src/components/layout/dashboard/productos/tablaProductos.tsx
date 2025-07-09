"use client"

import { useState, useMemo } from "react"
import { Search, Package, AlertTriangle, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProductos } from "@/hooks/useProductos"
import { useCategorias } from "@/hooks/useCategorias"
import { getEstado, getEstadoLabel } from '@/utils/productoUtils'
import { Producto } from '@/types/productos'
import DetailsProductDialog from '@/components/layout/dashboard/productos/detallesProducto'
import DeleteProductDialog from '@/components/layout/dashboard/productos/eliminarProducto'
import UpdateProductDialog from '@/components/layout/dashboard/productos/actualizarProducto'

const TablaProductos = () => {
    const { productos, loading, fetchProductos } = useProductos()
    const { categorias } = useCategorias()
    const [viewProduct, setViewProduct] = useState<Producto | null>(null)
    const [editProduct, setEditProduct] = useState<Producto | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Producto | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [estadoFilter, setEstadoFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSuccess = () => {
        fetchProductos();
    };

    const handleDeleteProduct = () => {
        fetchProductos()
    }

    const categoriaMap = useMemo(() => {
        const map: Record<number, string> = {}
        categorias.forEach((c) => { map[c.categoria_id] = c.nombre })
        return map
    }, [categorias])

    // Filtrar productos
    const filteredProducts = useMemo(() =>
        productos.filter((product) => {
            const estado = getEstado(product.stock)
            const matchesSearch =
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory =
                categoryFilter === "all" || categoriaMap[product.categoriaId]?.toLowerCase() === categoryFilter
            const matchesEstado =
                estadoFilter === "all" || estado === estadoFilter
            return matchesSearch && matchesCategory && matchesEstado
        }), [productos, searchTerm, categoryFilter, estadoFilter, categoriaMap])

    // Paginación
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
                <span className="ml-2 text-muted-foreground">Cargando productos...</span>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <CardTitle>Inventario de Productos</CardTitle>
                        <CardDescription>{filteredProducts.length} productos encontrados</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Buscar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar productos..."
                                className="pl-10 w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Filtro Categoría */}
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Todas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                {categorias.map((cat) => (
                                    <SelectItem key={cat.categoria_id} value={cat.nombre.toLowerCase()}>
                                        {cat.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {/* Filtro Estado */}
                        <Select value={estadoFilter} onValueChange={setEstadoFilter}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Todos" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="disponible">Disponible</SelectItem>
                                <SelectItem value="stock-bajo">Stock Bajo</SelectItem>
                                <SelectItem value="agotado">Agotado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedProducts.map((product) => {
                            const estado = getEstado(product.stock)
                            return (
                                <TableRow key={product.producto_id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                                <Package className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{product.nombre}</p>
                                                <p className="text-sm text-muted-foreground">ID: {product.producto_id}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{categoriaMap[product.categoriaId]}</Badge>
                                    </TableCell>
                                    <TableCell>S/.{product.precio.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <span>{product.stock}</span>
                                            {estado === "stock-bajo" && (
                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setViewProduct(product)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Ver Detalles
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setEditProduct(product)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => setDeleteProduct(product)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4 mb-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page ? "bg-[#D72638] hover:bg-[#B91E2F]" : ""}
                        >
                            {page}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </Button>
                </div>
            )}

            {editProduct && (
                <UpdateProductDialog
                    open={!!editProduct}
                    onOpenChange={(open) => !open && setEditProduct(null)}
                    producto={editProduct}
                    onSuccess={handleSuccess}
                />
            )}

            {viewProduct && (
                <DetailsProductDialog
                    open={!!viewProduct}
                    onOpenChange={(open) => !open && setViewProduct(null)}
                    product={{
                        ...viewProduct
                    }}
                />
            )}

            {deleteProduct && (
                <DeleteProductDialog
                    open={!!deleteProduct}
                    onOpenChange={(open) => !open && setDeleteProduct(null)}
                    product={deleteProduct}
                    onDelete={handleDeleteProduct}
                />
            )}
        </Card>
    )
}

export default TablaProductos
