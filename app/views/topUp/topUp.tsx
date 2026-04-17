import React, { useState } from "react";
import "./topUp.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import PopUp from "~/components/popUp/popUp";

const TopUp = () => {
  const [topUpValue, setTopUpValue] = useState<string>("");
  const [confirmPopUpOpen, setConfirmPopUpOpen] = useState(false);
  const [successPopUpOpen, setSuccessPopUpOpen] = useState(false);

  const topUpOptions = [
    { id: "option-1", amount: 10000, label: "Rp10.000" },
    { id: "option-2", amount: 20000, label: "Rp20.000" },
    { id: "option-3", amount: 50000, label: "Rp50.000" },
    { id: "option-4", amount: 100000, label: "Rp100.000" },
    { id: "option-5", amount: 250000, label: "Rp250.000" },
    { id: "option-6", amount: 500000, label: "Rp500.000" },
  ];

  const dispatch = useAppDispatch();
  const { isTopUpSuccess } = useAppSelector((state) => state.transactions);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setTopUpValue(value);
    }
  };

  const handleOptionClick = (amount: number) => {
    setTopUpValue(amount.toString());
  };

  const handleTopUp = () => {
    setConfirmPopUpOpen(true);
  };

  const handleConfirmTopUp = () => {
    dispatch({
      type: "TOP_UP",
      payload: {
        amount: parseInt(topUpValue),
      },
    });
    setConfirmPopUpOpen(false);
  };

  const isTopUpDisabled = topUpValue.trim() === "";

  return (
    <Dashboard selectedMenu="top-up">
      <div className="topup-container">
        <div className="topup-left">
          <div className="topup-header">
            <p className="topup-subtitle">Silahkan masukan</p>
            <h1 className="topup-title">Nominal Top Up</h1>
          </div>

          <div className="topup-form">
            <input
              type="text"
              value={topUpValue}
              onChange={handleInputChange}
              placeholder="masukkan nominal top-up"
              className="topup-input"
            />

            <button
              onClick={handleTopUp}
              disabled={isTopUpDisabled}
              className={`topup-button ${isTopUpDisabled ? "disabled" : ""}`}
            >
              Top Up
            </button>
          </div>
        </div>

        <div className="topup-right">
          <div className="topup-options-grid">
            {topUpOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.amount)}
                className={`topup-option ${
                  topUpValue === option.amount.toString() ? "active" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <PopUp
          isOpen={confirmPopUpOpen}
          onClose={() => setConfirmPopUpOpen(false)}
          amount={topUpValue}
          mode={"confirmation"}
          menuName={"topup"}
          onConfirm={handleConfirmTopUp}
        />

        <PopUp
          isOpen={successPopUpOpen}
          onClose={() => setSuccessPopUpOpen(false)}
          amount={topUpValue}
          mode={isTopUpSuccess ? "success" : "error"}
          menuName={"topup"}
        />
      </div>
    </Dashboard>
  );
};

export default TopUp;
