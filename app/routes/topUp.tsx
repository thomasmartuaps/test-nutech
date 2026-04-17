import type { Route } from "./+types/home";
import TopUp from "~/views/topUp/topUp";
import ProtectedRoute from "~/components/auth/protectedRoute";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <TopUp />
    </ProtectedRoute>
  );
}
