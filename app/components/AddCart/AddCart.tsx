"use client";
import formatPrice from "@/util/price-format";
import { useCartStore } from "@/util/store";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import styles from "./AddCart.module.scss";
import { AddCartType } from "@/types";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <motion.button
      onClick={() =>
        cartStore.addProduct({ id, name, unit_amount, image, quantity })
      }
      className={styles.button}
    >
      <span>Add to cart</span>
    </motion.button>
  );
}
