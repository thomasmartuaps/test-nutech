import type { Route } from "./+types/home";
import { Welcome } from "../views/welcome/welcome";
import Register from "~/views/register/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  return <Register />;
}
