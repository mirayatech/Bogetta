import Navbar from "@/components/Navbar";
import "./globals.css";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "@/components/Hydrate";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="p-6 bg-light">
        <Hydrate>
          <Navbar user={session?.user} expires={session?.expires} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
