"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface TermsModalProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export function TermsModal({ open, onOpenChangeAction }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D72638]">Términos y Condiciones</DialogTitle>
          <DialogDescription>Última actualización: {new Date().toLocaleDateString("es-ES")}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Aceptación de los Términos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Al acceder y utilizar los servicios de M Club GYM, usted acepta estar sujeto a estos términos y
                condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros
                servicios.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Servicios Ofrecidos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                M Club GYM ofrece los siguientes servicios:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Membresías de gimnasio y acceso a instalaciones</li>
                <li>• Entrenamiento personalizado con profesionales certificados</li>
                <li>• Venta de productos de fitness y suplementos</li>
                <li>• Clases grupales y programas especializados</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Membresías y Pagos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Las membresías de PowerFit están sujetas a las siguientes condiciones:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Los pagos deben realizarse según el plan seleccionado</li>
                <li>• Las membresías son intransferibles</li>
                <li>• La cancelación debe solicitarse con 30 días de anticipación</li>
                <li>• No se realizan reembolsos por servicios no utilizados</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Uso de las Instalaciones</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Al utilizar nuestras instalaciones, usted se compromete a:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Seguir todas las reglas y regulaciones del gimnasio</li>
                <li>• Respetar a otros miembros y al personal</li>
                <li>• Utilizar el equipo de manera apropiada y segura</li>
                <li>• Mantener la limpieza e higiene personal</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Responsabilidad y Riesgos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El ejercicio físico conlleva riesgos inherentes. PowerFit no se hace responsable por lesiones que puedan
                ocurrir durante el uso de nuestras instalaciones o servicios. Se recomienda consultar con un médico
                antes de comenzar cualquier programa de ejercicios.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Privacidad de Datos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PowerFit se compromete a proteger su información personal de acuerdo con nuestra Política de Privacidad.
                Sus datos serán utilizados únicamente para brindar nuestros servicios y mejorar su experiencia.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Modificaciones</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                PowerFit se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las
                modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Contacto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                <li>• Email: legal@powerfit.com</li>
                <li>• Teléfono: +51 1 234-5678</li>
                <li>• Dirección: Av. Principal 123, Lima, Perú</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
