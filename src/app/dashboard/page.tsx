"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  Activity,
  Package,
  UserCheck,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider, SidebarOverlay } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "@/components/layout/dashboard/sidebar"
import { UsuarioSession } from "@/types/usuario"
import Header from "@/components/layout/dashboard/header"

// Datos de ejemplo
const stats = [
  {
    title: "Miembros Activos",
    value: "12",
    change: "+236%",
    icon: Users,
    color: "text-[#D72638]",
  },
  {
    title: "Ingresos Mensuales",
    value: "$2,753",
    change: "+13%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Clases Programadas",
    value: "89",
    change: "+5%",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Entrenadores",
    value: "2",
    change: "+2",
    icon: UserCheck,
    color: "text-purple-600",
  },
]

const recentMembers = [
  { name: "Piero Llanos", email: "piero@gmail.com", plan: "Premium", status: "Activo" },
  { name: "Milagros Alamo", email: "milagros@gmail.com", plan: "Básico", status: "Activo" },
  { name: "Carlos López", email: "carlos@email.com", plan: "Premium", status: "Pendiente" },
  { name: "Ana Martín", email: "ana@email.com", plan: "Estándar", status: "Activo" },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return null
  }

  const user = session.user as UsuarioSession

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar user={user} />
        <SidebarOverlay isOpen={false} />
        <div className="flex-1 ml-64">
          {/* Header */}
          <Header titulo="Dashboard" />

          {/* Main Content */}
          <main className="p-6">
            {/* Welcome Message */}
            <div className="mb-6 p-4 bg-[#D72638]/10 border border-[#D72638]/20 rounded-lg">
              <h2 className="text-lg font-semibold text-[#D72638] mb-1">¡Bienvenido al Panel de Administración!</h2>
              <p className="text-sm text-muted-foreground">
                Estás conectado como <strong>{user.role}</strong> - {user.correo}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-green-600 mt-1">{stat.change} desde el mes pasado</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Members */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Miembros Recientes</CardTitle>
                    <CardDescription>Últimos miembros registrados</CardDescription>
                  </div>
                  <Button size="sm" className="bg-[#D72638] hover:bg-[#B91E2F]">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={member.status === "Activo" ? "default" : "secondary"}
                            className={
                              member.status === "Activo"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : ""
                            }
                          >
                            {member.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{member.plan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
                  <CardDescription>Tareas frecuentes del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Users className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Nuevo Miembro</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Calendar className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Programar Clase</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Package className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Agregar Producto</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <BarChart3 className="h-6 w-6 mb-2 text-[#D72638]" />
                      <span className="text-sm">Ver Reportes</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
