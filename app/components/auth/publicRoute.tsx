import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import token from "~/utils/token";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const tokenValue = token.get();
    if (tokenValue) {
      setIsLoggedIn(true);
      handleRedirectToHome();
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [setIsLoggedIn, setIsLoading]);

  const handleRedirectToHome = () => {
    navigate("/"); // Redirect to home page if user is logged in
  };

  if (isLoading) {
    return null;
  }

  return !isLoggedIn ? <>{children}</> : null;
};

export default PublicRoute;
