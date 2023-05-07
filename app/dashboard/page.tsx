import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

import React from "react";
import Container from "../components/container";
import { formatPrice } from "@/util/price-format";
import { prisma } from "@/util/prisma";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);

  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    //@ts-ignore
    where: { userId: user?.user?.id },
    include: { products: true },
  });
  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  const formatDate = (date: any) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  if (orders === null) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center h-screen text-center m-auto">
        <Image
          alt="done"
          height={200}
          width={200}
          src={"/login.png"}
          priority={true}
          className="w-auto"
        />
        <h1 className="text-xl">You need to be logged in to see your orders</h1>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen m-auto gap-5 w-[500px]">
        <Image
          alt="done"
          height={150}
          width={150}
          src={"/box.png"}
          priority={true}
        />
        <h1 className="my-5 flex justify-between text-2xl">
          No orders placed.
        </h1>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-center items-center m-auto py-5 h-full p-2">
        <div className="flex flex-col justify-center h-full m-auto gap-3 w-[1000px]">
          {orders.map((order) => (
            <div key={order.id} className="rounded-sm p-8 my-4  bg-cardColor">
              <div className="flex justify-between mb-5 border-b border--textColor">
                <span className="pb-5">
                  <span className="font-semibold pr-1">Order reference:</span>{" "}
                  {order.id}
                </span>

                <span className="pb-5">
                  <span className="font-semibold pr-1">Date:</span>{" "}
                  {formatDate(new Date(order.createdDate))}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-5 text-sm">
                {order.products.map((product) => (
                  <React.Fragment key={product.id}>
                    <span>
                      {" "}
                      <span className="font-semibold pr-1">Product:</span>{" "}
                      {product.name}
                    </span>
                    <span>
                      <span className="font-semibold pr-1">Price:</span>{" "}
                      {formatPrice(product.unit_amount)}
                    </span>
                    <span>
                      <span className="font-semibold pr-1">Quantity:</span>{" "}
                      {product.quantity}
                    </span>{" "}
                    <div className="w-[60px]">
                      <Image
                        src={product.image!}
                        width={60}
                        height={60}
                        alt={product.name}
                        priority={true}
                        className="w-full object-fill"
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <p className="flex justify-between mt-5 pt-5 border-t border--textColor">
                <span className="font-semibold">Total:</span>

                <span> {formatPrice(order.amount)}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
