import { useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Entrenadores } from "@/types/entrenadores";
import { useEntrenadores } from '@/hooks/useEntrenadores'

export interface DeleteTrainerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trainer: Entrenadores;
    onDelete: (deletedTrainerId: number) => void;
}

const DeleteTrainerDialog = ({ open, onOpenChange, trainer, onDelete }: DeleteTrainerDialogProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const { deleteEntrenador } = useEntrenadores()

    const handleDeleteTrainer = async (trainerId: number) => {
        if (isNaN(trainerId)) {
            return
        }
        setIsLoading(true)
        try {
            const result = await deleteEntrenador(trainerId)

            if (result.success) {
                onDelete(trainerId)
                onOpenChange(false)
                window.location.reload()
            } else {
                console.error(result.message)
            }
        } catch (error) {
            console.error("Error al eliminar el entrenador", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            Eliminar entrenador
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar al entrenador <strong>{trainer.nombre}</strong>? Esta acción no se puede
                            deshacer y se eliminará permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
                        <Button variant="destructive" onClick={() => trainer.entrenador_id && handleDeleteTrainer(trainer.entrenador_id)} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Eliminando...
                                </>
                            ) : (
                                "Eliminar"
                            )}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteTrainerDialog;
