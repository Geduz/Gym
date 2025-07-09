import { categoriasType, EstadoEntrenadoresType, EstadoPagoType, MetodoPagoType, RoleType } from "@prisma/client"
import bcrypt from "bcryptjs"

interface SeedRoles {
    nombre: RoleType
}

interface SeedMetodoPago {
    nombre: MetodoPagoType
}

interface SeedEstadoPago {
    nombre: EstadoPagoType
}

interface SeedCategorias {
    nombre: categoriasType
}

interface SeedEstadoEntrenadores {
    nombre: EstadoEntrenadoresType
}

interface SeedUsuarios {
    nombre: string
    apellido: string
    dni?: string
    telefono?: number
    fecha_nacimiento?: string
    correo: string
    contrasena: string
    rol_id: number
    fecha_registro: string
    estado: boolean
    miembro?: boolean
    entrenador_id?: number
}

interface SeedEntrenadores {
    nombre: string
    apellido: string
    descripcion: string
    correo: string
    experiencia: number
    especialidad: string[]
    precio: number
    estado_entrenador_id: number
    imagen?: string
    creado_en: string
    actualizado_en: string
}

interface SeedPlanMembresias {
    nombre: string
    precio: number
    descripcion?: string[]
}

interface SeedMembresias {
    usuario_id: number
    fecha_inicio: Date
    fecha_fin: Date
    duracion: number
    estado: boolean
    plan_membresia_id: number
}

interface SeedProductos {
    descripcion: string
    nombre: string
    precio: number
    categoriaId: number
    stock: number
    estado: boolean
    imagen: string
}

interface SeedVentas {
    fecha_venta: Date
    total: number
    usuario_id: number
}

interface SeedDetallesVentas {
    venta_id: number
    producto_id?: number | null
    plan_membresia_id?: number | null
    cantidad: number
    precio_unitario: number
    subtotal: number
    telefono: string
    direccion?: string | null
    ciudad?: string | null
    codigo_postal?: string | null
    metodo_pago_id: number
    estado_pago_id: number
}

interface SeedAsistencia {
    usuario_id: number
    fecha: Date
    hora_entrada: Date
    hora_salida: Date
}

interface SeedData {
    roles: SeedRoles[]
    metodoPago: SeedMetodoPago[]
    estadoPago: SeedEstadoPago[]
    categoria: SeedCategorias[]
    planMembresias: SeedPlanMembresias[]
    estadoEntrenadores: SeedEstadoEntrenadores[]
    usuarios: SeedUsuarios[]
    entrenadores: SeedEntrenadores[]
    membresias: SeedMembresias[]
    productos: SeedProductos[]
    ventas: SeedVentas[]
    detallesVentas: SeedDetallesVentas[]
    asistencia: SeedAsistencia[]
}

export const initialData: SeedData = {
    roles: [
        {
            nombre: RoleType.Administrador
        },
        {
            nombre: RoleType.Cliente
        },
        {
            nombre: RoleType.Entrenador
        },
        {
            nombre: RoleType.Recepcionista
        }
    ],
    metodoPago: [
        {
            nombre: MetodoPagoType.Tarjeta_de_credito_debito
        },
        {
            nombre: MetodoPagoType.Paypal
        },
        {
            nombre: MetodoPagoType.Contra_Entrega
        }
    ],
    estadoPago: [
        {
            nombre: EstadoPagoType.Pendiente
        },
        {
            nombre: EstadoPagoType.Pagado
        },
        {
            nombre: EstadoPagoType.Cancelado
        }
    ],
    planMembresias: [
        {
            nombre: "Plan Básico",
            precio: 80,
            descripcion: ["Acceso a sala de pesas", "Horario limitado (8am - 4pm)", "Evaluación física inicial"]
        },
        {
            nombre: "Plan Estándar",
            precio: 210,
            descripcion: [
                "Acceso completo 24/7",
                "Clases grupales incluidas",
                "1 sesión con entrenador personal",
                "Acceso a duchas y lockers",
            ]
        },
        {
            nombre: "Plan Premium",
            precio: 750,
            descripcion: [
                "Todo lo del plan estándar",
                "4 sesiones con entrenador personal",
                "Plan nutricional personalizado",
                "Acceso a área VIP y spa",
                "10% descuento en productos",
            ]
        }
    ],
    estadoEntrenadores: [
        {
            nombre: EstadoEntrenadoresType.Activo
        },
        {
            nombre: EstadoEntrenadoresType.Inactivo
        },
        {
            nombre: EstadoEntrenadoresType.Vacaciones
        }
    ],
    usuarios: [
        {
            nombre: 'Piero Daniel',
            apellido: 'Llanos Sánchez',
            correo: 'piero@gmail.com',
            contrasena: bcrypt.hashSync('12345678'),
            rol_id: 1,
            fecha_registro: new Date().toISOString(),
            estado: true,
            miembro: true,
            entrenador_id: 1
        },
        {
            nombre: 'Victor',
            apellido: 'Sotomayor',
            correo: 'victor@gmail.com',
            contrasena: bcrypt.hashSync('12345678'),
            rol_id: 1,
            fecha_registro: new Date().toISOString(),
            estado: true,
            miembro: false
        },
        {
            nombre: 'Angelo',
            apellido: 'Nuñez',
            correo: 'angelo@gmail.com',
            contrasena: bcrypt.hashSync('12345678'),
            rol_id: 1,
            fecha_registro: new Date().toISOString(),
            estado: true,
            miembro: false
        },
        {
            nombre: 'Stefano',
            apellido: 'Zambrano',
            correo: 'stefano@gmail.com',
            contrasena: bcrypt.hashSync('12345678'),
            rol_id: 1,
            fecha_registro: new Date().toISOString(),
            estado: true,
            miembro: false
        }
    ],
    entrenadores: [
        {
            nombre: 'Miguel',
            apellido: 'Lazaro',
            descripcion: "Especialista en entrenamiento funcional y acondicionamiento físico.",
            correo: 'miguel@gmail.com',
            experiencia: 2,
            especialidad: ["Entrenamiento Funcional"],
            precio: 150,
            estado_entrenador_id: 1,
            creado_en: new Date().toISOString(),
            actualizado_en: new Date().toISOString(),
        },
        {
            nombre: 'Milagros',
            apellido: 'Justo',
            descripcion: "Instructora certificada en yoga y pilates para todos los niveles.",
            correo: 'milagros@gmail.com',
            experiencia: 8,
            especialidad: ["Yoga ", " Pilates"],
            precio: 120,
            estado_entrenador_id: 1,
            creado_en: new Date().toISOString(),
            actualizado_en: new Date().toISOString(),
        }
    ],
    membresias: [
        {
            usuario_id: 1,
            fecha_inicio: new Date(),
            fecha_fin: new Date(new Date().setDate(new Date().getDate() + 60)),
            duracion: 60,
            estado: true,
            plan_membresia_id: 1,

        }
    ],
    categoria: [
        {
            nombre: categoriasType.Accesorios //1
        },
        {
            nombre: categoriasType.Ropa //2 
        },
        {
            nombre: categoriasType.Suplementos //3
        }
    ],
    productos: [
        {
            descripcion: "Proteína Whey Gold Standard de Optimum Nutrition con 24g de proteína por porción, bajo en carbohidratos y de rápida absorción. Ideal para ganancia muscular y recuperación.",
            nombre: "Optimum Whey Gold Standard",
            precio: 249.9,
            categoriaId: 3,
            stock: 0,
            estado: true,
            imagen: "/images/OptimumWheyGoldStandard.jpg"
        },
        {
            descripcion: "Creatina Monohidrato Micronizada 100% pura, mejora el rendimiento físico en ejercicios de alta intensidad. Apoya la fuerza y la recuperación.",
            nombre: "Creatina Monohidrato Micronizada",
            precio: 159.9,
            categoriaId: 3,
            stock: 50,
            estado: true,
            imagen: "/images/CreatinaMonohidratoMicronizada.jpg"
        },
        {
            descripcion: "Banda elástica ideal para entrenamiento de fuerza y flexibilidad, con distintos niveles de resistencia.",
            nombre: "Banda de Resistencia",
            precio: 29.9,
            categoriaId: 1,
            stock: 50,
            estado: true,
            imagen: "/images/BandasDeResistenciaFitPack.jpg"
        },
        {
            descripcion: "Pre-entreno C4 con 150mg de cafeína, beta-alanina y creatina. Aumenta energía, enfoque y resistencia antes del entrenamiento.",
            nombre: "C4 Pre-Entreno",
            precio: 149.9,
            categoriaId: 3,
            stock: 8,
            estado: true,
            imagen: "/images/C4Pre-WorkoutExplosive.jpg"
        },
        {
            descripcion: "Camiseta deportiva Dry Fit de secado rápido, ideal para entrenamientos intensos. Tejido transpirable y ajuste cómodo.",
            nombre: "Camiseta Dry Fit",
            precio: 89.9,
            categoriaId: 2,
            stock: 60,
            estado: true,
            imagen: "/images/CamisetaDry-FitGymwear.jpg"
        },
        {
            descripcion: "Guantes Gym Grip Pro con agarre antideslizante, protección para las palmas y muñequera ajustable. Ideales para levantamiento de pesas.",
            nombre: "Guantes Gym Grip Pro",
            precio: 69.9,
            categoriaId: 1,
            stock: 45,
            estado: true,
            imagen: "/images/GuantesGymGripPro.jpg"
        },
        {
            descripcion: "Hoodie oversize unisex de algodón suave con interior afelpado. Diseño moderno, ideal para uso casual o post-entreno.",
            nombre: "Hoodie oversize",
            precio: 129.9,
            categoriaId: 2,
            stock: 5,
            estado: true,
            imagen: "/images/HoodieOversizeGymBeast.jpg"
        },
        {
            descripcion: "Shaker Blender de 600ml con tapa segura y bola mezcladora de acero inoxidable. Perfecto para batidos de proteína y suplementos.",
            nombre: "Shaker Blender 600ml",
            precio: 39.9,
            categoriaId: 1,
            stock: 80,
            estado: true,
            imagen: "/images/ShakerBlenderBottle600ml.jpg"
        },
        {
            descripcion: "Short Flex deportivo de secado rápido y tejido elástico. Ideal para entrenamientos de alta intensidad y comodidad total.",
            nombre: "Short Flex",
            precio: 74.9,
            categoriaId: 2,
            stock: 55,
            estado: true,
            imagen: "/images/ShortsFlexProGym.jpg"
        },
        {
            descripcion: "Toalla de microfibra ligera, de secado rápido y ultra absorbente. Ideal para gimnasio, viajes o actividades al aire libre.",
            nombre: "Toalla Microfibra",
            precio: 44.9,
            categoriaId: 1,
            stock: 70,
            estado: true,
            imagen: "/images/ToallaMicrofibraUltrafit.png"
        },
        {
            descripcion: "Suplemento XTEND Sport con 7g de BCAA por porción, ideal para recuperación muscular e hidratación. Sabor Blue Raspberry Ice.",
            nombre: "XTEND Sport BCAA",
            precio: 139.9,
            categoriaId: 3,
            stock: 25,
            estado: true,
            imagen: "/images/XTENDBCAA+Electrolytes.jpg"
        }
    ],
    ventas: [
        {
            fecha_venta: new Date(),
            total: 149,
            usuario_id: 1
        }
    ],
    detallesVentas: [
        {
            venta_id: 1,
            producto_id: null,
            plan_membresia_id: 1,
            cantidad: 1,
            precio_unitario: 80,
            subtotal: 80,
            telefono: '999999999',
            metodo_pago_id: 3,
            estado_pago_id: 2
        },
        {
            venta_id: 1,
            producto_id: 6,
            plan_membresia_id: null,
            cantidad: 1,
            precio_unitario: 69,
            subtotal: 69,
            telefono: '999999999',
            metodo_pago_id: 3,
            estado_pago_id: 2
        }
    ],
    asistencia: [
        {
            usuario_id: 1,
            fecha: new Date(),
            hora_entrada: new Date('2025-06-29T08:00:00'),
            hora_salida: new Date('2025-06-29T16:00:00')
        }
    ]
}