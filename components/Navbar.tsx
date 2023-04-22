"use client";

import Session from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../public/logo.png";
type NavbarProps = {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  expires: string | undefined;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center pb-10">
      <h1 className="uppercase text-xl text-secondary font-semibold">
        barista
      </h1>

      <ul>
        {!user && (
          <li>
            <button
              className="bg-primary px-3 py-1.5 rounded text-white font-semibold text-base"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}

        {user && (
          <li>
            <Image
              className="rounded-full"
              src={user?.image as string}
              alt={user?.name as string}
              width={60}
              height={60}
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
