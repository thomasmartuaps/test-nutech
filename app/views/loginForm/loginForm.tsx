import React, { useEffect, useState } from "react";
import "./loginForm.css";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import illustrasiLogin from "~/assets/illustrasi-login.png";
import logo from "~/assets/logo.png";
import { Link } from "react-router";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.users.loginErrorMessage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    // Submit the form data to the server or perform any actions needed
    setFormData({
      ...formData,
      [id]: e.target.value ?? "",
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let error = false;
    if (!formData.email) {
      setEmailEmpty(true);
      error = true;
    }
    if (!formData.password) {
      setPasswordEmpty(true);
      error = true;
    }
    if (!error) {
      setEmailEmpty(false);
      setPasswordEmpty(false);
      dispatch({
        type: "LOGIN",
        payload: { data: formData },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch({
      type: "CLEAR_REGISTRATION_SUCCESS",
      payload: {},
    });
  }, [dispatch]);

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
          <h1 className="form-title">Masuk atau buat akun untuk memulai</h1>
        </div>

        <form className="form">
          <input
            type="email"
            id="email"
            placeholder="masukkan email anda"
            className={`${emailEmpty ? "input-error" : ""} form-input`}
            onChange={handleInputChange}
          />
          <input
            type="password"
            id="password"
            placeholder="masukkan password anda"
            className={`${passwordEmpty ? "input-error" : ""} form-input`}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="submit-button"
            onClick={handleSubmit}
          >
            Masuk
          </button>
          <p className="login-link">
            belum punya akun? registrasi <Link to="/register">di sini</Link>
          </p>
          <text className={`error-message ${loginError ? "visible" : ""}`}>
            {loginError}
          </text>
        </form>
      </div>

      {/* Right Section - Illustration */}
      <div className="illustration-section">
        <img
          src={illustrasiLogin}
          alt="Login illustration"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default Login;
