"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Cart from "../Cart";
import { useCartStore } from "@/util/store";
import { HiOutlineXMark, HiOutlineBars3 } from "react-icons/hi2";
import { MdShoppingCart } from "react-icons/md";

import styles from "./styles.module.scss";
import { useState } from "react";
import { Menu } from "../Menu/Menu";
import { UserType } from "@/types";

export default function Navbar({ user }: { user: UserType }) {
  const cartStore = useCartStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.nav}>
        {user ? (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              src={user?.image as string}
              alt={user?.name as string}
              width={35}
              height={35}
              className={styles.avatar}
            />
          </button>
        ) : (
          <button
            className={styles.bars}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        )}
        <Link href={"/"}>
          <h1 className={styles.logo}>barista</h1>
        </Link>
        <span onClick={() => cartStore.toggleCart()} className={styles.cart}>
          <MdShoppingCart className={styles.cartIcon} />
          {cartStore.cart.length > 0 && (
            <span className={styles.cartQuantity}>{cartStore.cart.length}</span>
          )}
        </span>
        {cartStore.isOpen && <Cart />}
        {isMenuOpen && (
          <Menu user={user} onClose={() => setIsMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
}
