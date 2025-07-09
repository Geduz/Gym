"use client"

import { useEffect, useState, useMemo } from "react"
import { Download, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { UsuarioSession } from "@/types/usuario"
import { AppSidebar } from "@/components/layout/dashboard/sidebar"
import Header from "@/components/layout/dashboard/header"
import CardReportes from "@/components/layout/dashboard/reportes/cardReportes"
import GridReportes from "@/components/layout/dashboard/reportes/gridReportes"
import { useVentas } from "@/hooks/useVentas"
import { useUsuarios } from "@/hooks/useUsuarios"
import DateRangePicker from "@/components/layout/dashboard/reportes/dateRangePicker"
import { format, subDays, isWithinInterval } from "date-fns"
import { es } from "date-fns/locale"
import { DateRange } from "react-day-picker"

export default function ReportsPage() {
  // Estado para el rango de fechas - valor inicial últimos 30 días
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const { detalleVentas } = useVentas()
  const { usuarios } = useUsuarios()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  // Función para filtrar los datos por rango de fechas
  const filteredData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) {
      return {
        detalleVentas,
        usuarios
      }
    }

    // Filtrar detalleVentas por fecha
    const filteredDetalleVentas = detalleVentas.filter(venta => {
      // Asumiendo que tienes un campo de fecha en tu objeto venta
      // Ajusta el nombre del campo según tu estructura de datos
      console.log(venta?.venta?.fecha_venta)
      const ventaDate = new Date(venta?.venta?.fecha_venta) // o venta.createdAt, venta.fechaVenta, etc.

      return isWithinInterval(ventaDate, {
        start: dateRange.from!,
        end: dateRange.to!
      })
    })

    // Filtrar usuarios por fecha (si aplica)
    // Solo si necesitas filtrar usuarios por fecha de registro o similar
    const filteredUsuarios = usuarios.filter(usuario => {
      // Asumiendo que tienes un campo de fecha en tu objeto usuario
      // Si no necesitas filtrar usuarios por fecha, simplemente retorna usuarios
      if (!usuario.fecha_registro) return true // Si no tiene fecha, incluirlo

      const usuarioDate = new Date(usuario.fecha_registro)

      return isWithinInterval(usuarioDate, {
        start: dateRange.from!,
        end: dateRange.to!
      })
    })

    return {
      detalleVentas: filteredDetalleVentas,
      usuarios: filteredUsuarios
    }
  }, [detalleVentas, usuarios, dateRange])

  // Función para manejar el cambio de fecha desde el DateRangePicker
  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange) {
      setDateRange(newDateRange)
      console.log("Nuevo rango de fechas:", newDateRange)
    }
  }

  // Función para formatear el rango de fechas seleccionado
  const formatSelectedDateRange = (): string => {
    if (!dateRange.from) return "Sin fechas seleccionadas"

    if (!dateRange.to) {
      return format(dateRange.from, "dd MMM yyyy", { locale: es })
    }

    if (format(dateRange.from, "yyyy-MM-dd") === format(dateRange.to, "yyyy-MM-dd")) {
      return format(dateRange.from, "dd MMM yyyy", { locale: es })
    }

    return `${format(dateRange.from, "dd MMM", { locale: es })} - ${format(dateRange.to, "dd MMM yyyy", { locale: es })}`
  }

  // Función para exportar datos filtrados
  const handleExport = () => {
    console.log("Exportando datos para el rango:", dateRange)
    console.log("Datos filtrados:", filteredData)
    // Aquí implementarías la lógica de exportación con los datos ya filtrados
    // Por ejemplo: exportToCSV(filteredData.detalleVentas)
  }

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
        <AppSidebar user={user} />
        <SidebarInset className="flex-1">
          <Header titulo="Reportes" descripción="Análisis y estadísticas del gimnasio" />

          {/* Main Content */}
          <main className="p-6">
            {/* Header con controles */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground"></p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-4">
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    placeholder="Seleccionar periodo"
                    className="w-[280px]"
                  />

                  <Button
                    className="bg-[#D72638] hover:bg-[#B91E2F]"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Mostrando datos para: {formatSelectedDateRange()}</span>
              </div>
            </div>

            <CardReportes
              detalleVentas={filteredData.detalleVentas}
              usuarios={filteredData.usuarios}
            />

            <GridReportes
              detalleVentas={filteredData.detalleVentas}
            />

          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}