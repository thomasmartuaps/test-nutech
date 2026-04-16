import React from "react";
import "./register.css";

const Login: React.FC = () => {
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
            placeholder="masukkan email anda"
            className="form-input"
          />
          <input
            type="password"
            placeholder="masukkan password anda"
            className="form-input"
          />
          <button type="submit" className="submit-button">
            Masuk
          </button>
          <p className="login-link">
            belum punya akun? registrasi <a href="/login">di sini</a>
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

export default Login;
