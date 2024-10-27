"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const TodoItem = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [heading, setHeading] = useState(title);
  const [subHeading, setSubHeading] = useState(description);
  const editTodoHadler = async () => {
    if (!readOnly) {
      await axios.put(`http://localhost:3000/api/todo/${id}`, {
        title: heading,
        description: subHeading,
      });
      window.location.reload();
    }
    setReadOnly(!readOnly);

    // setReadOnly(!readOnly);
  };
  const deleteTodoHandler = async () => {
    const { data } = await axios.delete(`http://localhost:3000/api/todo/${id}`);
    alert(data.message);
    window.location.reload();
  };
  return (
    <div className="mt-10 flex gap-5 border-2 border-red-400 p-5 ">
      <div>
        <input
          type="text"
          className=" text-black font-semibold text-3xl w-fit bg-transparent outline-none overflow-auto "
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          readOnly={readOnly}
        />{" "}
        <br />
        <input
          type="text"
          className=" text-black w-fit bg-transparent outline-none overflow-auto "
          value={subHeading}
          onChange={(e) => setSubHeading(e.target.value)}
          readOnly={readOnly}
        />
      </div>

      <div className=" flex gap-5 ">
        <Button onClick={editTodoHadler} variant={"secondary"}>
          {readOnly ? "Edit" : "Submit"}
        </Button>
        <Button onClick={deleteTodoHandler} variant={"destructive"}>
          del
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
