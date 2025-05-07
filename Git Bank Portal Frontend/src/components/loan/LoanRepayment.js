import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./css/loanrepayment.css";

const LoanRepayment = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [repayment, setRepayment] = useState({
    loanId: "",
    loanAmount: "",
    status:"",
    dueDate: ""

  });
  const [loan, setLoan] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepayment((prev) => ({
      ...prev,
      [name]: name === "loanAmount" ? Number(value) : value,
    }));
  };

  const fetchLoanDetails = async () => {
    if (!repayment.loanId) return;

    try {
      const response = await api.get(`/api/v1/loans/${repayment.loanId}`, {
        params: { username },
      });
      setLoan(response.data);
    } catch (error) {
      console.error("Error fetching loan details:", error);
      setLoan(null);
    }
  };

  useEffect(() => {
    fetchLoanDetails();
  }, [repayment.loanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loan) {
      alert("No active loan found for this loan ID.");
      return;
    }
    if (loan.status === "paid") {
      alert("This loan has already been fully repaid.");
      return;
    }
    if (repayment.loanAmount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    try {
      await api.post(`/api/v1/loans/repay`, {
        loanId: repayment.loanId,
        loanAmount: repayment.loanAmount,
        username,
      });
      alert("Repayment successful!");
      navigate(`/users/${username}`);
    } catch (error) {
      console.error("Error processing loan repayment:", error);
      alert("Failed to process repayment.");
    }
  };

  return (
    <div className="content-acc-container">
      <h2 className="add-loan-repayment-h2">Loan Repayment</h2>
      <form onSubmit={handleSubmit} className="content-acc-form">
        <div className="loan-repayment-container">
          <div className="loan-content">
            <label>Loan Id:</label>
            <input
              type="text"
              name="loanId"
              value={repayment.loanId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loan-content">
            <label>Amount:</label>
            <input
              type="number"
              name="loanAmount"
              value={repayment.loanAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="loan-content-button">
          Submit Repayment
        </button>

        {loan ? (
          <>
            <p className="message-response">Loan Amount: {loan.loanAmount}</p>
            <p className="message-response">Status: {loan.status}</p>
            <p className="message-response">Due Date: {loan.dueDate}</p>
          </>
        ) : (
          <p>No loan data found.</p>
        )}
      </form>
    </div>
  );
};

export default LoanRepayment;
