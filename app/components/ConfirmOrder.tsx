import { useCartStore } from "@/util/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ConfirmOrder() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const onCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setOnCheckout("cart");
    }, 500);
    cartStore.toggleCart();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto gap-5">
      <Image
        alt="done"
        height={200}
        width={200}
        src={"/done.png"}
        priority={true}
        className="w-auto"
      />
      <span className="font-bold uppercase line-through text-xl">Bottega</span>
      <h1 className="text-lg text-center">
        Your order has been placed, <br />
        check your email for the receipt.
      </h1>
      <button
        onClick={() => {
          onCheckoutOrder();
        }}
        className="text-sm mt-2 font-semibold p-3 bg-black text-white hover:bg-buttonHover ease duration-200"
      >
        <Link href="/dashboard">Check your order</Link>
      </button>
    </div>
  );
}
