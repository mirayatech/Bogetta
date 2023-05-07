import Stripe from "stripe";

import styles from "./index.module.css";

import getProducts from "@/util/getProduct";
import Container from "@/components/container";
import Product from "@/components/product";

export default async function Home() {
  const products = await getProducts();
  return (
    <Container>
      <main className={styles.container}>
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </main>
    </Container>
  );
}
