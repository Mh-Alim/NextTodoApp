import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, description } = await req.json();
    const session = await getServerSession(authOptions);
    console.log("session in backend: ", session);
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 200 }
      );
    }
    console.log(title, description);

    const userId = (session.user as any).id as string;
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId,
        status: "ACTIVE",
      },
    });

    return NextResponse.json(
      {
        todoId: todo.id,
        message: "Todo created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log("erro: ", err);
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    console.log("`````````````Coming in this get function or not");
    const session = await getServerSession(authOptions);
    console.log("Session: ", session);
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 200 }
      );
    }

    const userId = (session.user as any).id as string;

    const userTodos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });

    console.log("All Todos: ", userTodos);

    return NextResponse.json(
      {
        message: "All Todos",
        todos: userTodos,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}
