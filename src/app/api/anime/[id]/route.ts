import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params

  try {
    const data = await prisma.anime.findFirst({
      where: { id: id },
      include: {episodes: true}
    });

    if (!data)
      return NextResponse.json({ message: "Anime not found", status: 404 });

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, status: 400 });
  }

}
