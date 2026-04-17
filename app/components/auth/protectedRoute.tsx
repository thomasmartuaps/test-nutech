import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import token from "~/utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const tokenValue = token.get();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const tokenValue = token.get();
  //   if (tokenValue) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  useEffect(() => {
    console.log("ProtectedRoute - isLoggedIn changed:", token);
    if (!tokenValue) {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [tokenValue, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
