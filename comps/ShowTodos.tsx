import React from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type TodoType = {
  id: number;
  title: string;
  description: string;
};

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
export default async function ShowTodos() {
  const todos: any = await fetchTodos();
  console.log(todos);
  return (
    <div className=" m-5 max-h-[60vh] overflow-y-scroll ">
      {todos?.map((todo: TodoType) => (
        <TodoItem
          id={todo.id}
          title={todo.title}
          description={todo.description}
        />
      ))}
    </div>
  );
}
