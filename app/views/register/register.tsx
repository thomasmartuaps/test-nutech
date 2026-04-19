import React, { useEffect, useState } from "react";
import "./register.css";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import illustrasiLogin from "~/assets/illustrasi-login.png";
import logo from "~/assets/logo.png";
import lock from "~/assets/lock.svg";
import person from "~/assets/person.svg";
import lockError from "~/assets/lock_error.svg";
import PopUp from "~/components/popUp/popUp";
import { Link } from "react-router";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const registrationError = useAppSelector(
    (state) => state.users.regisErrorMessage,
  );

  const dispatch = useAppDispatch();
  const { isRegistrationSuccess } = useAppSelector((state) => state.users);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    // Submit the form data to the server or perform any actions needed
    if (id === "first_name") setFirstNameEmpty(false);
    if (id === "last_name") setLastNameEmpty(false);
    if (id === "email") setEmailEmpty(false);
    if (id === "password") setPasswordEmpty(false);
    setFormData({
      ...formData,
      [id]: e.target.value ?? "",
    });
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const confirmPass = e.target.value === formData.password;
    setConfirmPassword(confirmPass);
    setConfirmPassInput(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isError = false;
    if (!formData.first_name) {
      setFirstNameEmpty(true);
      isError = true;
    }
    if (!formData.last_name) {
      setLastNameEmpty(true);
      isError = true;
    }
    if (!formData.email) {
      setEmailEmpty(true);
      isError = true;
    }
    if (!formData.password) {
      setPasswordEmpty(true);
      isError = true;
    }
    if (!confirmPassword) {
      return;
    }
    if (isError) {
      return;
    }
    dispatch({
      type: "CLEAR_REGIS_ERROR",
      payload: { data: formData },
    });
    dispatch({
      type: "REGISTRATION",
      payload: { data: formData },
    });
  };

  const handlePopUpClose = () => {
    setSuccessPopupOpen(false);
    dispatch({
      type: "CLEAR_REGISTRATION_SUCCESS",
      payload: {},
    });
  };

  useEffect(() => {
    if (formData.password) {
      const confirmPass = confirmPassInput === formData.password;
      setConfirmPassword(confirmPass);
    }
  }, [formData.password, setConfirmPassword, confirmPassInput]);

  useEffect(() => {
    if (isRegistrationSuccess) {
      setSuccessPopupOpen(true);
    }
  }, [isRegistrationSuccess, setSuccessPopupOpen]);

  const confirmPassInputError =
    confirmPassword || (!confirmPassword && confirmPassInput.length === 0);

  return (
    <div className="registration-container">
      {/* Left Section - Form */}
      <div className="form-section">
        <div className="form-header">
          <div className="logo">
            <img
              src={logo}
              alt="Registration illustration"
              className="illustration-image"
            />
            <span className="logo-text">SIMS PPOB</span>
          </div>
          <h1 className="form-title">Lengkapi data untuk membuat akun</h1>
        </div>

        <form className="form">
          <div
            className={`form-input-wrapper ${emailEmpty ? "input-error" : ""}`}
          >
            <span className="input-icon">@</span>
            <input
              type="email"
              id="email"
              placeholder="masukkan email anda"
              className={`form-input`}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`form-input-wrapper ${firstNameEmpty ? "input-error" : ""}`}
          >
            <span className="input-icon">
              <img src={person} />
            </span>
            <input
              type="text"
              id="first_name"
              placeholder="nama depan"
              className={`form-input`}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`form-input-wrapper ${lastNameEmpty ? "input-error" : ""}`}
          >
            <span className="input-icon">
              <img src={person} />
            </span>
            <input
              type="text"
              id="last_name"
              placeholder="nama belakang"
              className={`form-input`}
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`form-input-wrapper ${passwordEmpty ? "input-error" : ""}`}
          >
            <span className="input-icon">
              <img src={lock} />
            </span>

            <input
              type="password"
              id="password"
              placeholder="buat password"
              className={`form-input`}
              onChange={handleInputChange}
            />
            <span className="input-icon">👁</span>
          </div>
          <div
            className={`form-input-wrapper ${confirmPassInputError ? "" : "input-error"}`}
          >
            <span className="input-icon">
              {confirmPassInputError ? (
                <img src={lock} />
              ) : (
                <img src={lockError} />
              )}
            </span>
            <input
              type="password"
              placeholder="konfirmasi password"
              className={`form-input `}
              onChange={handleConfirmPasswordChange}
            />
            <span className="input-icon">👁</span>
          </div>
          <text
            className={`error-message ${confirmPassInputError ? "" : "visible"}`}
          >
            password tidak sama
          </text>
          <button
            type="button"
            className={`submit-button ${confirmPassInputError ? "" : "disabled"}`}
            onClick={handleSubmit}
            disabled={!confirmPassword}
          >
            Daftar
          </button>
          <text
            className={`error-message center ${registrationError ? "visible" : ""}`}
          >
            {registrationError}
          </text>
          <p className="login-link">
            sudah punya akun? login <Link to="/login">di sini</Link>
          </p>
        </form>
      </div>

      <PopUp
        isOpen={successPopupOpen}
        onClose={handlePopUpClose}
        amount={""}
        mode={isRegistrationSuccess ? "success" : "error"}
        menuName={"registration"}
      />

      {/* Right Section - Illustration */}
      <div className="illustration-section">
        <img
          src={illustrasiLogin}
          alt="Registration illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default Register;
