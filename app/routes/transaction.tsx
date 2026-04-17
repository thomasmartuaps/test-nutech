import type { Route } from "./+types/home";
import ProtectedRoute from "~/components/auth/protectedRoute";
import Transaction from "~/views/transaction/transaction";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <Transaction />
    </ProtectedRoute>
  );
}
