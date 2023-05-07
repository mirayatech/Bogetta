"use client";

import Link from "next/link";
import { useCartStore } from "@/util/store";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";

import { useState } from "react";
import { UserType } from "@/types";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import Menu from "./menu";

type NavbarProps = {
  user: UserType;
};

export default function Navbar({ user }: NavbarProps) {
  const cartStore = useCartStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex flex-col items-center justify-between fixed h-screen z-10 top-0 border-r border-borderColor bg-white p-9">
      <Link href={"/"}>
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
          priority={true}
          className="w-auto"
        />
      </Link>
      <button className="text-4xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <HiOutlineXMark /> : <CgMenuGridR />}
      </button>

      <Link
        href={"/cart"}
        onClick={() => cartStore.toggleCart()}
        className="relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
          />
        </svg>
        {cartStore.cart.length > 0 && (
          <span className="absolute top-3 left-3.5 text-sm font-bold">
            {cartStore.cart.length}
          </span>
        )}
      </Link>

      <AnimatePresence>
        {isMenuOpen && (
          <Menu user={user} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}
