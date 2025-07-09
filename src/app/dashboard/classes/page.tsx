"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/layout/dashboard/sidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const classes = [
  {
    id: 1,
    name: "Crossfit Matutino",
    instructor: "Roberto Silva",
    time: "07:00 - 08:00",
    date: "2024-12-10",
    capacity: 15,
    enrolled: 12,
    room: "Sala A",
    type: "Crossfit",
    status: "Programada",
  },
  {
    id: 2,
    name: "Yoga Relajante",
    instructor: "Carmen Vega",
    time: "18:00 - 19:00",
    date: "2024-12-10",
    capacity: 20,
    enrolled: 18,
    room: "Sala B",
    type: "Yoga",
    status: "Programada",
  },
  {
    id: 3,
    name: "Musculación Avanzada",
    instructor: "Miguel Torres",
    time: "19:00 - 20:00",
    date: "2024-12-10",
    capacity: 10,
    enrolled: 10,
    room: "Sala de Pesas",
    type: "Musculación",
    status: "Completa",
  },
]

interface User {
  email: string
  name: string
  role: string
}

export default function ClassesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simular usuario para demo
    const userData = {
      name: "Admin Usuario",
      email: "admin@mclub.com",
      role: "Administrador",
    }
    setUser(userData)
  }, [])

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      duration: 3000,
    })
  }

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="h-8 w-8 bg-white rounded-full" />
          </div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* <AppSidebar user={user} /> */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-foreground" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Clases</h1>
                  <p className="text-sm text-muted-foreground">Gestiona las clases y horarios del gimnasio</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Buscar..." className="pl-10 w-64" />
                </div>
                <Button size="icon" variant="ghost">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-[#D72638] text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Clases</h1>
                <p className="text-muted-foreground">Gestiona las clases y horarios del gimnasio</p>
              </div>
              <Button className="bg-[#D72638] hover:bg-[#B91E2F]">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Clase
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-[#D72638]">{classes.length}</div>
                      <p className="text-sm text-muted-foreground">Clases Programadas</p>
                    </div>
                    <Calendar className="h-8 w-8 text-[#D72638]" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {classes.reduce((sum, cls) => sum + cls.enrolled, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Inscripciones</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {classes.reduce((sum, cls) => sum + cls.capacity, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Capacidad Total</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(
                          (classes.reduce((sum, cls) => sum + cls.enrolled, 0) /
                            classes.reduce((sum, cls) => sum + cls.capacity, 0)) *
                          100,
                        )}
                        %
                      </div>
                      <p className="text-sm text-muted-foreground">Ocupación</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Clases Programadas</CardTitle>
                    <CardDescription>{filteredClasses.length} clases encontradas</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar clases..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClasses.map((cls) => (
                    <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{cls.name}</h3>
                            <p className="text-sm text-muted-foreground">{cls.type}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Cancelar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback className="text-xs bg-[#D72638] text-white">
                                {cls.instructor
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{cls.instructor}</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{cls.date}</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{cls.time}</span>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{cls.room}</span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-1" />
                              <span>
                                {cls.enrolled}/{cls.capacity}
                              </span>
                            </div>
                            <Badge
                              variant={
                                cls.status === "Programada"
                                  ? "default"
                                  : cls.status === "Completa"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={
                                cls.status === "Programada"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : cls.status === "Completa"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                    : ""
                              }
                            >
                              {cls.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
