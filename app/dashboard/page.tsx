import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

import formatPrice from "@/util/price-format";

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
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

  if (orders === null)
    return <div>You need to be logged in to see yout orders</div>;

  if (orders.length === 0) {
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  }

  return (
    <div>
      {orders.length === 0 ? <h1>No orders</h1> : <h1>Your orders</h1>}

      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <h2>Order Refrerence: {order.id}</h2>
            <span>Time: {new Date(order.createdDate).toString()}</span>
            <span>Total:{formatPrice(order.amount)}</span>
            <div>{order.status}</div>
            <div>
              {order.products.map((product) => (
                <div key={product.id}>
                  <span>{product.name}</span>
                  {/* @ts-ignore */}
                  <Image height={100} width={100} src={product.image} alt="." />
                  <span>{formatPrice(product.unit_amount)}</span>
                  <span>Quantity: {product.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
