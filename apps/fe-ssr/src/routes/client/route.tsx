import { createFileRoute, Link } from "@tanstack/react-router";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/client")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = trpc.hello.useQuery({ name: "Client" });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
      <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border border-zinc-700">
        <h1 className="text-2xl mb-4 font-bold">Client-Side tRPC Demo</h1>
        <p className="text-zinc-400 mb-6">
          This demo calls the backend tRPC{" "}
          <code className="bg-zinc-800 px-1 rounded">hello</code> handler from
          the client using React Query.
        </p>

        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
          <div className="text-sm text-zinc-400 mb-1">Response:</div>
          {isLoading ? (
            <div className="text-zinc-400">Loading...</div>
          ) : error ? (
            <div className="text-red-400">{error.message}</div>
          ) : (
            <div className="text-xl text-blue-400">{data?.greeting}</div>
          )}
        </div>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-green-500/10 border border-green-500/50 text-green-400 hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] rounded-lg font-mono uppercase tracking-wider transition-all duration-300"
        >
          [ Return to Server Mode ]
        </Link>
      </div>
    </div>
  );
}
