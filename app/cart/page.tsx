"use client";

import { useCartStore } from "@/util/store";
import Image from "next/image";
import ConfirmOrder from "@/app/components/confirmOrder";
import React from "react";
import { formatPrice } from "@/util/price-format";
import { BsChevronLeft, BsChevronRight } from "react-icons/Bs";
import Checkout from "@/app/components/checkout";

function Cart() {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <>
      <div
        className="flex items-start justify-evenly ml-40"
        onClick={() => cartStore.toggleCart()}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {cartStore.onCheckout === "cart" && (
            <React.Fragment>
              {cartStore.cart.map((item) => (
                <div key={item.id} className="flex items-center pb-10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={250}
                    height={250}
                    className="mr-5 w-auto"
                    priority={true}
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <span className="font-bold uppercase line-through text-sm">
                        Bottega
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </div>

                    <div className="w-[120px] flex items-center justify-between border border--textColor p-2">
                      <span className="text-xs text-textColor">Quantity</span>
                      <div className="flex items-center text-textColor">
                        <button
                          onClick={() =>
                            cartStore.removeProduct({
                              id: item.id,
                              image: item.image,
                              name: item.name,
                              unit_amount: item.unit_amount,
                              quantity: item.quantity,
                            })
                          }
                        >
                          <BsChevronLeft />
                        </button>
                        <span className="text-xs w-[10px] flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            cartStore.addProduct({
                              id: item.id,
                              image: item.image,
                              name: item.name,
                              unit_amount: item.unit_amount,
                              quantity: item.quantity,
                            })
                          }
                        >
                          <BsChevronRight />
                        </button>
                      </div>
                    </div>

                    <span className="text-sm">
                      {item.unit_amount && formatPrice(item.unit_amount)}
                    </span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>

        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" && (
          <div className="sticky top-10 bg-cardColor p-8 flex flex-col w-[350px] mt-5 ">
            <h2 className="text-xl font-medium mb-8">cart totals</h2>
            <div className="w-full flex justify-between py-5\3 px-0">
              <span className="font-medium">subtotal</span>
              <span className="text-textColor">{formatPrice(totalPrice)}</span>
            </div>
            <div className="w-full flex justify-between py-5 px-0">
              <span className="font-medium">shipping</span>
              <span className="text-textColor">{formatPrice(0)}</span>
            </div>
            <div className="w-full h-[1px] bg-[#e1e1e1] my-3" />
            <div className="w-full flex justify-between py-5 px-0">
              <span className="font-medium">total</span>
              <span className="mb-5">{formatPrice(totalPrice)}</span>
            </div>
            {cartStore.cart.length > 0 && (
              <button
                className="text-sm font-semibold p-3 bg-black text-white hover:bg-buttonHover ease duration-200"
                onClick={() => cartStore.setOnCheckout("checkout")}
              >
                proceed to checkout
              </button>
            )}
          </div>
        )}
        {/* Extra */}
        {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
          <div className="flex flex-col items-center justify-center h-screen m-auto">
            <h1 className="mb-10 text-xl">Your shopping cart is empty</h1>

            <div className="sticky top-10 bg-cardColor p-8 flex flex-col w-[350px]">
              <h2 className="text-xl font-medium mb-8">cart totals</h2>
              <div className="w-full flex justify-between py-5\3 px-0">
                <span className="font-medium">subtotal</span>
                <span className="text-textColor">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="w-full flex justify-between py-5 px-0">
                <span className="font-medium">shipping</span>
                <span className="text-textColor">{formatPrice(0)}</span>
              </div>
              <div className="w-full h-[1px] bg-[#e1e1e1] my-3" />
              <div className="w-full flex justify-between py-5 px-0">
                <span className="font-medium">total</span>
                <span className="mb-5">{formatPrice(totalPrice)}</span>
              </div>
              {cartStore.cart.length > 0 && (
                <button
                  className="text-sm font-semibold p-3 bg-black text-white hover:bg-buttonHover ease duration-200"
                  onClick={() => cartStore.setOnCheckout("checkout")}
                >
                  proceed to checkout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {cartStore.onCheckout === "checkout" && <Checkout />}
      {cartStore.onCheckout === "success" && <ConfirmOrder />}
    </>
  );
}

export default Cart;
