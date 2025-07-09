import { useState, useEffect } from "react"
import { Categoria } from '@/types/productos'
import { useToast } from "@/hooks/use-toast"

export function useCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        const fetchCategorias = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/categoria')
                if (!res.ok) throw new Error("Error al obtener las categorias")
                const data = await res.json()
                setCategorias(data)
            } catch (err) {
                const message = (err as Error).message
                setError(message)
                toast({
                    title: "Error al cargar las categorias",
                    description: message,
                    variant: "destructive"
                })
            } finally {
                setLoading(false)
            }
        }

        fetchCategorias()
    }, [toast])

    return { categorias, loading, error }
}
