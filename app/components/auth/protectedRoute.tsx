import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import token from "~/utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenValue = token.get();
    if (tokenValue) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [setIsLoggedIn, setIsLoading]);

  if (isLoading) {
    return null;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if user is not logged in
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoute;
