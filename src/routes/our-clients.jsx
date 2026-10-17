import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/our-clients")({
  beforeLoad: () => {
    throw redirect({ to: "/clients" });
  },
  component: () => null,
});
