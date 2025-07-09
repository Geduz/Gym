import { Dumbbell, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"
import { PlanMembresias } from '@/types/membresias'
import { Activity } from "lucide-react"
const Membership = () => {
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
    const { toast } = useToast()
    const { addToCart } = useCart()
    const [membershipPlans, setMembershipPlans] = useState<PlanMembresias[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch("/api/plan-membresias")
                const data = await response.json()
                setMembershipPlans(data)
                setIsLoading(false)
            } catch (error) {
                console.error("Error al cargar los planes de membresía", error)
                setIsLoading(false)
            }
        }

        fetchPlans()
    }, [])

    const selectPlan = (planId: number) => {
        const plan = membershipPlans.find((p) => p.plan_membresia_id === planId)
        if (plan) {
            setSelectedPlan(planId)

            // Agregar al carrito
            const added = addToCart({
                id: plan.plan_membresia_id,
                name: plan.nombre,
                price: plan.precio,
                quantity: 1,
                type: "membership",
                description: plan.descripcion?.join(", "),
            })

            if (added) {
                toast({
                    title: "¡Plan agregado al carrito!",
                    description: `Has agregado el ${plan.nombre} a tu carrito.`,
                    duration: 3000,
                })

                // Guardar el plan seleccionado en el almacenamiento local
                localStorage.setItem("selectedPlan", planId.toString())
            }
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Activity className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-muted-foreground">Cargando planes de membresía...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan) => {
                const isSelected = selectedPlan === plan.plan_membresia_id
                return (
                    <Card
                        key={plan.plan_membresia_id}
                        className={`h-full transition-all duration-300 hover:shadow-xl flex flex-col ${isSelected
                            ? "border-[#D72638] shadow-lg bg-gradient-to-b from-[#D72638] to-[#B91E2F] text-white"
                            : "hover:border-[#D72638]/30"
                            }`}
                    >
                        <CardHeader className="text-center pb-8">
                            <div className="flex items-center justify-center mb-4">
                                <Dumbbell className={`h-8 w-8 ${isSelected ? "text-white" : "text-[#D72638]"}`} />
                            </div>
                            <CardTitle className={`text-2xl font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
                                {plan.nombre}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="text-center flex-1 flex flex-col">
                            <div className="mb-8">
                                <div className="flex items-baseline justify-center">
                                    <span className={`text-4xl font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
                                        S/{plan.precio}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {plan.descripcion?.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start text-left">
                                        <Check
                                            className={`h-5 w-5 mr-3 flex-shrink-0 ${isSelected ? "text-green-300" : "text-green-600"}`}
                                        />
                                        <span className={`text-sm ${isSelected ? "text-white" : "text-foreground"}`}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <Button
                                    onClick={() => selectPlan(plan.plan_membresia_id)}
                                    className={`w-full py-3 font-semibold transition-all duration-300 ${isSelected
                                        ? "bg-white text-[#D72638] hover:bg-gray-100 hover:text-[#B91E2F]"
                                        : "bg-[#D72638] hover:bg-[#B91E2F] text-white"
                                        }`}
                                >
                                    {isSelected ? "✓ Agregado al Carrito" : "Agregar al Carrito"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default Membership
