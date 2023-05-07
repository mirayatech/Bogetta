import { UserType } from "@/types";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import ClickAwayListener from "react-click-away-listener";
import { motion } from "framer-motion";

type MenuProps = {
  onClose: () => void;
  user?: UserType;
};

export default function Menu({ onClose, user }: MenuProps) {
  const handleSignIn = () => {
    signIn();
    onClose();
  };

  const handleSignOut = () => {
    signOut();
    onClose();
  };
  return (
    <ClickAwayListener onClickAway={onClose}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ type: "ease-in" }}
        style={{ boxShadow: "10px 0px 10px -10px rgba(0, 0, 0, 0.15)" }}
        className="flex flex-col items-center justify-end h-screen gap-5 absolute top-0 left-[113px] bg-white w-60 px-5 py-10"
      >
        <motion.div className="flex flex-col items-center gap-6 text-xl pt-72">
          <Link
            onClick={() => onClose()}
            href={"/"}
            className="font-bold uppercase hover:text-textHover ease duration-150"
          >
            Home
          </Link>
          <Link
            onClick={() => onClose()}
            href={"/dashboard"}
            className="font-bold uppercase hover:text-textHover ease duration-150"
          >
            Orders
          </Link>
          {!user ? (
            <button
              onClick={handleSignIn}
              className="font-bold uppercase hover:text-textHover ease duration-150"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="font-bold uppercase hover:text-textHover ease duration-150"
            >
              Sign Out
            </button>
          )}
        </motion.div>

        <div className="mt-auto">
          <a
            href={"https://github.com/mirayatech"}
            className="text-sm text-textColor font-extralight hover:text-black ease duration-150"
          >
            Built and designed by miraya
          </a>
        </div>
      </motion.div>
    </ClickAwayListener>
  );
}
