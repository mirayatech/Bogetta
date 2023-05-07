"use client";

import { useCartStore } from "@/util/store";
import { motion } from "framer-motion";

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
      className="text-white text-xs p-3 w-32 bg-black mt-4 font-semibold hover:bg-buttonHover ease duration-150"
    >
      Add to cart
    </motion.button>
  );
}
