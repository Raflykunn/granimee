/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `episode` table. All the data in the column will be lost.
  - Made the column `duration` on table `episode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."episode" DROP COLUMN "releaseDate",
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT;
