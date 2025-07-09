import { Dumbbell, Crown, Star } from "lucide-react"

const BenefitSection = () => {
    return (
        <>
            <div className="mt-16">
                <h3 className="text-2xl font-bold text-center text-foreground mb-8">
                    Beneficios Incluidos en Todos los Planes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Dumbbell className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">Equipamiento Moderno</h4>
                        <p className="text-sm text-muted-foreground">
                            Acceso a equipos de última generación para todos tus entrenamientos
                        </p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Crown className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">Sin Permanencia</h4>
                        <p className="text-sm text-muted-foreground">Cancela cuando quieras, sin penalizaciones ni compromisos</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-[#D72638] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">Comunidad Activa</h4>
                        <p className="text-sm text-muted-foreground">
                            Únete a una comunidad motivadora de personas con objetivos similares
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BenefitSection;