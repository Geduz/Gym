import { Search, Bell, Settings, LogOut, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSession, signOut } from "next-auth/react"
import { UsuarioSession } from "@/types/usuario"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
    titulo: string
    descripción?: string
}

const Header: React.FC<HeaderProps> = ({ titulo, descripción }) => {
    const { data: session } = useSession()
    const { toast } = useToast()
    if (!session?.user) {
        return null
    }
    const user = session.user as UsuarioSession
    return (
        <>
            <header className="bg-card border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <SidebarTrigger className="text-foreground" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{titulo}</h1>
                            {descripción ? (
                                <p className="text-sm text-muted-foreground">{descripción}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Bienvenido, {user.nombre} {user.apellido} ({user.role})
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Buscar..." className="pl-10 w-64" />
                        </div>
                        <ThemeToggle />
                        <Button size="icon" variant="ghost">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarFallback className="bg-[#D72638] text-white">
                                        {user.nombre
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
                                <DropdownMenuItem onClick={() => {
                                    signOut({ callbackUrl: "/" })
                                    toast({
                                        title: "Sesión cerrada",
                                        description: "Has cerrado sesión correctamente",
                                        duration: 3000,
                                    })
                                }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Cerrar Sesión
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header