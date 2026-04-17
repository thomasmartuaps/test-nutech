import React, { useState } from "react";
import "./topUp.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import type { Transaction } from "~/types";

const TopUp = () => {
  const userProfile = useAppSelector((state) => state.users.profile);

  const [displayedTransactions, setDisplayedTransactions] = useState<number>(5);

  const mockTransactions: Transaction[] = [
    {
      invoice_number: "INV17082023-001",
      total_amount: 10000,
      transaction_type: "topup",
      description: "Top Up Saldo",
      created_on: "17 Agustus 2023",
    },
    {
      invoice_number: "INV17082023-002",
      total_amount: 40000,
      transaction_type: "payment",
      description: "Pulsa Prabayar",
      created_on: "17 Agustus 2023",
    },
    {
      invoice_number: "INV17082023-003",
      total_amount: 75000,
      transaction_type: "payment",
      description: "Listrik Pascabayar",
      created_on: "17 Agustus 2023",
    },
    {
      invoice_number: "INV17082023-004",
      total_amount: 50000,
      transaction_type: "topup",
      description: "Top Up Saldo",
      created_on: "17 Agustus 2023",
    },
    {
      invoice_number: "INV17082023-005",
      total_amount: 50000,
      transaction_type: "topup",
      description: "Top Up Saldo",
      created_on: "17 Agustus 2023",
    },
  ];

  const handleShowMore = () => {
    // Function body to be implemented
  };

  const visibleTransactions = mockTransactions.slice(0, displayedTransactions);
  const hasMoreTransactions = displayedTransactions < mockTransactions.length;

  return (
    <Dashboard user={userProfile} selectedMenu="top-up">
      <div className="all-transactions-container">
        <h2 className="transactions-title">Semua Transaksi</h2>

        <div className="transactions-list">
          {visibleTransactions.map((transaction) => (
            <div key={transaction.invoice_number} className="transaction-card">
              <div className="transaction-left">
                <div
                  className={`transaction-amount ${transaction.transaction_type === "topup" ? "topup" : "payment"}`}
                >
                  {transaction.transaction_type === "topup" ? "+" : "-"} Rp
                  {transaction.total_amount.toLocaleString("id-ID")}
                </div>
                <div className="transaction-datetime">
                  {new Date(transaction.created_on).toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "long",
                    },
                  )}
                </div>
              </div>

              <div className="transaction-right">
                <div className="transaction-description">
                  {transaction.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreTransactions && (
          <div className="show-more-container">
            <button onClick={handleShowMore} className="show-more-button">
              Show more
            </button>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default TopUp;
