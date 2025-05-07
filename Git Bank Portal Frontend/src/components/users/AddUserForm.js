import { useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./css/adduserform.css";

const AddUserForm = () => {
  const navigate = useNavigate();

  const [users, setUser] = useState({
    username: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    password_hash: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...users, [name]: value });
  };
  const handleLoginNavigate = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("http://localhost:8080/api/v1/users", users);
      alert("User added successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2 className="register-h2">Add New User</h2>
        <form className="form-registry" onSubmit={handleSubmit}>
          <div className="register-form-content">
            <label>Username:</label>
            <input
              className="input-space "
              type="text"
              name="username"
              value={users.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-content">
            <label>First Name:</label>
            <input
              className="input-space "
              type="text"
              name="first_name"
              value={users.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-content">
            <label>Middle Name:</label>
            <input
              className="input-space "
              type="text"
              name="middle_name"
              value={users.middle_name}
              onChange={handleChange}
            />
          </div>

          <div className="register-form-content">
            <label>Last Name:</label>
            <input
              className="input-space "
              type="text"
              name="last_name"
              value={users.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-content">
            <label>Password:</label>
            <input
              className="input-space "
              type="password"
              name="password_hash"
              value={users.password_hash}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form-content">
            <label>Email:</label>
            <input
              className="input-space "
              type="email"
              name="email"
              value={users.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="submit-login">
              <span>Add User</span>
            </button>
            <button
              type="button"
              className="resigter-button-login"
              onClick={handleLoginNavigate}
            >
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
