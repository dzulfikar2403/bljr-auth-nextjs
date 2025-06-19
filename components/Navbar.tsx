"use client";

import React from "react";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { logout } from "@/action/auth";

type NavbarProps = {
  session?: Session;
};

const Navbar = ({ session }: NavbarProps) => {
  const initialUser = session?.user?.name
    ?.split(" ")
    .map((el) => el.slice(0, 1))
    .join("")
    .toUpperCase();

  return (
    <nav className="w-full flex items-center justify-between px-4 py-1.5">
      <h1>Navbar</h1>
      <ul className="flex items-center gap-4">
        <li><span className="font-semibold">Hello</span></li>
        {session && (
          <li className="flex items-center gap-4">
            <div className="flex items-center gap-2" >

            <Avatar>
              <AvatarFallback className="bg-sky-500 text-white">
                {initialUser ?? "IN"}
              </AvatarFallback>
            </Avatar>
            <p>{session.user?.name ?? ""}</p>
            </div>
            <div>
              <form action={async () => await logout()}>
                <Button variant="outline" className="cursor-pointer">Logout</Button>
              </form>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
