import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import "./genericPopUp.css";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "success" | "error" | "other";
  title: string;
  message?: string;
  onConfirm?: () => void;
}

const GenericPopUp = ({
  isOpen,
  onClose,
  mode,
  title,
  message,
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
          {mode !== "other" ? (
            <div className="popup-icon-wrapper">
              <img
                src={
                  mode === "success"
                    ? "https://cdn-icons-png.flaticon.com/512/845/845646.png"
                    : "https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
                }
                alt={mode === "success" ? "Success" : "Error"}
                className="popup-icon"
              />
            </div>
          ) : null}

          {/* Content */}
          <div className="popup-content">
            <h2 className="popup-title">{`${title}`}</h2>
          </div>

          <div>
            <p className="popup-message">{message}</p>
          </div>

          {/* Footer Link */}
          <div className="popup-footer">
            <button className="popup-link grey" onClick={onClose}>
              Kembali
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default GenericPopUp;
