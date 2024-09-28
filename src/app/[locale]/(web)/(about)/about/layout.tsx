"use client";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import AboutHeader from "@/components/about/about-header/AboutHeader";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  // State to track if the code is running on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run this when on the client-side (window is available)
    if (typeof window !== "undefined") {
      setIsClient(true);

      const persister = createAsyncStoragePersister({
        storage: localforage,
      });

      // Set up cache persistence
      persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24, // Only persist cache for 24 hours
      });
    }
  }, [queryClient]);

  // Only render the persistence on the client side
  if (!isClient) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <header>
          {/* Render the AboutHeader */}
          <AboutHeader />
        </header>
        {/* Render the rest of the children below */}
        <main>{children}</main>
        <footer>{/* Render the AboutFooter if exist */}</footer>
      </section>
      {/* React Query Devtools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AboutLayout;
