"use client";
import React, { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import { fetchAboutData } from "@/lib/fetchUtils";
import AboutHeader from "@/components/about/about-header/AboutHeader";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create the QueryClient once and persist it across renders
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    });

    // Create a persister using localforage (for async storage)
    const persister = createAsyncStoragePersister({
      storage: localforage,
    });

    // Set up cache persistence
    persistQueryClient({
      queryClient: client,
      persister,
      maxAge: 1000 * 60 * 60 * 24, // Only persist cache for 24 hours
    });

    return client;
  });

  // Wrap the entire component in QueryClientProvider
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
