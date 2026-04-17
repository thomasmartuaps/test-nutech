import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import token from "~/utils/token";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const tokenValue = token.get();
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenValue) {
      navigate("/"); // Redirect to home page if user is logged in
    }
  }, [tokenValue, navigate]);

  return <>{children}</>;
};

export default PublicRoute;
