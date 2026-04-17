import React, { useState } from "react";
import "./topUp.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import type { Banner, Service } from "~/types";
import { mockPromo, mockService } from "~/utils/mock";
import { useNavigate } from "react-router";

const TopUp = () => {
  const [topUpValue, setTopUpValue] = useState<string>("");

  const userProfile = useAppSelector((state) => state.users.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setTopUpValue(value);
    }
  };

  const handleOptionClick = (amount: number) => {
    setTopUpValue(amount.toString());
    dispatch({
      type: "SET_TOP_UP_AMOUNT",
      payload: {
        amount,
        navigate,
      },
    });
  };

  const handleTopUp = () => {
    if (topUpValue.trim() !== "") {
      console.log("Top Up Amount:", topUpValue);
      // Add top-up logic here
    }
  };

  const isTopUpDisabled = topUpValue.trim() === "";

  return (
    <Dashboard user={userProfile} selectedMenu="top-up">
      <></>
    </Dashboard>
  );
};

export default TopUp;
