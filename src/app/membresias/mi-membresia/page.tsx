"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { Activity } from "lucide-react"
import { differenceInDays } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import { Membresias } from "@/types/membresias"
import { UsuarioSession } from "@/types/usuario"
import InfoUser from "@/components/layout/mi-membresia/InfoUser"
import PlanStatus from "@/components/layout/mi-membresia/planStatus"
import HeaderMiMembresia from "../../../components/layout/mi-membresia/header"
import TabsMiMembresia from "../../../components/layout/mi-membresia/tabsMiMembresia"
import { useRouter } from "next/navigation"

export default function MiMembresia() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<UsuarioSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [membershipData, setMembershipData] = useState<Membresias | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/membresias")
    }
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user)
      const fetchUserMembership = async () => {
        try {
          setIsLoading(true)
          const response = await fetch(`/api/membresias/${session.user.usuario_id}`)
          const data = await response.json()

          if (response.ok && data.length > 0) {
            setMembershipData(data[0])
          } else {
            toast({
              title: "Error",
              description: data.error || "No se pudo obtener la membresía.",
              variant: "destructive",
            })
          }
        } catch (error) {
          void error
          toast({
            title: "Error",
            description: "Hubo un problema al cargar la membresía.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchUserMembership()
    }
  }, [status, session?.user?.usuario_id, toast, session?.user])


  if (isLoading || !user || !membershipData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">Cargando información de membresía...</p>
        </div>
      </div>
    )
  }

  // Calcular días restantes
  const daysRemaining = differenceInDays(membershipData.fecha_fin, new Date())
  const totalDays = differenceInDays(membershipData.fecha_fin, membershipData.fecha_inicio)
  const progressPercentage = 100 - Math.round((daysRemaining / totalDays) * 100)

  return (
    <div className="mt-16 min-h-screen bg-background">
      <Navbar currentPage="mi-membresia" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeaderMiMembresia />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            <PlanStatus membershipData={membershipData} daysRemaining={daysRemaining} progressPercentage={progressPercentage} />

            <TabsMiMembresia membershipData={membershipData} />

          </div>

          <InfoUser user={user} />

        </div>
      </main>

      <Toaster />
    </div>
  )
}