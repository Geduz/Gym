"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Contexto para el estado del sidebar
type SidebarContextType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

// Hook para usar el contexto del sidebar
export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Componente SidebarProvider
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isMobile, setIsMobile] = React.useState(false)

  // Detectar si es móvil
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return <SidebarContext.Provider value={{ isOpen, setIsOpen, isMobile }}>{children}</SidebarContext.Provider>
}

// Componente Sidebar
export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, isMobile } = useSidebar()

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out",
          isMobile && !isOpen && "-translate-x-full",
          !isMobile && !isOpen && "-translate-x-48",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Sidebar.displayName = "Sidebar"

// Componente SidebarTrigger
export const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, ...props }, ref) => {
    const { setIsOpen } = useSidebar()

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn("h-9 w-9", className)}
        {...props}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  },
)
SidebarTrigger.displayName = "SidebarTrigger"

// Componente SidebarContent
export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex-1 overflow-auto p-4", className)} {...props} />,
)
SidebarContent.displayName = "SidebarContent"

// Componente SidebarHeader
export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-4", className)} {...props} />,
)
SidebarHeader.displayName = "SidebarHeader"

// Componente SidebarFooter
export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-auto p-4", className)} {...props} />,
)
SidebarFooter.displayName = "SidebarFooter"

// Componente SidebarGroup
export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-2", className)} {...props} />,
)
SidebarGroup.displayName = "SidebarGroup"

// Componente SidebarGroupLabel
export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs font-medium text-muted-foreground", className)} {...props} />
  ),
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

// Componente SidebarGroupContent
export const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarGroupContent.displayName = "SidebarGroupContent"

// Componente SidebarMenu
export const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("space-y-1", className)} {...props} />,
)
SidebarMenu.displayName = "SidebarMenu"

// Componente SidebarMenuItem
export const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />,
)
SidebarMenuItem.displayName = "SidebarMenuItem"

// Variantes para el botón del menú
const sidebarMenuButtonVariants = cva(
  "flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "transparent",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

// Props para SidebarMenuButton
interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

// Componente SidebarMenuButton
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(sidebarMenuButtonVariants({ isActive, className }))}
        {...props}
        data-active={isActive}
      />
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

// Componente SidebarInset
export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ml-64 transition-all duration-300 ease-in-out", className)} {...props} />
  ),
)
SidebarInset.displayName = "SidebarInset"

// Componente SidebarOverlay
export const SidebarOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isOpen: boolean }
>(({ className, isOpen, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-10 bg-black/50 transition-opacity duration-300 ease-in-out",
      isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      className,
    )}
    {...props}
  />
))
SidebarOverlay.displayName = "SidebarOverlay"
