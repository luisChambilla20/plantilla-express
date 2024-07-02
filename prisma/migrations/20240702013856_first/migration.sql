/*
  Warnings:

  - You are about to drop the column `productoId` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Rol` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `productoId` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rolId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categoria" DROP CONSTRAINT "Categoria_productoId_fkey";

-- DropForeignKey
ALTER TABLE "Rol" DROP CONSTRAINT "Rol_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_productoId_fkey";

-- AlterTable
ALTER TABLE "Categoria" DROP COLUMN "productoId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Productos" ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rol" DROP COLUMN "usuarioId";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "categoriaId",
DROP COLUMN "productoId",
ADD COLUMN     "rolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Productos" ADD CONSTRAINT "Productos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
