import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddAccountForm from "../../components/accounts/AddAccountForm";
import AddTransaction from "../accounts/AddTransaction";
import ShowBalance from "../accounts/ShowBalance";
import LoanRepayment from "../loan/LoanRepayment";
import FixedDepositLookup from "../fixeddeposits/FixedDepositLookup";
import AddUser from "./AddUser";
import "./css/userpage.css";

const UserPage = () => {
  const { username } = useParams();
  const [activeFeature, setActiveFeature] = useState("dashboard");

  const renderFeature = () => {
    switch (activeFeature) {
      case "addUser":
        return <AddUser username={username} />;
      case "addAccount":
        return <AddAccountForm username={username} />;
      case "transaction":
        return <AddTransaction />;
      case "balance":
        return <ShowBalance username={username} />;
      case "loan":
        return <LoanRepayment username={username} />;
      case "fd":
        return <FixedDepositLookup username={username} />;
      default:
        return <p>Select a feature from the menu.</p>;
    }
  };

  return (
    <div className="body-user">
      <div className="navbar-container">
        <nav style={{ marginBottom: "20px" }} className="navbar-panel">
          <button
            className="nav-links"
            onClick={() => setActiveFeature("dashboard")}
          >
            Dashboard
          </button>
          <button
            className="nav-links"
            onClick={() => setActiveFeature("addUser")}
          >
            Add User
          </button>
          <button
            className="nav-links"
            onClick={() => setActiveFeature("addAccount")}
          >
            Add Account
          </button>
          <button
            className="nav-links"
            onClick={() => setActiveFeature("transaction")}
          >
            Add Transaction
          </button>
          <button
            className="nav-links"
            onClick={() => setActiveFeature("balance")}
          >
            Show Balance
          </button>
          <button
            className="nav-links"
            onClick={() => setActiveFeature("loan")}
          >
            Loan Repayment
          </button>
          <button className="nav-links" onClick={() => setActiveFeature("fd")}>
            Fixed Deposits
          </button>
        </nav>
      </div>
      <div className="hero-header">
        <h2 className="hero-header-h2">Welcome: {username}</h2>
        <p className="hero-header-p">
          A banking system is a comprehensive digital platform designed to
          manage and streamline the financial operations and services provided
          by a bank or financial institution. It enables the secure handling of
          essential banking functions such as customer onboarding, account
          creation, deposit and withdrawal management, loan processing,
          transaction tracking, and interest calculations. Modern banking
          systems aim to enhance customer experience through automation,
          real-time data processing, and seamless access to services. With
          robust authentication mechanisms and data integrity checks, they
          ensure the security and privacy of sensitive financial information.
          Additionally, these systems often integrate with APIs, reporting
          tools, and regulatory frameworks to maintain compliance and
          transparency.
        </p>
      </div>
      <div>{renderFeature()}</div>
    </div>
  );
};

export default UserPage;
