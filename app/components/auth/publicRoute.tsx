import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import token from "~/utils/token";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const tokenValue = token.get();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.users.profile);

  useEffect(() => {
    if (userProfile) {
      navigate("/"); // Redirect to home page if user is logged in
    }
  }, [userProfile, navigate]);

  useEffect(() => {
    if (tokenValue && !userProfile) {
      dispatch({
        type: "FETCH_PROFILE",
        payload: {},
      });
    }
  }, [tokenValue, userProfile, dispatch]);

  return <>{children}</>;
};

export default PublicRoute;
