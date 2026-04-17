import React, { useEffect } from "react";
import "./dashboard.css";
import type { ProfileData } from "~/types";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

interface DashboardProps {
  children: React.ReactNode;
  selectedMenu: "top-up" | "transaction" | "account" | "none";
}

const Dashboard = ({ children, selectedMenu }: DashboardProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.profile);
  const balance = useAppSelector((state) => state.transactions.balance);
  const [saldoVisible, setSaldoVisible] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      dispatch({
        type: "FETCH_PROFILE",
        payload: {},
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!balance) {
      dispatch({
        type: "FETCH_BALANCE",
      });
    }
  }, [dispatch, balance]);

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
              <h2 className="user-name">
                {user?.first_name + " " + user?.last_name || "User"}
              </h2>
            </div>
          </div>

          {/* Balance Card */}
          <div className="balance-card">
            <p className="balance-label">Saldo anda</p>
            {saldoVisible ? (
              <h3 className="balance-amount">Rp {balance?.toLocaleString()}</h3>
            ) : (
              <h3 className="balance-amount">Rp • • • • • • •</h3>
            )}
            <a
              href="#lihat-saldo"
              className="lihat-saldo"
              onClick={() => setSaldoVisible(!saldoVisible)}
            >
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
