import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Toaster } from "sonner";
import superJSON from "superjson";
import { trpc } from "./trpc";
import { useState } from "react";
import { PostHogProvider } from "posthog-js/react";

/**
 * Providers component with SSR support
 * Uses useState to ensure client instances are created once per request
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const options = {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: "2025-11-30",
    person_profiles: "always",
  } as const;

  // Create QueryClient instance once per request
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 2,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            retry: (failureCount, error: any) => {
              if (error?.status >= 400 && error?.status < 500) return false;
              return failureCount < 2;
            },
          },
        },
      }),
  );

  // Create tRPC client instance once per request
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_BASE_DEVELOPMENT + "/trpc",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
          transformer: superJSON,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        {import.meta.env.VITE_POSTHOG_KEY ? (
          <PostHogProvider
            apiKey={import.meta.env.VITE_POSTHOG_KEY}
            options={options}
          >
            {children}
          </PostHogProvider>
        ) : (
          children
        )}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
