import formatPrice from "@/util/price-format";
import { useCartStore } from "@/util/store";
import Image from "next/image";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";

function Cart() {
  const cartStore = useCartStore();

  return (
    <div
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0  h-screen p-12 overflow-y-scroll  w-full lg:w-2/5"
      >
        <h1>Here's your shopping list 🗒 </h1>
        {cartStore.cart.map((item) => (
          <div className="flex gap-6 my-10">
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="rounded-md"
            />

            <div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>{formatPrice(item.unit_amount)}</p>

              <button
                className="text-lg"
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
                className="text-lg"
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
          </div>
        ))}

        {cartStore.cart.length > 0 && <button>Check out</button>}

        {!cartStore.cart.length && <button>Your cart is empty</button>}
      </div>
    </div>
  );
}

export default Cart;
