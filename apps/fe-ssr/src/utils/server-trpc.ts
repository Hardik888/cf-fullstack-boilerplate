import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "backend/trpc";
import superjson from "superjson";

/**
 * Creates a server-side tRPC client with proper header forwarding for SSR
 *
 * @param headers - Optional headers to forward (e.g., cookies for authentication)
 * @returns tRPC client configured for server-side use
 *
 * @example
 * // In a server function:
 * const headers = getRequest().headers;
 * const serverTrpc = createServerTRPCClient({
 *   cookie: headers.get("Cookie") || "",
 * });
 *
 * const result = await serverTrpc.hello.query({ name: "World" });
 */
export const createServerTRPCClient = (headers?: Record<string, string>) => {
  const baseUrl = process.env.VITE_BASE_DEVELOPMENT || "http://localhost:4000";

  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${baseUrl}/trpc`,
        transformer: superjson,
        headers: () => {
          if (headers) {
            return {
              ...(headers.cookie ? { cookie: headers.cookie } : {}),
              ...(headers.authorization
                ? { authorization: headers.authorization }
                : {}),
            };
          }
          return {};
        },
      }),
    ],
  });
};
