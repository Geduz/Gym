"use client"

import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
// import {
//     Activity,
//     BarChart3,
//     Calendar,
//     LogOut,
//     Package,
//     Settings,
//     TrendingUp,
//     UserCheck,
//     Users,
//     Globe
// } from "lucide-react"
import {
    Activity,
    BarChart3,
    LogOut,
    Package,
    Settings,
    UserCheck,
    TrendingUp,
    Globe
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UsuarioSession } from "@/types/usuario"

const menuItems = [
    {
        title: "Sitio Web",
        icon: Globe,
        url: "/",
    },
    {
        title: "Dashboard",
        icon: BarChart3,
        url: "/dashboard"
    },
    // {
    //     title: "Miembros",
    //     icon: Users,
    //     url: "/dashboard/members",
    // },
    {
        title: "Entrenadores",
        icon: UserCheck,
        url: "/dashboard/trainers",
    },
    {
        title: "Productos",
        icon: Package,
        url: "/dashboard/productos",
    },
    {
        title: "Reportes",
        icon: TrendingUp,
        url: "/dashboard/reports",
    },
]

export function AppSidebar({ user }: { user: UsuarioSession }) {
    const pathname = usePathname()
    const { toast } = useToast()
    return (
        <Sidebar className="border-r border-border">
            <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#D72638] rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">MClub</h2>
                        <p className="text-sm text-muted-foreground">Admin Panel</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="p-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-foreground font-medium mb-2">Menú Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="data-[active=true]:bg-[#D72638] data-[active=true]:text-white hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <a href={item.url} className="flex items-center space-x-3">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-border p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg" />
                                        <AvatarFallback className="bg-[#D72638] text-white">
                                            {user.nombre
                                                ? user.nombre.split(" ").map((n) => n[0]).join("")
                                                : "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium">{user.nombre} {user.apellido}</span>
                                        <span className="text-xs text-muted-foreground">{user.correo}</span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-56">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configuración
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    signOut({ callbackUrl: "/" })
                                    toast({
                                        title: "Sesión cerrada",
                                        description: "Has cerrado sesión correctamente",
                                        duration: 3000,
                                    })
                                }}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Cerrar Sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
