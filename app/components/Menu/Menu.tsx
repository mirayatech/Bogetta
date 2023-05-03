import { UserType } from "@/types";
import styles from "./styles.module.scss";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import ClickAwayListener from "react-click-away-listener";

type MenuProps = {
  onClose: () => void;
  user?: UserType;
};

export function Menu({ onClose, user }: MenuProps) {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className={styles.menu}>
        <div className={styles.nav}>
          <Link href={"/"} className={styles.navItem}>
            Home
          </Link>
          <Link href={"/dashboard"} className={styles.navItem}>
            Dashboard
          </Link>
          {!user ? (
            <button onClick={() => signIn()} className={styles.navItem}>
              Sign in
            </button>
          ) : (
            <button onClick={() => signOut()} className={styles.navItem}>
              Sign Out
            </button>
          )}
        </div>

        <div className={styles.author}>
          <a
            href={"https://github.com/mirayatech"}
            className={styles.authorItem}
          >
            Built and designed by miraya
          </a>
        </div>
      </div>
    </ClickAwayListener>
  );
}
