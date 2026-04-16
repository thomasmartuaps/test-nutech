import type { Route } from "./+types/home";
import Register from "~/views/register/register";
import HomePage from "../views/home/homepage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  const isLoggedIn = false; // Replace with actual authentication logic

  if (!isLoggedIn) {
    return <HomePage />;
  }
  return <Register />;
}
