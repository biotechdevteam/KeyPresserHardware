"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";

const AboutLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations("Header.about");
  const tf = useTranslations("footer");

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

  return (
    <QueryClientProvider client={queryClient}>
      <section className="min-h-screen bg-background text-foreground p-6">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-muted">{t("description")}</p>
        </header>
        <main>{children}</main>
        <footer>
          <div className="text-center mt-10 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {tf("copyright")}
          </div>
        </footer>
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AboutLayout;
