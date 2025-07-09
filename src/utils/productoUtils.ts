//Funcion paras las opciones de filtro
export const sortOptions = [
    { value: "destacados", label: "Destacados" },
    { value: "precio-asc", label: "Precio: Menor a Mayor" },
    { value: "precio-desc", label: "Precio: Mayor a Menor" },
    { value: "nombre", label: "Nombre A-Z" },
]

//Funcion para determinar estado por stock
export const getEstado = (stock: number) => {
    if (stock === 0) return "agotado"
    if (stock < 10) return "stock-bajo"
    return "disponible"
}

//Funcion para determinar el estado visualmente
export const getEstadoLabel = (estado: string) => {
    if (estado === "agotado") return "Agotado"
    if (estado === "stock-bajo") return "Stock Bajo"
    return "Disponible"
}
