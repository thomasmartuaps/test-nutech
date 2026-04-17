import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import "./popUp.css";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  mode: "success" | "error" | "confirmation";
  menuName: "topup" | "transaction";
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
              src={mode === "success" ? "success" : ""}
              alt={mode === "success" ? "Success" : "Error"}
              className="popup-icon"
            />
          </div>

          {/* Content */}
          <div className="popup-content">
            <h2 className="popup-title">
              {mode === "confirmation" && menuName === "topup"
                ? `Anda yakin untuk top up sebesar`
                : menuName === "transaction"
                  ? `Beli ${serviceName} sebesar`
                  : null}
              {mode !== "confirmation" && menuName === "topup"
                ? `Top Up sebesar`
                : menuName === "transaction"
                  ? `Transaksi ${serviceName} sebesar`
                  : null}
            </h2>

            <p className="popup-amount">{`Rp${amount}`}</p>
            {mode !== "confirmation" && (
              <p className="popup-message">
                {mode === "success" ? "berhasil!" : "gagal"}
              </p>
            )}
          </div>

          {/* Footer Link */}
          <div className="popup-footer">
            {mode === "confirmation" ? (
              <>
                <button
                  className="popup-button confirm"
                  onClick={handleConfirm}
                >
                  Ya, lanjutkan {menuName === "topup" ? "Top Up" : `Bayar`}
                </button>
                <button className="popup-button confirm" onClick={onClose}>
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
