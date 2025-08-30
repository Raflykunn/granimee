import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const apiKey = req.headers.get("X-Frontend-Auth")

    const prisma = new PrismaClient()

    const data = await prisma.anime.findMany()

  return NextResponse.json({ data, status: 200 });
}
