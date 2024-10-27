import React from "react";
import TodoItem from "./TodoItem";
import axios from "axios";

type TodoType = {
  id: number;
  title: string;
  description: string;
};

export default async function ShowTodos({ todos }: any) {
  console.log("todos in child: ", todos);
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
