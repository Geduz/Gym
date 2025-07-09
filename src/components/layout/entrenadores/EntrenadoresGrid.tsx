import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Entrenadores } from '@/types/entrenadores'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EntrenadoresGridProps {
    filteredTrainers: Entrenadores[]
    handleAddTrainer: (trainer: Entrenadores) => void
}

const EntrenadoresGrid = ({ filteredTrainers, handleAddTrainer }: EntrenadoresGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {filteredTrainers.map((trainer) => (
                <Card key={trainer.entrenador_id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                        <div className="relative mx-auto mb-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={trainer.imagen || "/placeholder.svg"} />
                                <AvatarFallback className="bg-[#D72638] text-white">
                                    {trainer.nombre
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-foreground">{trainer.nombre} {trainer.apellido}</CardTitle>
                        <CardDescription className="font-medium text-[#D72638]">
                            {trainer.especialidad.join(", ")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-center">
                                <span className="text-sm text-muted-foreground">Experiencia: </span>
                                <span className="font-medium">
                                    {trainer.experiencia === 1 ? `${trainer.experiencia} año` : `${trainer.experiencia} años`}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground text-center">{trainer.descripcion}</p>
                        </div>

                        <div className="text-center">
                            <span className="text-lg font-bold text-[#D72638]">{trainer.precio} PEN/mes</span>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                onClick={() => handleAddTrainer(trainer)}
                                className="bg-[#D72638] hover:bg-[#B91E2F] text-white w-full"
                            >
                                Agregar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default EntrenadoresGrid
