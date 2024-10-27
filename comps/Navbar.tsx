"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  console.log("session in client: ", session);
  return (
    <div className=" h-32 w-[100vw] flex items-center justify-around p-16  ">
      <h1 className=" text-white flex-1 ">NextTodo</h1>
      {session.status === "authenticated" ? (
        <Button
          onClick={() => {
            signOut();
          }}
          className=" m-4 "
          variant={"destructive"}
        >
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => {
            signIn();
          }}
          className=" m-4 "
          variant={"destructive"}
        >
          Login
        </Button>
      )}

      <Button
        style={{ marginLeft: "13px" }}
        className=" ml-10 "
        variant={"outline"}
        onClick={() => router.push("/profile")}
      >
        Profile
      </Button>
    </div>
  );
};

export default Navbar;
