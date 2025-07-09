
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UsuarioSession } from "@/types/usuario"

const InfoUser = ({ user }: { user: UsuarioSession }) => {
    return (
        <>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil de Miembro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-[#D72638] text-white text-xl">
                                    {user.nombre
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{user.nombre} {user.apellido}</h3>
                            <p className="text-muted-foreground">{user.correo}</p>
                            <Badge className="mt-2">{user.role}</Badge>

                            <div className="w-full mt-4 pt-4 border-t border-border">
                                <Button variant="outline" className="w-full">
                                    Editar Perfil
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default InfoUser;