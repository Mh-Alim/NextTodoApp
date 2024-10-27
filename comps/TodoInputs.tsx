"use client";

import React from "react";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TodoInputs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log("Home page");
  const todoSubmitHandler = async () => {
    const { data } = await axios.post("http://localhost:3000/api/todo", {
      title,
      description,
    });
    console.log("Todo submit", data);
    window.location.reload();
  };
  return (
    <div className="flex w-full max-w-sm items-start space-x-2">
      <Input
        type="text"
        placeholder="Todo title"
        onChange={(e) => setTitle(e.target.value)}
      />{" "}
      <br />
      <Input
        type="text"
        aria-multiline
        placeholder="Todo description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={todoSubmitHandler} type="submit">
        Add Todo
      </Button>
    </div>
  );
};

export default TodoInputs;
