/*
  Warnings:

  - Added the required column `releaseDate` to the `anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."anime" DROP COLUMN "releaseDate",
ADD COLUMN     "releaseDate" INTEGER NOT NULL;
