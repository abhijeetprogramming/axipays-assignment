import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar/Navbar";

import TransactionTable from "../components/TransactionTable/TransactionTable";

import StatusChart from "../components/Charts/StatusChart";

import VolumeChart from "../components/Charts/VolumeChart";

import CurrencyChart from "../components/Charts/CurrencyChart";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "https://payment-assignment.onrender.com/transactions?page=1&limit=100",
      );

      setTransactions(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalTransactions = transactions.length;

  const successTransactions = transactions.filter(
    (item) => item.status === "success",
  );

  const failedTransactions = transactions.filter(
    (item) => item.status === "failed" || item.status === "pending",
  );

  const successVolume = successTransactions.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        {/* <h1 className="dashboard-title">Dashboard</h1> */}

        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total Transactions</h3>

            <p>{totalTransactions}</p>
          </div>

          <div className="summary-card">
            <h3>Success Volume</h3>

            <p>${successVolume.toFixed(2)}</p>
          </div>

          <div className="summary-card">
            <h3>Success Count</h3>

            <p>{successTransactions.length}</p>
          </div>

          <div className="summary-card">
            <h3>Failed + Pending</h3>

            <p>{failedTransactions.length}</p>
          </div>
        </div>

        <div className="chart-grid">
          <StatusChart transactions={transactions} />

          <VolumeChart transactions={transactions} />

          <CurrencyChart transactions={transactions} />
        </div>

        <TransactionTable transactions={transactions} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;
