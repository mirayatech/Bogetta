"use client";

import Link from "next/link";
import { useCartStore } from "@/util/store";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import { BsBag } from "react-icons/Bs";

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
        <BsBag className="text-4xl" />
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
