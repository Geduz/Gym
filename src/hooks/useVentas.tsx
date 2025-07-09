import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { DetalleVentas } from "@/types/ventas"

export function useVentas() {
    const [detalleVentas, setDetalleVentas] = useState<DetalleVentas[]>([])
    const [error] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const fetchDetalleVentas = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/detalles-ventas')
            if (!res.ok) throw new Error("Error al obtener los detalle de ventas")
            const data = await res.json()
            if (res.ok) {
                setDetalleVentas(data)
            } else {
                toast({
                    title: "Error",
                    description: "No se pudieron obtener los detalles de ventas",
                    duration: 3000,
                })
            }
        } catch (error) {
            console.error("Error fetching trainers:", error)
            toast({
                title: "Error",
                description: "Hubo un problema al cargar los detalles de ventas",
                duration: 3000,
            })
        } finally {
            setLoading(false)
        }
    }, [toast])

    // Función para crear un nuevo entrenador
    // const createEntrenador = async (nuevoEntrenador: Entrenadores) => {
    //     setLoading(true)
    //     try {
    //         const res = await fetch('/api/entrenadores', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(nuevoEntrenador),
    //         })

    //         if (!res.ok) throw new Error("Error al registrar el entrenador")

    //         const data = await res.json()

    //         setTrainers((prevTrainers) => [...prevTrainers, data.entrenador])

    //         toast({
    //             title: "¡Entrenador registrado con éxito!",
    //             description: data.message,
    //             duration: 3000,
    //         })
    //     } catch (error) {
    //         console.error("Error creating trainer:", error)
    //         toast({
    //             title: "Error",
    //             description: "Hubo un problema al registrar al entrenador",
    //             duration: 3000,
    //         })
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // Función para eliminar un entrenador
    // const deleteEntrenador = async (id: number) => {
    //     setLoading(true)
    //     try {
    //         const res = await fetch(`/api/entrenadores/${id}`, {
    //             method: 'DELETE',
    //         })

    //         const data = await res.json()
    //         console.log("Respuesta de la API de eliminación:", data)

    //         if (data.success) {
    //             setTrainers((prevTrainers) =>
    //                 prevTrainers.filter(trainer => trainer.entrenador_id !== id)
    //             )

    //             toast({
    //                 title: "¡Entrenador eliminado con éxito!",
    //                 description: "El entrenador ha sido eliminado correctamente.",
    //                 duration: 3000,
    //             })

    //             return { success: true }
    //         } else {
    //             throw new Error(data.error || data.message || "Error al eliminar")
    //         }

    //     } catch (error) {
    //         console.error("Error deleting trainer:", error)
    //         toast({
    //             title: "Error",
    //             description: "Hubo un problema al eliminar al entrenador",
    //             duration: 3000,
    //         })
    //         return { success: false, message: "Error al eliminar el entrenador" }
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    useEffect(() => {
        fetchDetalleVentas()
    }, [fetchDetalleVentas])

    return { detalleVentas, loading, error, fetchDetalleVentas, }
}
