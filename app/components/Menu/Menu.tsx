import { UserType } from "@/types";
import styles from "./styles.module.scss";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

type MenuProps = {
  onClose: () => void;
  user: UserType;
};

export function Menu({ onClose, user }: MenuProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.menu}>
        <Link href={"/"} className={styles.menuItem}>
          Home
        </Link>
        <Link href={"/products"} className={styles.menuItem}>
          Shop
        </Link>
        <Link href={"/dashboard"} className={styles.menuItem}>
          {" "}
          Dashboard
        </Link>
        {!user ? (
          <button onClick={() => signIn()} className={styles.menuItem}>
            Sign in
          </button>
        ) : (
          <button onClick={() => signOut()} className={styles.menuItem}>
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
