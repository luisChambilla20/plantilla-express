-- CreateTable
CREATE TABLE "Rol" (
    "Id" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "Id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "img" TEXT,
    "estado" BIGINT DEFAULT 1,
    "google" BIGINT DEFAULT 0,
    "categoriaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("Id")
);


-- CreateTable
CREATE TABLE "Categoria" (
    "Id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BIGINT NOT NULL DEFAULT 1,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Productos" (
    "Id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" BIGINT NOT NULL DEFAULT 1,
    "img" TEXT,
    "precio" DOUBLE PRECISION DEFAULT 0.00,
    "descripcion" TEXT,
    "disponible" BIGINT DEFAULT 1,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rol_rol_key" ON "Rol"("rol");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "Productos_nombre_key" ON "Productos"("nombre");

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Productos"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Productos"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
