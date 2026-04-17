import type { Route } from "./+types/login";
import Register from "~/views/register/register";
import PublicRoute from "~/components/auth/publicRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Login() {
  return (
    <PublicRoute>
      <Register />
    </PublicRoute>
  );
}
