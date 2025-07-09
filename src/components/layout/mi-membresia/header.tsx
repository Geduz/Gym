import { Ban, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const HeaderMiMembresia = () => {
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const handleCancelMembership = () => {
        localStorage.removeItem("powerfit_membership")

        toast({
            title: "Membresía cancelada",
            description: "Tu membresía ha sido cancelada exitosamente",
            duration: 3000,
        })

        setTimeout(() => {
            router.push("/")
        }, 2000)
    }


    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Mi Membresía</h1>
                    <p className="text-muted-foreground">Gestiona tu plan y revisa el estado de tu membresía</p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => setShowCancelDialog(true)}
                    >
                        <Ban className="mr-2 h-4 w-4" />
                        Cancelar Membresía
                    </Button>
                </div>
            </div>

            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center text-red-500">
                            <AlertTriangle className="h-5 w-5 mr-2" /> Cancelar Membresía
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas cancelar tu membresía? Perderás todos los beneficios asociados a tu plan
                            actual y no se realizarán reembolsos por el tiempo restante.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelMembership} className="bg-red-500 hover:bg-red-600 text-white">
                            Sí, cancelar mi membresía
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default HeaderMiMembresia;