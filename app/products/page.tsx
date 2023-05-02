import styles from "./styles.module.scss";
import Product from "@/app/components/Product/Product";
import Stripe from "stripe";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  const products = await stripe.products.list();

  /*
  - Use Promise.all() to fetch all product prices at once instead of fetching them one by one in a loop.
  - Instead of waiting for each price to be fetched before moving on to the next product.
   */
  const productWithPrices = await Promise.all(
    // Fetch the prices for each product by using products ID
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.features || ""; // extra futureasd for metadata
      return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description,
        currency: prices.data[0].currency,
        unit_amount: prices.data[0].unit_amount,
        metadata: { features },
      };
    })
  );

  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  return (
    <main className={styles.container}>
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}
