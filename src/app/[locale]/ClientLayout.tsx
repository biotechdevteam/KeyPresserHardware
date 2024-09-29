"use client"; // This directive tells Next.js this is a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  // Instantiate QueryClient inside client-side component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
