import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import Providers from '@/app/providers';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "M Club - Transforma tu cuerpo, transforma tu vida",
  description: "M Club ofrece instalaciones de primera clase, entrenadores expertos y una comunidad motivadora.",
  generator: 'undc'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider defaultTheme="system" storageKey="powerfit-ui-theme">
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
