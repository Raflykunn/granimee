/*
  Warnings:

  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Episode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Episode" DROP CONSTRAINT "Episode_animeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WatchHistory" DROP CONSTRAINT "WatchHistory_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WatchHistory" DROP CONSTRAINT "WatchHistory_userId_fkey";

-- DropTable
DROP TABLE "public"."Anime";

-- DropTable
DROP TABLE "public"."Episode";

-- DropTable
DROP TABLE "public"."WatchHistory";

-- CreateTable
CREATE TABLE "public"."anime" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "coverImage" TEXT,
    "bannerImage" TEXT,
    "genre" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "releaseDate" TIMESTAMP(3),
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."episode" (
    "id" TEXT NOT NULL,
    "animeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "episodeNum" INTEGER NOT NULL,
    "description" TEXT,
    "duration" INTEGER,
    "releaseDate" TIMESTAMP(3),
    "videoUrl" TEXT NOT NULL,
    "subtitleUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."watchHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "watchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."episode" ADD CONSTRAINT "episode_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "public"."anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."watchHistory" ADD CONSTRAINT "watchHistory_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "public"."episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."watchHistory" ADD CONSTRAINT "watchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
