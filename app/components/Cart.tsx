import formatPrice from "@/util/price-format";
import { useCartStore } from "@/util/store";
import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import Checkout from "./Checkout";

function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* Cart */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0  h-screen p-12 overflow-y-scroll  w-full lg:w-2/5"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm  pb-12"
          >
            Back to store 🏃
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setOnCheckout("cart")}
            className="text-sm  pb-12"
          >
            Check your cart 🛒
          </button>
        )}
        {/* Cart Items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <div
                key={item.id}
                className="flex p-4 gap-4 bg-base-100 my-4 rounded-lg "
              >
                <Image
                  className="rounded-md h-24"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <div>
                  <h2>{item.name}</h2>
                  {/* Update quantity of a product */}
                  <div className="flex gap-2">
                    <h2>Quantity: {item.quantity}</h2>
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
                      <IoRemoveCircle />
                    </button>
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
                      <IoAddCircle />
                    </button>
                  </div>

                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
        {/* Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <div>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setOnCheckout("checkout")}
              className="py-2 mt-4 bg-primary w-full rounded-md text-white"
            >
              Checkout
            </button>
          </div>
        ) : null}

        {cartStore.onCheckout === "checkout" && <Checkout />}
        {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
          <div className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75">
            <h1>Uhhh ohhh...it's empty 😢</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
