import { useState } from "react";

import "./TransactionTable.css";

function TransactionTable({ transactions, loading }) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const currentTransactions = transactions.slice(startIndex, endIndex);

  const maskCard = (card) => {
    if (!card) return "";

    return `${card.slice(0, 6)}******${card.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="table-loader">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <h2 className="table-title">Transaction History</h2>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>

              <th>Card Number</th>

              <th>Email</th>

              <th>Expiry</th>

              <th>Created</th>

              <th>CVC</th>

              <th>Amount</th>

              <th>Currency</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentTransactions.map((item) => (
              <tr key={item.orderId}>
                <td>{item.orderId}</td>

                <td>{maskCard(item.cardNumber)}</td>

                <td>{item.email || "N/A"}</td>

                <td>
                  {item.expiryMonth}/{item.expiryYear}
                </td>

                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>***</td>

                <td>${Number(item.amount).toFixed(2)}</td>

                <td>{item.currency}</td>

                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionTable;
