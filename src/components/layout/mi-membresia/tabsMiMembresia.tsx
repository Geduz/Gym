
import { CheckCircle2 } from "lucide-react"
// import { CreditCard, Clock, Download } from "lucide-react"
// import { addMonths, addYears } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Membresias } from "@/types/membresias"


const TabsMiMembresia = ({ membershipData }: { membershipData: Membresias }) => {
    return (
        <>
            <Tabs defaultValue="benefits" className="w-full">
                {/* <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                    <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
                    <TabsTrigger value="attendance">Asistencia</TabsTrigger>
                </TabsList> */}
                <TabsList className="grid">
                    <TabsTrigger value="benefits">Beneficios</TabsTrigger>
                </TabsList>

                <TabsContent value="benefits" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Beneficios de tu Plan</CardTitle>
                            <CardDescription>
                                Todos los beneficios incluidos en tu membresía {membershipData.plan_membresia?.nombre}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {membershipData.plan_membresia?.descripcion?.map((benefit: string, index: number) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* <TabsContent value="payments" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historial de Pagos</CardTitle>
                            <CardDescription>Registro de tus pagos recientes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {membershipData.paymentHistory.map((payment: PaymentHistory) => (
                                    <div key={payment.id} className="flex justify-between items-center p-3 border rounded-lg">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                                                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{formatDate(payment.date)}</p>
                                                <p className="text-sm text-muted-foreground">Pago {payment.status.toLowerCase()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">S/ {payment.amount}</p>
                                            <Button variant="ghost" size="sm" className="text-xs">
                                                <Download className="h-3 w-3 mr-1" /> Factura
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registro de Asistencia</CardTitle>
                            <CardDescription>Tus últimas visitas al gimnasio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {membershipData.attendance.map((visit: Attendance, index: number) => (
                                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                                                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{format(visit.date, "EEEE d 'de' MMMM", { locale: es })}</p>
                                                <p className="text-sm text-muted-foreground">Duración: {visit.duration} minutos</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent> */}
            </Tabs>
        </>
    )
}

export default TabsMiMembresia