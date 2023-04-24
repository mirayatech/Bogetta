"use client";

import { ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for Next.js rehydration to complete before rendering children
    setIsHydrated(true);
  }, []);

  return isHydrated ? <>{children}</> : <img src="/loading.gif" />;
}

/* This code ensures that the client and server render always matching.
For example, if a variable is false on the client, it will also be false on the server.
This is works by waiting for Next.js rehydration to complete before rendering the children. */
