import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./css/addtransaction.css";

const AddTransaction = () => {
  const { username } = useParams(); // ✅ Get username from URL
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    account_id: "",
    // transactionId: "",
    transaction_amount: "",
    transaction_type: "deposit",
    transaction_date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: name === "transaction_amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "Submitting transaction:",
      JSON.stringify(transaction, null, 2)
    );

    if (
      !transaction.account_id ||
      !transaction.transaction_type ||
      transaction.transaction_amount < 0
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    try {
      await api.post(
        `http://localhost:8080/api/v1/transactions`,
        { ...transaction, username },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Transaction done successfully!");
      navigate(`/users/${username}`);
    } catch (error) {
      console.error(
        "Error adding transaction:",
        error.response?.data || error.message
      );
      alert(
        "Failed to add transaction. Please check the console for more details."
      );
    }
  };

  return (
    <div className="content-acc-container">
      <h2 className="add-transaction-h2">New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-transaction">
          <div className="add-transaction-content">
            <label htmlFor="transaction_type">Transaction Type:</label>
            <select
              id="transaction_type"
              name="transaction_type"
              value={transaction.transaction_type}
              onChange={handleChange}
              required
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </div>
          <div className="add-transaction-content">
            <label htmlFor="account_id">Account ID:</label>
            <input
              type="text"
              id="account_id"
              name="account_id"
              value={transaction.account_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-transaction-content">
            <label htmlFor="transaction_amount">Amount:</label>
            <input
              type="number"
              id="transaction_amount"
              name="transaction_amount"
              value={transaction.transaction_amount}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-transaction">Send Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
