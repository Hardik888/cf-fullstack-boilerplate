import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createServerTRPCClient } from "@/utils/server-trpc";

const fetchHello = createServerFn({ method: "GET" })
  .inputValidator((name: string) => name)
  .handler(async ({ data: name }) => {
    const trpc = createServerTRPCClient();
    return trpc.hello.query({ name });
  });

export const Route = createFileRoute("/")({
  component: App,
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
      <div className="p-8 rounded-xl bg-red-500/10 border border-red-500/50">
        <h1 className="text-xl font-bold text-red-400 mb-2">Error</h1>
        <p className="text-red-300">{error.message}</p>
      </div>
    </div>
  ),
  loader: () => fetchHello({ data: "Hardik" }),
});

function App() {
  const { greeting } = Route.useLoaderData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border border-zinc-700">
        <h1 className="text-2xl mb-4 font-bold">Server-Side tRPC Demo</h1>
        <p className="text-zinc-400 mb-6">
          This demo calls the backend tRPC{" "}
          <code className="bg-zinc-800 px-1 rounded">hello</code> handler from a
          server function with SSR support.
        </p>

        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="text-sm text-zinc-400 mb-1">Response:</div>
          <div className="text-xl text-green-400">{greeting}</div>
        </div>

        <Link
          to="/client"
          className="mt-6 inline-block px-6 py-3 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] rounded-lg font-mono uppercase tracking-wider transition-all duration-300"
        >
          [ Enter Client Mode ]
        </Link>
      </div>
    </div>
  );
}
