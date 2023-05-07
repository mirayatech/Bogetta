"use client";

import { formatPrice } from "@/util/price-format";
import { useCartStore } from "@/util/store";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const cartStore = useCartStore();
  const [isLoading, seIsLoading] = useState(false);

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);
  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    seIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setOnCheckout("success");
        }
        seIsLoading(false);
      });
  };
  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  return (
    <form onSubmit={handleOnSubmit} className="bg-cardColor p-5 w-[500px]">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="my-5 flex justify-between text-lg">
        total <span className="text-base">{formattedPrice}</span>
      </h1>
      <button
        className="text-sm font-semibold p-3 bg-black text-white hover:bg-buttonHover ease duration-200 w-full "
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? <span>Processing...</span> : <span>Pay now!</span>}
      </button>
    </form>
  );
}
