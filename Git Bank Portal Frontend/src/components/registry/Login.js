import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../registry/css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      const loggedInUsername = response.data;
      localStorage.setItem("username", loggedInUsername);
      navigate(`/users/${loggedInUsername}`);
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2 className="login-h2">Login</h2>
        <form className="form-login" onSubmit={handleLogin}>
          <div className="login-form-content">
            <label>Username:</label>
            <input
              className="input-space"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-form-content">
            <label>Password:</label>
            <input
              className="input-space"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-login">
              <span>Login</span>
            </button>
            <button type="button" className="resigter-button-login" onClick={handleRegister}>
              <span>Register</span>
            </button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
