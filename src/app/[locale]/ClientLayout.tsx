"use client";
import React, { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import localforage from "localforage";
import { Loader } from "lucide-react"; // Your custom loader component

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);

      const persister = createAsyncStoragePersister({
        storage: localforage,
      });

      persistQueryClient({
        queryClient,
        persister,
        maxAge: 1000 * 60 * 60 * 24,
      });
    }
  }, [queryClient]);

  // Only render the layout when client-side is confirmed
  if (!isClient) return null;

  // Detect if queries are fetching
  const isFetching = queryClient.isFetching();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Show your custom loader if any queries are fetching */}
      {isFetching ? (
          <Loader />
      ) : (
        children
      )}
      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default ClientLayout;
