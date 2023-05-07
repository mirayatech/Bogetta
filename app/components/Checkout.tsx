"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/util/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi";
import CheckoutForm from "./checkoutForm";
import OrderAnimation from "./orderAnimation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const cartStore = useCartStore();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create payment intent when checkout page loads.
    // Generate new payment intent ID every time user goes to checkout page.
    // Save generated ID for later use in case of cart update and re-checkout.

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((response) => {
        if (response.status === 403) {
          return router.push("/api/auth/signin");
        }
        return response.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        cartStore.setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <div className="flex flex-col items-center justify-center h-screen m-auto">
          {cartStore.onCheckout === "checkout" && (
            <button
              onClick={() => cartStore.setOnCheckout("cart")}
              className="pb-4 flex items-center gap-2 hover:scale-105 ease duration-100 ml-[-350px] font-semibold"
            >
              <HiOutlineArrowLeft /> check your cart
            </button>
          )}
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </div>
  );
}
