import "./global.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/hydrate";
import Navbar from "./components/navbar";

export const metadata = {
  title: "Bogetta",
  description:
    "This is an e-commerce website that specializes in selling sunglasses. The website is built using Next.js, a popular JavaScript framework for building server-side rendered React applications. Customers can browse through a wide selection of stylish and high-quality sunglasses, and make purchases securely through the website. The website is optimized for fast load times and a smooth user experience.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Hydrate>
        {/* @ts-ignore */}
        <Navbar user={session?.user} />
        {children}
      </Hydrate>
    </html>
  );
}
