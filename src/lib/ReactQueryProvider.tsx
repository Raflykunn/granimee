"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {} from "@tanstack/react-query-persist-client";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 720 * 60 * 1000, // Data dianggap fresh selama 1 menit
            gcTime: 720 * 60 * 1000, // Cache disimpan selama 5 menit
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
