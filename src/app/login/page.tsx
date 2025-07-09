"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Dumbbell, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { signIn } from "next-auth/react";
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (res?.ok) {
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión correctamente.`,
        duration: 3000,
      });

      // Puedes redirigir según el rol si quieres, usando session.user.role
      router.push("/"); // O tu ruta destino
    } else {
      toast({
        title: "Error de autenticación",
        description: res?.error || "Email o contraseña incorrectos. Verifica tus credenciales.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Card principal de login */}
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="space-y-1 text-center">
              <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Iniciar Sesión</CardTitle>
              <CardDescription className="text-muted-foreground">Accede a tu cuenta PowerFit</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Campo Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Campo Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {/* Recordarme y Olvidé contraseña */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-muted-foreground">
                      Recordarme
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-[#D72638] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón de login */}
                <Button type="submit" className="w-full bg-[#D72638] hover:bg-[#B91E2F] text-white" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>

            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-[#D72638] hover:underline font-medium">
                Regístrate aquí
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              Al iniciar sesión, aceptas nuestros{" "}
              <Link href="/terms" className="text-[#D72638] hover:underline">
                Términos de Servicio
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="text-[#D72638] hover:underline">
                Política de Privacidad
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  )
}
