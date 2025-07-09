import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Membresias } from "@/types/membresias"

function formatFecha(fecha: string): string {
    const fechaObj = new Date(fecha)
    return format(fechaObj, "d 'de' MMMM, yyyy", { locale: es })
}

interface PlanStatusProps {
    membershipData: Membresias
    daysRemaining: number
    progressPercentage: number
}

const PlanStatus = ({ membershipData, daysRemaining, progressPercentage }: PlanStatusProps) => {
    return (
        <>
            <Card className="border-2 border-[#D72638]/20">
                <CardHeader className="bg-[#D72638]/5 border-b border-[#D72638]/10">
                    <div className="flex justify-between items-center">
                        <div>

                            <CardTitle className="text-2xl font-bold text-foreground">{membershipData.plan_membresia?.nombre}</CardTitle>
                            <CardDescription>Miembro desde {formatFecha(membershipData.fecha_inicio)}</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            {membershipData.estado ? "Activo" : "Inactivo"}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Fecha de inicio</p>
                                <p className="text-foreground font-medium">{formatFecha(membershipData.fecha_inicio)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Fecha de vencimiento</p>
                                <p className="text-foreground font-medium">{formatFecha(membershipData.fecha_fin)}</p>
                            </div>
                            {/* <div>
                                <p className="text-sm text-muted-foreground">Ciclo de facturación</p>
                                <p className="text-foreground font-medium">
                                    {membershipData.billingCycle === "anual" ? "Anual" : "Mensual"}
                                </p>
                            </div> */}
                            <div>
                                <p className="text-sm text-muted-foreground">Próximo pago</p>
                                <p className="text-foreground font-medium">{formatFecha(membershipData.fecha_fin)}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <div className="relative w-40 h-40">
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-3xl font-bold text-[#D72638]">{daysRemaining}</span>
                                    <span className="text-sm text-muted-foreground">días restantes</span>
                                </div>
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-muted stroke-current"
                                        strokeWidth="10"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="40"
                                        cx="50"
                                        cy="50"
                                    />
                                    <circle
                                        className="text-[#D72638] stroke-current"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="40"
                                        cx="50"
                                        cy="50"
                                        strokeDasharray={`${2 * Math.PI * 40}`}
                                        strokeDashoffset={`${((100 - progressPercentage) / 100) * 2 * Math.PI * 40}`}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Tu membresía vence el {formatFecha(membershipData.fecha_fin)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default PlanStatus