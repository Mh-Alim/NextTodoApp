import ShowTodos from "@/comps/ShowTodos";
import TodoInputs from "@/comps/TodoInputs";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function fetchTodos() {
  try {
    console.log("`````````````Coming in this get function or not");
    const session = await getServerSession(authOptions);
    console.log("Session: ", session);
    if (!session) {
      return [];
    }

    const userId = (session.user as any).id as string;

    const userTodos = await prisma.todo.findMany({
      where: {
        userId,
      },
    });
    userTodos.reverse();
    return userTodos;
  } catch (err) {
    return [];
  }
}
export default async function Home() {
  const todos: any = await fetchTodos();
  console.log("Todos in page", todos);
  // console.log("Todos: ", todos);
  return <TodoInputs todos={todos} />;
}
