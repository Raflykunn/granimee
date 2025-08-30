import { PrismaClient } from "@/generated/prisma";
import { IEpisode } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST (req: NextRequest) {
    const body = await req.json()
    
    const anime = await prisma.anime.findFirst({
        where: {title: body.animeTitle}
    })

    if (!anime) return NextResponse.json({ message: "Anime not found", status: 404 })

    const episodes = body.episodes as IEpisode[]

    const episodeData = episodes.map((ep) => ({
      animeId: anime.id,
      title: ep.title,
      episodeNum: ep.episodeNum,
      description: ep.description || null,
      duration: ep.duration || null,
      videoUrl: ep.videoUrl,
    }))
    
    try {
        await prisma.episode.createMany({
          data: episodeData,
          skipDuplicates: true // jika sudah ada, tidak akan dibuat ulang
        })
       
    } catch (error) {
        console.log(error)
       return NextResponse.json({ message: error, status: 400 })
    }


return NextResponse.json({ message: "Done!", status: 200 })
}

export async function PUT () {

}

export async function DELETE (req: NextRequest) {
    const body = await req.json()

    try {
        const data = await prisma.episode.delete({
            where: {
                id: body.episodeId
            }
        })
        
        if (!data) return NextResponse.json({ message: "Episode not found", status: 404 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, status: 400 })
    }

    return NextResponse.json({ message: "Done!", status: 200 })
}