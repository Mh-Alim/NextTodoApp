import { prisma } from "@/app/api/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, arg: any, res: NextResponse) => {
  const id: number = Number(arg.params.todoId[0]);

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
    // alert("Deleted successfully");
  } catch (err: any) {
    console.log("Error: ", err.message);
    return NextResponse.json({ message: "Deleted Failed" }, { status: 200 });
  }
};

export const PUT = async (req: NextRequest, arg: any, res: NextResponse) => {
  try {
    const id: number = Number(arg.params.todoId[0]);
    const { title, description } = await req.json();
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({ message: "Updated Success" }, { status: 200 });
  } catch (err: any) {
    console.log("Error: ", err.message);
    return NextResponse.json({ message: "Updated Failed" }, { status: 200 });
  }
};
