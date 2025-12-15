import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Получить все заметки
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json([], { status: 401 });
  }

  const notes = await prisma.note.findMany({
    where: {
      user: { email: session.user.email },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(notes);
}

// Создать новую заметку
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId: user!.id,
    },
  });

  return NextResponse.json(note);
}
