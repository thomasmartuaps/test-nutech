import React from "react";
import "./dashboard.css";
import type { ProfileData } from "~/types";

interface DashboardProps {
  children: React.ReactNode;
  user: ProfileData | null;
  selectedMenu: string;
}

const Dashboard = ({ children, user, selectedMenu }: DashboardProps) => {
  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-icon">●</span>
            <span className="logo-text">SIMS PPOB</span>
          </div>
          <div className="navbar-menu">
            <a
              href="#top-up"
              className={selectedMenu === "top-up" ? "active" : ""}
            >
              Top Up
            </a>
            <a
              href="#transaction"
              className={selectedMenu === "transaction" ? "active" : ""}
            >
              Transaction
            </a>
            <a
              href="#account"
              className={selectedMenu === "account" ? "active" : ""}
            >
              Akun
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* User Profile Section */}
        <section className="profile-section">
          <div className="profile-card">
            <img src="" alt="User Avatar" className="profile-avatar" />
            <div className="profile-info">
              <p className="greeting">Selamat datang,</p>
              <h2 className="user-name">Kristanto Wibowo</h2>
            </div>
          </div>

          {/* Balance Card */}
          <div className="balance-card">
            <p className="balance-label">Saldo anda</p>
            <h3 className="balance-amount">Rp • • • • • • •</h3>
            <a href="#lihat-saldo" className="lihat-saldo">
              Lihat Saldo 👁
            </a>
          </div>
        </section>

        {children}
      </main>
    </div>
  );
};

export default Dashboard;
