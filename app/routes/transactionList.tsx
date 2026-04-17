import type { Route } from "./+types/home";
import ProtectedRoute from "~/components/auth/protectedRoute";
import TransactionList from "~/views/transactionList/transactionList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <TransactionList />
    </ProtectedRoute>
  );
}
