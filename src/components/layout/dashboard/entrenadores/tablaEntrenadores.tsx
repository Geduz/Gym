import { useState } from "react"
import { Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Entrenadores } from "@/types/entrenadores"
import DeleteTrainerDialog from "@/components/layout/dashboard/entrenadores/eliminarEntrenador"
import { useEntrenadores } from "@/hooks/useEntrenadores"

interface TablaEntrenadoresProps {
    trainers: Entrenadores[]
}

const TablaEntrenadores = ({ trainers }: TablaEntrenadoresProps) => {
    const { fetchEntrenadores } = useEntrenadores()
    const [searchTerm, setSearchTerm] = useState("")
    const [deleteEntrenadores, setDeleteEntrenadores] = useState<Entrenadores | null>(null)

    const handleDeleteProduct = () => {
        fetchEntrenadores()
    }

    const filteredTrainers = trainers.filter(
        (trainer) =>
            trainer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainer.especialidad.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
    )


    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Equipo de Entrenadores</CardTitle>
                            <CardDescription>{filteredTrainers.length} entrenadores encontrados</CardDescription>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar entrenadores..."
                                className="pl-10 w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTrainers.map((trainer) => (
                            <Card key={trainer.entrenador_id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={trainer.imagen || "/placeholder.svg"} />
                                                <AvatarFallback className="bg-[#D72638] text-white">
                                                    {trainer.nombre
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold">{trainer.nombre}</h3>
                                                <p className="text-sm text-muted-foreground">{trainer.correo}</p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => setDeleteEntrenadores(trainer)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Estado:</span>
                                            <Badge
                                                variant={trainer.estado_entrenador_id === 1 ? "default" : "secondary"}
                                                className={
                                                    trainer.estado_entrenador_id === 1
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                                        : trainer.estado_entrenador_id === 3
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                                }
                                            >
                                                {trainer.estado_entrenador_id === 1
                                                    ? "Activo"
                                                    : trainer.estado_entrenador_id === 3
                                                        ? "Vacaciones"
                                                        : "Inactivo"}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">Experiencia:</span>
                                            <span className="text-sm font-medium">
                                                {trainer.experiencia} {trainer.experiencia === 1 ? "año" : "años"}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="text-sm text-muted-foreground">Especialidades:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {trainer.especialidad.map((specialty, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {specialty}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {deleteEntrenadores && (
                <DeleteTrainerDialog
                    open={!!deleteEntrenadores}
                    onOpenChange={(open) => !open && setDeleteEntrenadores(null)}
                    trainer={deleteEntrenadores}
                    onDelete={handleDeleteProduct}
                />
            )}
        </>
    )
}

export default TablaEntrenadores
