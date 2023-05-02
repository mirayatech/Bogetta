import { useCartStore } from "@/util/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function ConfirmOrder() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
  }, []);

  const onCheckoutOrder = () => {
    setTimeout(() => {
      cartStore.setOnCheckout("cart");
    }, 1000);
    cartStore.toggleCart();
  };

  return (
    <div>
      <h1>Your order has been placed</h1>
      <h2>Check yout email for the receipt</h2>
      <Image alt="d" height={100} width={100} src={"/giphy.gif"} />
      <button
        onClick={() => {
          onCheckoutOrder;
        }}
      >
        <Link href="/dashboard">Check your order</Link>
      </button>
    </div>
  );
}

export default ConfirmOrder;
