import type { Route } from "./+types/login";
import token from "~/utils/token";
import { useNavigate } from "react-router";
import Register from "~/views/register/register";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Login() {
  const isLoggedIn = !!token.get();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home page if user is already logged in
    }
  }, [isLoggedIn, navigate]);
  return <Register />;
}
