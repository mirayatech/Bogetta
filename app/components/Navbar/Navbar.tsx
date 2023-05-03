"use client";

import Link from "next/link";
import Cart from "../Cart";
import { useCartStore } from "@/util/store";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import { BsBag } from "react-icons/Bs";

import styles from "./styles.module.scss";
import { useState } from "react";
import { Menu } from "../Menu/Menu";
import { UserType } from "@/types";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

type NavbarProps = {
  user: UserType;
};

export default function Navbar({ user }: NavbarProps) {
  const cartStore = useCartStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <Link href={"/"}>
        <Image
          src="/logo-dark-vertical.png"
          width={40}
          height={40}
          alt="logo"
          className={styles.logo}
        />
      </Link>
      <button
        className={styles.bars}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <HiOutlineXMark /> : <CgMenuGridR />}
      </button>

      <span onClick={() => cartStore.toggleCart()} className={styles.cart}>
        <BsBag className={styles.cartIcon} />
        {cartStore.cart.length > 0 && (
          <span className={styles.cartQuantity}>{cartStore.cart.length}</span>
        )}
      </span>
      {cartStore.isOpen && <Cart />}
      <AnimatePresence>
        {isMenuOpen && (
          <Menu user={user} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  );
}
