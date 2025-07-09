export interface Producto {
    producto_id: number
    nombre: string
    descripcion: string
    precio: number
    stock: number
    categoriaId: number
    estado: boolean
    imagen: string
    categoria?: {
        categoria_id: number
        nombre: string
    }
}

export interface Categoria {
    categoria_id: number
    nombre: string
}

export interface ProductGridProps {
    products: Producto[]
    loading: boolean
    onAddToCart: (product: Producto) => void
}

export interface ProductosFilterProps {
    selectedCategory: string
    setSelectedCategory: (value: string) => void
    sortBy: string
    setSortBy: (value: string) => void
    categories: { value: string, label: string }[]
}

export interface ProductDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    product: Producto
}

export interface DeleteProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Producto;
    onDelete: (deletedProductId: number) => void;
}

export interface UpdateProductDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    producto: Producto
    onSuccess: () => void
};