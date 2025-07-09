// components/ProtectedRoute.tsx
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
    }
    if (status === "unauthenticated") {
        return null
    }
    return <>{children}</>
}
