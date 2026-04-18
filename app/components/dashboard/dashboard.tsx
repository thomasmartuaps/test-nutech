import React, { useEffect } from "react";
import "./dashboard.css";
import defaultProfilePic from "~/assets/default-profile.png";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { NULL_PROFILE_PIC } from "~/utils/enum";

interface DashboardProps {
  children: React.ReactNode;
  selectedMenu: "top-up" | "transaction" | "account" | "none";
}

const Dashboard = ({ children, selectedMenu }: DashboardProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.profile);
  const balance = useAppSelector((state) => state.transactions.balance);
  const [saldoVisible, setSaldoVisible] = React.useState(false);
  const profileImage =
    user?.profile_image && user.profile_image !== NULL_PROFILE_PIC
      ? user.profile_image
      : defaultProfilePic;

  React.useEffect(() => {
    if (!user) {
      dispatch({
        type: "FETCH_PROFILE",
        payload: {},
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Dashboard - balance changed:", balance);
    if (!balance) {
      console.log("Balance is empty, dispatching GET_BALANCE");
      dispatch({
        type: "GET_BALANCE",
        payload: {},
      });
    }
  }, [dispatch, balance]);

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/" className="logo-link">
              <span className="logo-icon">●</span>
              <span className="logo-text">SIMS PPOB</span>
            </a>
          </div>
          <div className="navbar-menu">
            <a
              href="/top-up"
              className={selectedMenu === "top-up" ? "active" : ""}
            >
              Top Up
            </a>
            <a
              href="/transaction-list"
              className={selectedMenu === "transaction" ? "active" : ""}
            >
              Transaction
            </a>
            <a
              href="/account"
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
        {selectedMenu !== "account" ? ( // dashboard doesn't need the profile section when inside account view
          <section className="profile-section">
            <div className="profile-card">
              <img
                src={profileImage}
                alt="User Avatar"
                className="profile-avatar"
              />
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
                <h3 className="balance-amount">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(balance) || 0)}
                </h3>
              ) : (
                <h3 className="balance-amount">Rp • • • • • • •</h3>
              )}
              <a
                href="#"
                className="lihat-saldo"
                onClick={() => setSaldoVisible(!saldoVisible)}
              >
                Lihat Saldo 👁
              </a>
            </div>
          </section>
        ) : null}
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
