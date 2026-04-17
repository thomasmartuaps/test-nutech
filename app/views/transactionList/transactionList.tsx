import React, { useEffect, useState } from "react";
import "./transactionList.css";
import Dashboard from "~/components/dashboard/dashboard";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const limit = 5; // Number of transactions to fetch per page

const TopUp = () => {
  const transactionList = useAppSelector(
    (state) => state.transactions.transactions,
  );

  const [offset, setOffset] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch transactions from the server or use mock data
    dispatch({
      type: "FETCH_TRANSACTIONS",
    });
  }, [dispatch]);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    dispatch({
      type: "FETCH_TRANSACTIONS",
      payload: {
        offset: newOffset,
        limit,
      },
    });
  };

  return (
    <Dashboard selectedMenu="transaction">
      <div className="all-transactions-container">
        <h2 className="transactions-title">Semua Transaksi</h2>

        <div className="transactions-list">
          {transactionList.length > 0 ? (
            transactionList.map((transaction) => (
              <div
                key={transaction.invoice_number}
                className="transaction-card"
              >
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
            ))
          ) : (
            <p className="no-transactions">Belum ada transaksi.</p>
          )}
        </div>

        <div className="show-more-container">
          <button onClick={handleShowMore} className="show-more-button">
            Show more
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default TopUp;
