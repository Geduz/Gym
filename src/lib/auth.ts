// lib/auth.ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son obligatorios")
                }

                const userFound = await prisma.usuario.findUnique({
                    where: { correo: credentials.email },
                    include: { rol: true }
                })

                if (!userFound) {
                    throw new Error("Usuario no encontrado")
                }

                if (!userFound.estado) {
                    throw new Error("Cuenta inactiva. Contacta con el administrador.")
                }

                const matchPassword = await bcrypt.compare(credentials.password, userFound.contrasena)
                if (!matchPassword) {
                    throw new Error("Contraseña incorrecta")
                }

                return {
                    id: userFound.usuario_id.toString(),
                    usuario_id: userFound.usuario_id,
                    nombre: userFound.nombre,
                    apellido: userFound.apellido,
                    correo: userFound.correo,
                    telefono: userFound.telefono,
                    direccion: userFound.direccion,
                    ciudad: userFound.ciudad,
                    codigo_postal: userFound.codigo_postal,
                    rol_id: userFound.rol_id,
                    role: userFound.rol.nombre,
                    miembro: userFound.miembro ?? false
                }
            }

        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.usuario_id = token.usuario_id
                session.user.nombre = token.nombre
                session.user.apellido = token.apellido
                session.user.correo = token.correo
                session.user.telefono = token.telefono
                session.user.direccion = token.direccion
                session.user.ciudad = token.ciudad
                session.user.codigo_postal = token.codigo_postal
                session.user.rol_id = token.rol_id
                session.user.role = token.role
                session.user.miembro = token.miembro
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.usuario_id
                token.usuario_id = user.usuario_id
                token.nombre = user.nombre
                token.apellido = user.apellido
                token.correo = user.correo
                token.telefono = user.telefono
                token.direccion = user.direccion
                token.ciudad = user.ciudad
                token.codigo_postal = user.codigo_postal
                token.rol_id = user.rol_id
                token.role = user.role
                token.miembro = user.miembro
            }
            return token
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    }
}
