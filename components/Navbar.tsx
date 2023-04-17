"use client";

import Session from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

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
    <nav className="flex justify-between items-center py-8">
      <h1>Barista</h1>

      <ul>
        {!user && (
          <li>
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}

        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user?.name as string}
              width={50}
              height={50}
            />
          </li>
        )}
      </ul>
    </nav>
  );
}
