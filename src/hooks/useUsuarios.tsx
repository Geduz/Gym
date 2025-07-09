import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { Usuario } from "@/types/usuario"

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [error] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const fetchUsuarios = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/usuarios')
            if (!res.ok) throw new Error("Error al obtener los usuarios")
            const data = await res.json()
            if (res.ok) {
                setUsuarios(data)
            } else {
                toast({
                    title: "Error",
                    description: "No se pudieron obtener los usuarios",
                    duration: 3000,
                })
            }
        } catch (error) {
            console.error("Error fetching usuarios:", error)
            toast({
                title: "Error",
                description: "Hubo un problema al cargar los usuarios",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }, [toast])


    useEffect(() => {
        fetchUsuarios()
    }, [fetchUsuarios])

    return { usuarios, loading, error, fetchUsuarios, }
}
