import { trpc } from "@/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data } = trpc.hello.useQuery({ name: "Hardik" });
  return <>{data}</>;
}
