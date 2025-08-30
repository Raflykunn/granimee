/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Anime" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
