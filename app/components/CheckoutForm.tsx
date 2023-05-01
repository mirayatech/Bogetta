"use client";

import formatPrice from "@/util/price-format";
import { useCartStore } from "@/util/store";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const [isLoading, seIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const cartStore = useCartStore();

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
    <form onSubmit={handleOnSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "accordion" }} />
      <h1>Total: {formattedPrice}</h1>
      <button
        className="text-black"
        id="submit"
        disabled={isLoading || !stripe || !elements}
      >
        <span id="button-text">
          {isLoading ? <span>Processing...</span> : <span>Pay now!</span>}
        </span>
      </button>
    </form>
  );
}

export default CheckoutForm;
