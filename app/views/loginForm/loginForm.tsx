import React, { useEffect, useState } from "react";
import "./register.css";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { useNavigate } from "react-router";
import tokenUtils from "~/utils/token";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.users.loginErrorMessage);
  const navigate = useNavigate();
  const [token, setToken] = useState(tokenUtils.get());

  useEffect(() => {
    const handler = () =>
      token !== tokenUtils.get() && setToken(tokenUtils.get());
    window.addEventListener("storage", handler);
    () => window.removeEventListener("storage", handler);
  }, [token, setToken]);

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
    console.log(emailEmpty, passwordEmpty);
    console.log("CHECK IF EMAIL AND PASSWORD EMPTY FLAG CHANGED");
  }, [emailEmpty, passwordEmpty]);

  useEffect(() => {
    console.log("Token value changed:", token);
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="registration-container">
      {/* Left Section - Form */}
      <div className="form-section">
        <div className="form-header">
          <div className="logo">
            <span className="logo-icon"></span>
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
            belum punya akun? registrasi <a href="/">di sini</a>
          </p>
          <text className={`error-message ${loginError ? "visible" : ""}`}>
            {loginError}
          </text>
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

export default Login;
