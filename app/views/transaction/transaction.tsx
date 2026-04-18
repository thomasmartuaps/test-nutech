import React, { useEffect, useState } from "react";
import "./transaction.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import PopUp from "~/components/popUp/popUp";

const Transaction = () => {
  const [confirmPopUpOpen, setConfirmPopUpOpen] = useState(false);
  const [successPopUpOpen, setSuccessPopUpOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isTransactionSuccess, transactionErrorMessage } = useAppSelector(
    (state) => state.transactions,
  );
  const { activeService } = useAppSelector((state) => state.information);
  const {
    service_code: serviceCode,
    service_name: serviceName,
    service_icon: serviceIcon,
    service_tariff: amount,
  } = activeService || {};

  const handleTransaction = () => {
    setConfirmPopUpOpen(true);
  };

  const handleConfirmTransaction = () => {
    dispatch({
      type: "INITIATE_TRANSACTION",
      payload: {
        serviceCode,
      },
    });
    setConfirmPopUpOpen(false);
  };
  const handlePopUpClose = () => {
    setSuccessPopUpOpen(false);
    dispatch({ type: "CLEAR_TRANSACTION_SUCCESS", payload: {} });
    dispatch({ type: "CLEAR_TRANSACTION_ERROR", payload: {} });
  };

  useEffect(() => {
    if (isTransactionSuccess || transactionErrorMessage) {
      setSuccessPopUpOpen(true);
    }
  }, [isTransactionSuccess, transactionErrorMessage, dispatch]);

  return (
    <Dashboard selectedMenu="none">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <p className="payment-label">PemBayaran</p>
        </div>

        {/* Service Section */}
        <div className="service-section">
          <div className="service-info">
            <img src={serviceIcon} alt={serviceName} className="service-icon" />
            <h2 className="service-name">{serviceName}</h2>
          </div>
        </div>

        {/* Amount Input */}
        <div className="payment-form">
          <input
            type="text"
            value={`${amount ? amount.toString() : ""}`}
            readOnly
            className="payment-input"
          />

          {/* Pay Button */}
          <button onClick={handleTransaction} className="pay-button">
            Bayar
          </button>
        </div>
      </div>

      <PopUp
        isOpen={confirmPopUpOpen}
        onClose={() => setConfirmPopUpOpen(false)}
        amount={amount ? amount.toString() : ""}
        mode={"confirmation"}
        menuName={"transaction"}
        serviceName={serviceName}
        onConfirm={handleConfirmTransaction}
      />

      <PopUp
        isOpen={successPopUpOpen}
        onClose={handlePopUpClose}
        amount={amount ? amount.toString() : ""}
        mode={isTransactionSuccess ? "success" : "error"}
        menuName={"transaction"}
        serviceName={serviceName}
      />
    </Dashboard>
  );
};

export default Transaction;
