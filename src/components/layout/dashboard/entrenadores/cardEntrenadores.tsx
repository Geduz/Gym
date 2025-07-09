import { Card, CardContent } from "@/components/ui/card"
import { Entrenadores } from "@/types/entrenadores"

interface CardEntrenadoresProps {
    trainers: Entrenadores[];
}

const CardEntrenadores = ({ trainers }: CardEntrenadoresProps) => {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{trainers.length}</div>
                            <p className="text-sm text-muted-foreground">Total Entrenadores</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {trainers.filter((t) => t.estado_entrenador_id === 1).length}
                            </div>
                            <p className="text-sm text-muted-foreground">Activos</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {trainers.filter((t) => t.estado_entrenador_id === 3).length}
                            </div>
                            <p className="text-sm text-muted-foreground">Vacaciones</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#D72638]">
                                {trainers.filter((t) => t.estado_entrenador_id === 2).length}
                            </div>
                            <p className="text-sm text-muted-foreground">Entrenadores inactivos</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default CardEntrenadores;