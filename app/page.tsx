import Product from "@/components/Product";
import Stripe from "stripe";

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  const products = await stripe.products.list();
  console.log(products);

  /*
  - Use Promise.all() to fetch all product prices at once instead of fetching them one by one in a loop.
  - Instead of waiting for each price to be fetched before moving on to the next product.
   */
  const productWithPrices = await Promise.all(
    // Fetch the prices for each product by using products ID
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        price: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
      };
    })
  );

  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <main className="grid grid-cols-fluid gap-y-10 gap-x-5">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}
