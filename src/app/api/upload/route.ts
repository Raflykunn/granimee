import { PrismaClient } from "@/generated/prisma";
import { IAnime } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: IAnime = await req.json();

  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    await prisma.anime.create({
      data: {
        title: body.title,
        synopsis: body.synopsis,
        coverImage: body.coverImage,
        bannerImage: body.bannerImage,
        genre: body.genre,
        status: body.status,
        releaseDate: body.releaseDate,
        rating: body.rating,
      },
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 400, message: error, });
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json({ status: 200, message: "Done !", });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({ message: body, status: 200 });
}
