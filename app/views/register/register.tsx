import React, { useEffect, useState } from "react";
import "./register.css";
import { useAppDispatch } from "~/store/hooks";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [firstNameEmpty, setFirstNameEmpty] = useState(false);
  const [lastNameEmpty, setLastNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [formError, setFormError] = useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    // Submit the form data to the server or perform any actions needed
    setFormData({
      ...formData,
      [id]: e.target.value ?? "",
    });
    console.log(formData);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setConfirmPassword(e.target.value === formData.password);
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.first_name) {
      setFirstNameEmpty(true);
    }
    if (!formData.last_name) {
      setLastNameEmpty(true);
    }
    if (!formData.email) {
      setEmailEmpty(true);
    }
    if (!formData.password) {
      setPasswordEmpty(true);
    }
    if (!confirmPassword) {
      return;
    }
    dispatch({
      type: "REGISTRATION",
      payload: { ...formData },
    });
  };
  return (
    <div className="registration-container">
      {/* Left Section - Form */}
      <div className="form-section">
        <div className="form-header">
          <div className="logo">
            <span className="logo-icon"></span>
            <span className="logo-text">SIMS PPOB</span>
          </div>
          <h1 className="form-title">Lengkapi data untuk membuat akun</h1>
        </div>

        <form className="form">
          <input
            type="email"
            placeholder="masukkan email anda"
            className={`form-input ${emailEmpty ? "input-error" : ""}`}
            onChange={handleInputChange}
          />
          <text className={`error-message ${emailEmpty ? "" : "visible"}`}>
            email tidak boleh kosong
          </text>
          <input
            type="text"
            id="first_name"
            placeholder="nama depan"
            className={`form-input ${firstNameEmpty ? "input-error" : ""}`}
            onChange={handleInputChange}
          />
          <text className={`error-message ${firstNameEmpty ? "" : "visible"}`}>
            nama depan tidak boleh kosong
          </text>
          <input
            type="text"
            id="last_name"
            placeholder="nama belakang"
            className={`form-input ${lastNameEmpty ? "input-error" : ""}`}
            onChange={handleInputChange}
          />
          <text className={`error-message ${lastNameEmpty ? "" : "visible"}`}>
            nama belakang tidak boleh kosong
          </text>
          <input
            type="password"
            placeholder="buat password"
            className={`form-input ${passwordEmpty ? "input-error" : ""}`}
            onChange={handleInputChange}
          />
          <text className={`error-message ${passwordEmpty ? "" : "visible"}`}>
            password tidak boleh kosong
          </text>
          <input
            type="password"
            placeholder="konfirmasi password"
            className={`form-input ${confirmPassword ? "" : "input-error"}`}
            onChange={handleConfirmPasswordChange}
          />
          <text className={`error-message ${confirmPassword ? "" : "visible"}`}>
            password tidak sama
          </text>
          <button
            type="submit"
            className="submit-button"
            onSubmit={handleSubmit}
            disabled={!confirmPassword}
          >
            Daftar
          </button>
          <p className="login-link">
            sudah punya akun? login <a href="/login">di sini</a>
          </p>
        </form>
      </div>

      {/* Right Section - Illustration */}
      <div className="illustration-section">
        <img
          src=""
          alt="Registration illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default Register;
