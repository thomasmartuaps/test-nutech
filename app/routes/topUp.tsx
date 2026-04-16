import type { Route } from "./+types/home";
import token from "~/utils/token";
import { useNavigate } from "react-router";
import TopUp from "~/views/topUp/topUp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  const isLoggedIn = !!token.get();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    throw navigate("/login"); // Redirect to login page if user is not logged in
  }
  return <TopUp />;
}
