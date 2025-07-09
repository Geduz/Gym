"use client"

import { useEffect } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/dashboard/sidebar"
import { Toaster } from "@/components/ui/toaster"
import AddProductDialog from '@/components/layout/dashboard/productos/addProductDialog'
import { UsuarioSession } from "@/types/usuario"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Header from "@/components/layout/dashboard/header"
import CardProductos from "@/components/layout/dashboard/productos/cardProductos"
import TablaProductos from "@/components/layout/dashboard/productos/tablaProductos"

const ProductsPage = () => {
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
            <div className="h-8 w-8 bg-white rounded-full" />
          </div>
          <p className="text-muted-foreground">Cargando...</p>
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
        <SidebarInset className="flex-1">

          {/* Header */}
          <Header titulo="Productos" descripción="Gestiona el inventario y productos del gimnasio" />

          {/* Main Content */}
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground"></h1>
              </div>
              <AddProductDialog />
            </div>

            <CardProductos />

            <TablaProductos />

          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

export default ProductsPage