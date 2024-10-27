import ShowTodos from "@/comps/ShowTodos";
import TodoInputs from "@/comps/TodoInputs";
import axios from "axios";

export default async function Home() {
  // console.log("Todos: ", todos);
  return (
    <div className="bg-slate-400 h-[95vh] flex justify-center flex-col items-center text-white">
      <TodoInputs />
      {/* // show all the todos */}
      <ShowTodos />
    </div>
  );
}
