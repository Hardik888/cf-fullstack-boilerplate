import { trpc } from "@/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data, error } = trpc.hello.useQuery({ name: "Hardik" });
  return (
    <>
      {" "}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 to-black p-4 text-white">
        <div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border border-zinc-700">
          <h1 className="text-2xl mb-4 font-bold">Client-Side tRPC Demo</h1>
          <p className="text-zinc-400 mb-6">
            This demo calls the backend tRPC{" "}
            <code className="bg-zinc-800 px-1 rounded">hello</code> handler from
            a client function with SPA support.
          </p>

          <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
            <div className="text-sm text-zinc-400 mb-1">Response:</div>
            {error ? (
              <div className="text-red-400">{error.message}</div>
            ) : (
              <div className="text-xl text-green-400">{data?.greeting}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
