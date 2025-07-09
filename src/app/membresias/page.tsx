"use client"
import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import BenefitSection from "@/components/layout/membresias/BenefitsSection"
import Membership from "@/components/layout/membresias/Membership"
import { Activity } from "lucide-react"

export default function MembresiasPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  if (isLoading) {
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

  return (
    <div className="mt-16 min-h-screen bg-background">

      <Navbar currentPage="membresias" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Nuestras Membresías</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades y objetivos
          </p>
        </div>

        <Membership />

        <BenefitSection />
      </main>

      <Toaster />
    </div>
  )
}
