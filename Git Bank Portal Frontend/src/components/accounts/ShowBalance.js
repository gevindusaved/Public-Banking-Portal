import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import "./css/showbalance.css";

const ShowBalance = ({ username }) => {
  const [accountId, setAccountId] = useState("");
  const [balance, setBalance] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [message, setMessage] = useState("");

  const handleShowBalance = async (e) => {
    e.preventDefault();
    setMessage("");
    setBalance(null);
    setAccountInfo(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/showbalance/${accountId}/${username}`
      );

      const data = response.data;

      if (data && data.balance !== undefined) {
        setBalance(data.balance);
        setAccountInfo({
          userInformationId: data.userInformationId,
          accountType: data.accountType,
        });

        localStorage.setItem("balance", data.balance);
      } else {
        setMessage("Invalid response from server");
      }
    } catch (error) {
      setMessage("Account not found or server error");
    }
  };

  return (
    <div className="content-show-acc-container">
      <h2 className="add-balance-h2">Balance Inquiry</h2>
      <form onSubmit={handleShowBalance}>
        <div className="add-balance-content">
          <label>Account ID:</label>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="show-balance-button">
          Inquiry
        </button>
        {balance !== null ? (
          <>
            <p className="message-response">
              User ID: {accountInfo?.userInformationId}
            </p>
            <p className="message-response">
              Account Type: {accountInfo?.accountType}
            </p>

            <p className="message-response">Balance: {balance}</p>
          </>
        ) : (
          message && <p>{message}</p>
        )}
      </form>
    </div>
  );
};

export default ShowBalance;
