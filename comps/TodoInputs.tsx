"use client";

import React, { useRef } from "react";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShowTodos from "@/comps/ShowTodos";

const TodoInputs = ({ todos }: any) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const tit = useRef(null);
  const desc = useRef(null);
  const [clientTodos, setClientTodos] = useState(todos || []);
  console.log("todo in input", clientTodos);
  const todoSubmitHandler = async () => {
    const title = (tit.current as any).value;
    const description = (desc.current as any).value;
    const { data } = await axios.post("http://localhost:3000/api/todo", {
      title,
      description,
    });
    console.log("Todo submit", data);
    setClientTodos([...clientTodos, { id: data.id, title, description }]);
  };
  return (
    <div className="bg-slate-400 h-[95vh] flex justify-center flex-col items-center text-white">
      <div className="flex w-full max-w-sm items-start space-x-2">
        <Input type="text" placeholder="Todo title" ref={tit} /> <br />
        <Input
          type="text"
          aria-multiline
          placeholder="Todo description"
          ref={desc}
        />
        <Button onClick={todoSubmitHandler} type="submit">
          Add Todo
        </Button>
      </div>
      <ShowTodos todos={clientTodos} />
    </div>
  );
};

export default TodoInputs;
