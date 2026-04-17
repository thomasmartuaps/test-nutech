import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("top-up", "routes/topUp.tsx"),
  route("register", "routes/register.tsx"),
  route("edit-profile", "routes/editProfile.tsx"),
  route("transaction-list", "routes/transactionList.tsx"),
  route("transaction", "routes/transaction.tsx"),
] satisfies RouteConfig;
