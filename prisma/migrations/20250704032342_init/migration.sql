-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('Administrador', 'Recepcionista', 'Cliente', 'Entrenador');

-- CreateEnum
CREATE TYPE "categoriasType" AS ENUM ('Suplementos', 'Ropa', 'Accesorios');

-- CreateEnum
CREATE TYPE "MetodoPagoType" AS ENUM ('Tarjeta_de_credito_debito', 'Paypal', 'Contra_Entrega');

-- CreateEnum
CREATE TYPE "EstadoPagoType" AS ENUM ('Pendiente', 'Pagado', 'Cancelado');

-- CreateEnum
CREATE TYPE "EstadoEntrenadoresType" AS ENUM ('Activo', 'Inactivo', 'Vacaciones');

-- CreateTable
CREATE TABLE "rol" (
    "rol_id" SERIAL NOT NULL,
    "nombre" "RoleType" NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "dni" VARCHAR(10),
    "telefono" VARCHAR(20),
    "fecha_nacimiento" TIMESTAMP(3),
    "correo" VARCHAR(100) NOT NULL,
    "contrasena" TEXT NOT NULL,
    "direccion" TEXT,
    "ciudad" TEXT,
    "codigo_postal" TEXT,
    "rol_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3),
    "estado" BOOLEAN NOT NULL,
    "miembro" BOOLEAN NOT NULL,
    "asistencia_id" INTEGER,
    "imagen" TEXT,
    "entrenador_id" INTEGER,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "entrenador" (
    "entrenador_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "experiencia" INTEGER NOT NULL,
    "especialidad" TEXT[],
    "precio" INTEGER NOT NULL,
    "estado_entrenador_id" INTEGER NOT NULL,
    "imagen" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entrenador_pkey" PRIMARY KEY ("entrenador_id")
);

-- CreateTable
CREATE TABLE "asistencia" (
    "asistencia_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL,
    "hora_salida" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asistencia_pkey" PRIMARY KEY ("asistencia_id")
);

-- CreateTable
CREATE TABLE "producto" (
    "producto_id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "categoria_producto" (
    "categoria_id" SERIAL NOT NULL,
    "nombre" "categoriasType" NOT NULL,

    CONSTRAINT "categoria_producto_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "venta" (
    "venta_id" SERIAL NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("venta_id")
);

-- CreateTable
CREATE TABLE "detalle_venta" (
    "detalle_venta_id" SERIAL NOT NULL,
    "venta_id" INTEGER NOT NULL,
    "producto_id" INTEGER,
    "plan_membresia_id" INTEGER,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "metodo_pago_id" INTEGER NOT NULL,
    "estado_pago_id" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT,
    "ciudad" TEXT,
    "codigo_postal" TEXT,

    CONSTRAINT "detalle_venta_pkey" PRIMARY KEY ("detalle_venta_id")
);

-- CreateTable
CREATE TABLE "membresia" (
    "membresia_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "plan_membresia_id" INTEGER NOT NULL,

    CONSTRAINT "membresia_pkey" PRIMARY KEY ("membresia_id")
);

-- CreateTable
CREATE TABLE "plan_membresia" (
    "plan_membresia_id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "descripcion" TEXT[],

    CONSTRAINT "plan_membresia_pkey" PRIMARY KEY ("plan_membresia_id")
);

-- CreateTable
CREATE TABLE "metodo_pago" (
    "metodo_pago_id" SERIAL NOT NULL,
    "nombre" "MetodoPagoType" NOT NULL,

    CONSTRAINT "metodo_pago_pkey" PRIMARY KEY ("metodo_pago_id")
);

-- CreateTable
CREATE TABLE "estado_pago" (
    "estado_pago_id" SERIAL NOT NULL,
    "nombre" "EstadoPagoType" NOT NULL,

    CONSTRAINT "estado_pago_pkey" PRIMARY KEY ("estado_pago_id")
);

-- CreateTable
CREATE TABLE "estado_entrenador" (
    "estado_entrenador_id" SERIAL NOT NULL,
    "nombre" "EstadoEntrenadoresType" NOT NULL,

    CONSTRAINT "estado_entrenador_pkey" PRIMARY KEY ("estado_entrenador_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "entrenador_correo_key" ON "entrenador"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_producto_nombre_key" ON "categoria_producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "metodo_pago_nombre_key" ON "metodo_pago"("nombre");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_entrenador_id_fkey" FOREIGN KEY ("entrenador_id") REFERENCES "entrenador"("entrenador_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rol"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrenador" ADD CONSTRAINT "entrenador_estado_entrenador_id_fkey" FOREIGN KEY ("estado_entrenador_id") REFERENCES "estado_entrenador"("estado_entrenador_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria_producto"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_plan_membresia_id_fkey" FOREIGN KEY ("plan_membresia_id") REFERENCES "plan_membresia"("plan_membresia_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_estado_pago_id_fkey" FOREIGN KEY ("estado_pago_id") REFERENCES "estado_pago"("estado_pago_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_metodo_pago_id_fkey" FOREIGN KEY ("metodo_pago_id") REFERENCES "metodo_pago"("metodo_pago_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto"("producto_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_venta_id_fkey" FOREIGN KEY ("venta_id") REFERENCES "venta"("venta_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membresia" ADD CONSTRAINT "membresia_plan_membresia_id_fkey" FOREIGN KEY ("plan_membresia_id") REFERENCES "plan_membresia"("plan_membresia_id") ON DELETE RESTRICT ON UPDATE CASCADE;
