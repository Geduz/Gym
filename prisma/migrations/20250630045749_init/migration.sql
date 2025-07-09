/*
  Warnings:

  - Made the column `miembro` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "miembro" SET NOT NULL;
