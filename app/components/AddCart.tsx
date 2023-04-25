"use client";
import { AddCartType } from "@/types";
import { useCartStore } from "@/util/store";

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();

  return (
    <button
      onClick={() =>
        cartStore.addProduct({ id, name, unit_amount, image, quantity })
      }
      className="text-primary"
    >
      Add to cart
    </button>
  );
}
