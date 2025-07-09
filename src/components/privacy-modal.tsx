"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface PrivacyModalProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
}

export function PrivacyModal({ open, onOpenChangeAction }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D72638]">Política de Privacidad</DialogTitle>
          <DialogDescription>Última actualización: {new Date().toLocaleDateString("es-ES")}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Información que Recopilamos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                M Club GYM recopila la siguiente información personal:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Información de contacto (nombre, email, teléfono, dirección)</li>
                <li>• Información de pago y facturación</li>
                <li>• Datos de salud y fitness (con su consentimiento)</li>
                <li>• Información de uso de nuestros servicios y sitio web</li>
                <li>• Fotografías y videos (para fines de seguridad y marketing, con consentimiento)</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Cómo Utilizamos su Información</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Utilizamos su información personal para:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Proporcionar y mejorar nuestros servicios</li>
                <li>• Procesar pagos y gestionar membresías</li>
                <li>• Comunicarnos con usted sobre servicios y promociones</li>
                <li>• Personalizar su experiencia en M Club GYM</li>
                <li>• Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Compartir Información</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                M Club Gym no vende, alquila o comparte su información personal con terceros, excepto en los siguientes
                casos:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>• Cuando sea requerido por ley o autoridades competentes</li>
                <li>• Para proteger nuestros derechos, propiedad o seguridad</li>
                <li>• Con su consentimiento explícito</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Seguridad de Datos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información
                personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye cifrado SSL,
                firewalls, acceso restringido y auditorías regulares de seguridad.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Retención de Datos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conservamos su información personal durante el tiempo necesario para cumplir con los propósitos
                descritos en esta política, a menos que la ley requiera o permita un período de retención más largo. Los
                datos de membresías se conservan durante 7 años después de la cancelación para fines contables y
                legales.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Sus Derechos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Usted tiene los siguientes derechos respecto a su información personal:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Acceder a su información personal</li>
                <li>• Corregir información inexacta o incompleta</li>
                <li>• Solicitar la eliminación de su información</li>
                <li>• Oponerse al procesamiento de sus datos</li>
                <li>• Solicitar la portabilidad de sus datos</li>
                <li>• Retirar su consentimiento en cualquier momento</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Cookies y Tecnologías Similares</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, analizar el
                tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque esto
                puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Menores de Edad</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nuestros servicios están dirigidos a personas mayores de 16 años. No recopilamos intencionalmente
                información personal de menores de 18 años sin el consentimiento de los padres o tutores legales.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Cambios a esta Política</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios
                significativos por email o mediante un aviso prominente en nuestro sitio web.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Contacto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                <li>• Teléfono: +51 996239668</li>
                <li>• Dirección: Av. Libertadores, San Vicente de Cañete</li>
                <li>• Horario de atención: Lunes a Viernes, 6:00 AM - 11:00 PM y Sábados 6:00 AM - 6:00 PM</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
