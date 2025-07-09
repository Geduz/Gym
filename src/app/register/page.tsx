"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Dumbbell, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/navbar"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmContrasena: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.contrasena || !formData.confirmContrasena) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return false
    }

    if (formData.contrasena !== formData.confirmContrasena) {
      toast({
        title: "Contraseñas no coinciden",
        description: "Las contraseñas ingresadas no son iguales",
        variant: "destructive",
      })
      return false
    }

    if (formData.contrasena.length < 6) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      })
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          contrasena: formData.contrasena
        })
      })

      const data = await res.json()

      if (!res.ok) {
        toast({
          title: "Error en el registro",
          description: data.message || "Algo salió mal",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      // Iniciar sesión automáticamente después del registro
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.correo,
        password: formData.contrasena,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast({
        title: "¡Registro exitoso!",
        description: `Bienvenido ${data.user.nombre}, tu cuenta ha sido creada.`,
        duration: 3000
      })

      localStorage.setItem("powerfit_user", JSON.stringify(data.user))

      const redirectUrl = localStorage.getItem("powerfit_redirect_after_auth")
      // if (redirectUrl) {
      //   localStorage.removeItem("powerfit_redirect_after_auth")
      //   setTimeout(() => router.push(redirectUrl), 1000)
      // } else {
      //   setTimeout(() => router.push("/dashboard"), 1000)
      // }
      if (redirectUrl) {
        localStorage.removeItem("powerfit_redirect_after_auth")
        setTimeout(() => router.push(redirectUrl), 1000)
      } else {
        setTimeout(() => router.push("/"), 1000)
      }

    } catch (error) {
      console.error(error)
      toast({
        title: "Error inesperado",
        description: "No se pudo registrar. Intenta más tarde.",
        variant: "destructive"
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl space-y-6">
          {/* Card principal de registro */}
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Crear Cuenta</CardTitle>
              <CardDescription className="text-muted-foreground">
                Únete a la comunidad PowerFit y comienza tu transformación
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Información personal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      Nombre *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange("nombre", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Apellido *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Tu apellido"
                        value={formData.apellido}
                        onChange={(e) => handleInputChange("apellido", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">
                      Contraseña *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.contrasena}
                        onChange={(e) => handleInputChange("contrasena", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirmar Contraseña *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmContrasena}
                        onChange={(e) => handleInputChange("confirmContrasena", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botón de registro */}
                <Button type="submit" className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white" disabled={isLoading}>
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-[#D72638] hover:underline font-medium">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
