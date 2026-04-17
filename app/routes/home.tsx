import type { Route } from "./+types/home";
import HomePage from "../views/home/homepage";
import token from "~/utils/token";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Home() {
  const isLoggedIn = !!token.get();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [isLoggedIn, navigate]);
  return <HomePage />;
}
