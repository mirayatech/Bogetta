"use client";

import Session from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/util/store";
import { AiFillShopping } from "react-icons/ai";
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
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center pb-10">
      <Link
        href={"/"}
        className="uppercase text-xl text-secondary font-semibold"
      >
        barista
      </Link>
      <ul className="flex align-center gap-10">
        <li
          className="flex items-center text-3xl relative cursor-pointer"
          onClick={() => cartStore.toggleCart()}
        >
          <AiFillShopping />
          <span className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center">
            {cartStore.cart.length}
          </span>
        </li>
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
      {cartStore.isOpen && <Cart />}
    </nav>
  );
}
