import React, { useEffect } from "react";
import "./dashboard.css";
import defaultProfilePic from "~/assets/default-profile.png";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { NULL_PROFILE_PIC } from "~/utils/enum";
import logo from "~/assets/logo.png";
import { Link } from "react-router";

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
    if (!balance) {
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
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">
              <img src={logo} alt={"SIMS PPOB"} />
            </span>
            <span className="logo-text">SIMS PPOB</span>
          </Link>
          <div className="navbar-menu">
            <Link
              to="/top-up"
              className={selectedMenu === "top-up" ? "active" : ""}
            >
              Top Up
            </Link>
            <Link
              to="/transaction-list"
              className={selectedMenu === "transaction" ? "active" : ""}
            >
              Transaction
            </Link>
            <Link
              to="/account"
              className={selectedMenu === "account" ? "active" : ""}
            >
              Akun
            </Link>
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
              <button
                className="lihat-saldo"
                onClick={() => setSaldoVisible(!saldoVisible)}
              >
                Lihat Saldo 👁
              </button>
            </div>
          </section>
        ) : null}
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
