"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Package, Dumbbell, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { CartButton } from "@/components/cart-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useSession, signOut } from "next-auth/react"
import { UsuarioSession } from "@/types/usuario"

interface NavbarProps {
  currentPage?: string
}

export function Navbar({ currentPage = "" }: NavbarProps) {
  const { toast } = useToast()
  const { data: session } = useSession()

  const user = session?.user as UsuarioSession | undefined
  const hasMembership = user?.miembro ?? false

  const handleLogout = async () => {
    await signOut({ redirect: false })
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      duration: 3000,
    })
  }

  return (
    <header className="bg-card shadow-sm border-b border-border fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-[#D72638]" />
            <span className="ml-2 text-xl font-bold text-foreground">M Club GYM</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`transition-colors ${currentPage === "inicio" ? "text-[#D72638] font-medium" : "text-foreground hover:text-[#D72638]"}`}
            >
              Inicio
            </Link>

            {!hasMembership ? (
              <Link
                href="/membresias"
                className={`transition-colors ${currentPage === "membresias" ? "text-[#D72638] font-medium" : "text-foreground hover:text-[#D72638]"}`}
              >
                Membresías
              </Link>
            ) : (
              <Link
                href="/membresias/mi-membresia"
                className={`transition-colors ${currentPage === "mi-membresia" ? "text-[#D72638] font-medium" : "text-foreground hover:text-[#D72638]"}`}
              >
                Mi Membresía
              </Link>
            )}
            <Link
              href="/productos"
              className={`transition-colors ${currentPage === "productos" ? "text-[#D72638] font-medium" : "text-foreground hover:text-[#D72638]"}`}
            >
              Productos
            </Link>
            <Link
              href="/entrenadores"
              className={`transition-colors ${currentPage === "entrenadores" ? "text-[#D72638] font-medium" : "text-foreground hover:text-[#D72638]"}`}
            >
              Entrenadores
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <CartButton />

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-[#D72638] text-white">
                          {user?.nombre
                            ? user.nombre.split(" ").map((n: string) => n[0]).join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-foreground">{user.nombre} {user.apellido}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {hasMembership && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/membresias/mi-membresia" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Mi Membresía
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {user.role === "Administrador" && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="flex items-center">
                            <Package className="mr-2 h-4 w-4" />
                            Dashboard Admin
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/register">
                  <Button variant="ghost" className="text-foreground hover:text-[#D72638]">
                    Registrarse
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
