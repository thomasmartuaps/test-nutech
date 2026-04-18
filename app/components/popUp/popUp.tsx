import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import "./popUp.css";
import logo from "~/assets/logo.png";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  mode: "success" | "error" | "confirmation";
  menuName: "topup" | "transaction" | "registration";
  serviceName?: string;
  onConfirm?: () => void;
}

const PopUp = ({
  isOpen,
  onClose,
  amount,
  mode,
  menuName,
  serviceName,
  onConfirm,
}: PopUpProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="topup-popup-dialog">
      <DialogBackdrop className="topup-popup-backdrop" />

      <div className="topup-popup-container">
        <DialogPanel className="topup-popup-panel">
          {/* Icon */}
          <div className="popup-icon-wrapper">
            <img
              src={
                mode === "confirmation"
                  ? logo
                  : mode === "success"
                    ? "https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    : "https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
              }
              alt={mode === "success" ? "Success" : "Error"}
              className="popup-icon"
            />
          </div>

          {/* Content */}
          <div className="popup-content">
            <h2 className="popup-title">
              {mode === "confirmation" && menuName === "topup"
                ? `Anda yakin untuk top up sebesar`
                : mode === "confirmation" && menuName === "transaction"
                  ? `Beli ${serviceName} sebesar`
                  : null}
              {mode !== "confirmation" && menuName === "topup"
                ? `Top Up sebesar`
                : menuName === "transaction"
                  ? `Transaksi ${serviceName} sebesar`
                  : null}
              {menuName === "registration" ? "registrasi sukses" : null}
            </h2>

            {menuName !== "registration" ? (
              <div>
                <p className="popup-amount">{`Rp${new Intl.NumberFormat(
                  "de-DE",
                ).format(parseInt(amount))}`}</p>
                {mode !== "confirmation" && (
                  <p className="popup-message">
                    {mode === "success" ? "berhasil!" : "gagal"}
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {/* Footer Link */}
          <div className="popup-footer">
            {menuName === "registration" ? (
              <a href="/login" className="popup-link">
                Menuju ke login
              </a>
            ) : mode === "confirmation" ? (
              <>
                <button className="popup-link confirm" onClick={handleConfirm}>
                  Ya, lanjutkan {menuName === "topup" ? "Top Up" : `Bayar`}
                </button>
                <button className="popup-link grey" onClick={onClose}>
                  Batalkan
                </button>
              </>
            ) : (
              <a href="/" className="popup-link">
                Kembali ke Beranda
              </a>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PopUp;
