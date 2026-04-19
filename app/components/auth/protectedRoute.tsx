import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import token from "~/utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const tokenValue = token.get();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.users.profile);

  useEffect(() => {
    if (!tokenValue) {
      navigate("/login");
      return; // Redirect to login page if user is not logged in
    }
  }, [tokenValue, navigate]);

  useEffect(() => {
    if (tokenValue && !userProfile) {
      dispatch({
        type: "FETCH_PROFILE",
        payload: {},
      });
    }
  }, [tokenValue, userProfile, dispatch]);

  return userProfile ? <>{children}</> : null;
};

export default ProtectedRoute;
