import React from "react";
import "./register.css";

const Register: React.FC = () => {
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
            type="text"
            placeholder="Nama lengkap"
            className="form-input"
          />
          <input type="email" placeholder="Email" className="form-input" />
          <input
            type="tel"
            placeholder="Nomor telepon"
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
          />
          <input
            type="password"
            placeholder="Konfirmasi password"
            className="form-input"
          />
          <button type="submit" className="submit-button">
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
