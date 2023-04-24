import { AddCartType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "cart-store" }
  )
);
