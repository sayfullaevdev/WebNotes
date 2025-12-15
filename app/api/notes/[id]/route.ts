import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// PATCH — обновление заметки
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { title, content } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await prisma.note.updateMany({
    where: {
      id,
      user: { email: session.user.email },
    },
    data: {
      title,
      content,
    },
  });

  return NextResponse.json(updated);
}

// DELETE — удаление заметки
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.note.deleteMany({
    where: {
      id,
      user: { email: session.user.email },
    },
  });

  return NextResponse.json({ success: true });
}
