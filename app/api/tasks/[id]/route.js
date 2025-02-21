import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const task = await prisma.task.update({
      where: {
        id: parseInt(params.id),
      },
      data: body,
      include: {
        tags: true,
        group: true,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
