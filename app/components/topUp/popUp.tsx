import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import "./TopUpPopup.css";

interface TopUpPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  isSuccess: boolean;
}

const TopUpPopup = ({
  isOpen,
  onClose,
  amount,
  isSuccess,
}: TopUpPopupProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="topup-popup-dialog">
      <DialogBackdrop className="topup-popup-backdrop" />

      <div className="topup-popup-container">
        <DialogPanel className="topup-popup-panel">
          {/* Icon */}
          <div className="popup-icon-wrapper">
            <img
              src={isSuccess ? "" : ""}
              alt={isSuccess ? "Success" : "Error"}
              className="popup-icon"
            />
          </div>

          {/* Content */}
          <div className="popup-content">
            <h2 className="popup-title">
              {isSuccess ? "Top Up sebesar" : "Top Up Gagal"}
            </h2>

            <p className="popup-amount">{isSuccess ? `Rp${amount}` : ""}</p>

            <p className={`popup-message ${isSuccess ? "success" : "error"}`}>
              {isSuccess ? "berhasil!" : "Transaksi gagal"}
            </p>
          </div>

          {/* Footer Link */}
          <div className="popup-footer">
            <a href="/" className="popup-link">
              Kembali ke Beranda
            </a>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TopUpPopup;
