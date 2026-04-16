import LoginForm from "~/views/loginForm/loginForm";
import type { Route } from "./+types/login";
import token from "~/utils/token";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SIMS PPOB-Thomas Martua Parlindungan" },
    { name: "description", content: "take home test for nutech" },
  ];
}

export default function Login() {
  const isLoggedIn = !!token.get(); // Replace with actual authentication logic

  if (!isLoggedIn) {
    throw redirect("/"); // Redirect to home page if user is already logged in
  }
  return <LoginForm />;
}
