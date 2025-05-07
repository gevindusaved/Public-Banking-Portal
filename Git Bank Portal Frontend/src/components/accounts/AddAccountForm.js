import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./css/addaccountoform.css";

const AddAccountForm = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    userInformationId: "",
    balance: "",
    account_type: "savings",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account.account_type || account.balance < 0) {
      //!account.accountId ||
      alert("Please enter valid account details.");
      return;
    }

    try {
      await api.post("http://localhost:8080/api/v1/accounts", {
        ...account,
        username,
      });
      alert("Account added successfully!");
      navigate(`/users/${username}`);
    } catch (error) {
      console.error(
        "Error adding account:",
        error.response?.data || error.message
      );
      alert(error.response?.data || "Failed to add account. Please try again.");
    }
  };

  return (
    <div className="content-acc-container">
      <h2 className="add-account-h2">Add New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-account-form">
          <div className="add-account-content">
            <label htmlFor="account_type">User Id:</label>
            <input
              type="text"
              id="userInformationId"
              name="userInformationId"
              value={account.userInformationId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="add-account-content">
            <label htmlFor="account_type">Account Type:</label>
            <select
              id="account_type"
              name="account_type"
              value={account.account_type}
              onChange={handleChange}
              required
            >
              <option value="savings">Savings</option>
              <option value="fixed deposits">Fixed Deposit</option>
            </select>
          </div>

          <div className="add-account-content">
            <label htmlFor="balance">Initial Deposit:</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={account.balance}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-account-information">Create Account</button>
      </form>
    </div>
  );
};

export default AddAccountForm;
