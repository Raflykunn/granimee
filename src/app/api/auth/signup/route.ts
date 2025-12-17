import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { id, email, role, username } = body;

  const prisma = new PrismaClient();

  try {
    const data = await prisma.user.create({
      data: {
        id: id,
        email: email,
        role: role,
        username: username,
      },
    });

    console.log(data);

    if (!data) return NextResponse.json({ message: "error", status: 400 });
    return NextResponse.json({ message: data, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "ok", status: 200 });
    //   }
  }
}
