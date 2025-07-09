"use client"

import { Search } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useCart } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"
import { useProductos } from '@/hooks/useProductos'
import { useCategorias } from '@/hooks/useCategorias'
import ProductosFilter from "@/components/layout/productos/filtrosProductos"
import ProductGrid from "@/components/layout/productos/productosGrid"
import { Producto, Categoria } from '@/types/productos'

const ProductosPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [sortBy, setSortBy] = useState("destacados")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { productos, loading: loadingProductos } = useProductos()
  const { categorias, loading: loadingCategorias } = useCategorias()
  const { toast } = useToast()
  const { addToCart } = useCart()

  // Construir el mapa de categorias id => nombre
  const CATEGORY_MAP = useMemo(() => {
    const map: Record<number, string> = {}
    categorias.forEach(cat => {
      map[cat.categoria_id] = cat.nombre.toLowerCase()
    })
    return map
  }, [categorias])

  // Opciones de categorías para el filtro
  const categories = useMemo(() => [
    { value: "todos", label: "Todas las categorías" },
    ...categorias.map((cat: Categoria) => ({
      value: cat.nombre.toLowerCase(),
      label: cat.nombre,
    }))
  ], [categorias])

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = (productos || []).filter((product) => {
      const matchesSearch =
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "todos" ||
        CATEGORY_MAP[product.categoriaId] === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Ordenar productos
    switch (sortBy) {
      case "precio-asc":
        filtered.sort((a, b) => a.precio - b.precio)
        break
      case "precio-desc":
        filtered.sort((a, b) => b.precio - a.precio)
        break
      case "nombre":
        filtered.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      default:
        // Destacados - mantener orden original
        break
    }

    return filtered
  }, [productos, searchTerm, selectedCategory, sortBy, CATEGORY_MAP])

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleAddToCart = (product: Producto) => {
    const added = addToCart({
      id: product.producto_id,
      name: product.nombre,
      price: product.precio,
      quantity: 1,
      image: product.imagen,
      type: "product",
      description: product.descripcion,
    })

    if (added) {
      toast({
        title: "¡Producto agregado!",
        description: `${product.nombre} se agregó al carrito`,
        duration: 3000,
      })
    }
  }

  return (
    <div className="mt-16 min-h-screen bg-background">
      <Navbar currentPage="productos" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nuestra Tienda</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de suplementos, ropa y accesorios para optimizar tu entrenamiento
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            {/* Barra de busqueda*/}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtros de productos*/}
            <div className="flex gap-4">
              <ProductosFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categories}
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Mostrando {paginatedProducts.length} de {filteredAndSortedProducts.length} productos
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={paginatedProducts}
          loading={loadingProductos || loadingCategorias}
          onAddToCart={handleAddToCart}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
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
      </main>
      <Toaster />
    </div>
  )
}

export default ProductosPage