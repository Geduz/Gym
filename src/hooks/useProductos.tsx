"use client"

import { useState, useEffect, useCallback } from "react"
import { Producto } from "@/types/productos"
import { useToast } from "@/hooks/use-toast"

export function useProductos() {
    const [productos, setProductos] = useState<Producto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()

    // Obtener productos
    const fetchProductos = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/producto")
            if (!res.ok) throw new Error("Error al obtener productos")
            const data = await res.json()
            setProductos(data)
        } catch (err) {
            const message = (err as Error).message
            setError(message)
            toast({
                title: "Error al cargar productos",
                description: message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }, [toast])

    // Función para enviar el producto
    const createProducto = useCallback(async (productoData: Omit<Producto, 'producto_id'>) => {
        setLoading(true)
        try {
            const res = await fetch("/api/producto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoData)
            })
            if (!res.ok) throw new Error("Error al crear producto")
            const newProducto = await res.json()
            setProductos(prev => [...prev, newProducto])
            toast({
                title: "Producto creado",
                description: `El producto ${productoData.nombre} se ha creado correctamente`,
                variant: "default"
            })
        } catch (err) {
            const message = (err as Error).message
            setError(message)
            toast({
                title: "Error al crear producto",
                description: message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }, [toast])

    // Función para actualizar un producto
    const updateProducto = useCallback(async (productoData: Producto) => {
        setLoading(true)
        try {
            // Enviar actualización al backend
            const res = await fetch(`/api/producto/${productoData.producto_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoData)
            })

            if (!res.ok) throw new Error("Error al actualizar el producto")

            const updatedProducto = await res.json()

            setProductos((prevProducts) =>
                prevProducts.map((product) =>
                    product.producto_id === updatedProducto.producto_id ? updatedProducto : product
                )
            )

            toast({
                title: "Producto actualizado",
                description: `El producto ${productoData.nombre} se ha actualizado correctamente`,
                variant: "default"
            })
        } catch (err) {
            const message = (err as Error).message
            setError(message)
            toast({
                title: "Error al actualizar producto",
                description: message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }, [toast])


    // Función para eliminar un producto
    const deleteProduct = useCallback(async (productId: number): Promise<{ success: boolean, message: string }> => {
        try {
            const response = await fetch(`/api/producto/${productId}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Error al eliminar el producto")
            }

            setProductos((prevProducts) =>
                prevProducts.filter((product) => product.producto_id !== productId)
            )

            return { success: true, message: `El producto con ID ${productId} ha sido eliminado correctamente.` }
        } catch (error) {
            const message = (error as Error).message
            return { success: false, message: `Ocurrió un error al eliminar el producto. ${message}` }
        }
    }, [toast])

    useEffect(() => {
        fetchProductos()
    }, [fetchProductos])

    return { productos, loading, error, createProducto, fetchProductos, deleteProduct, updateProducto }
}
