import { useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./css/adduser.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [createUser, setCreateUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    marital_status: "",
    occupation: "",
    employer: "",

    mobile: "",
    alternate_phone: "",
    email: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    mailing_address: "",

    id_type: "",
    id_number: "",
    id_issue_date: "",
    id_expiry_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateUser({ ...createUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "http://localhost:8080/api/v1/userinformations",
        createUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  return (
    <div className="add-user-body">
      <div className="content-acc-container">
        <h2 className="add-user-h2">Add New User</h2>
        <form className="" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h3>Customer Personal Details</h3>
          <div className="add-user-name">
            <div className="add-user-content">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={createUser.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Middle Name:</label>
              <input
                type="text"
                name="middleName"
                value={createUser.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="add-user-content">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={createUser.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="seond-form-group-add-user">
            <div className="add-user-content">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="date_of_birth"
                placeholder="DD-MM-YYYY"
                value={createUser.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Gender:</label>
              <select
                name="gender"
                placeholder="Select Gender"
                value={createUser.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="add-user-content">
              <label>Nationality:</label>
              <input
                type="text"
                name="nationality"
                value={createUser.nationality}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="third-form-group-add-user">
            <div className="add-user-content">
              <label>Marital Status:</label>
              <select
                name="marital_status"
                value={createUser.marital_status}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="add-user-content">
              <label>Occupation/Job Title:</label>
              <input
                type="text"
                name="occupation"
                value={createUser.occupation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Employer Name (optional):</label>
              <input
                type="text"
                name="employer"
                value={createUser.employer}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact Info */}
          <h3>Contact Information</h3>
          <div className="third-form-group-add-user">
            <div className="add-user-content">
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobile"
                value={createUser.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Alternate Phone Number:</label>
              <input
                type="tel"
                name="alternate_phone"
                value={createUser.alternate_phone}
                onChange={handleChange}
              />
            </div>
            <div className="add-user-content">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
                value={createUser.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="third-form-group-add-user">
            <div className="add-user-content">
              <label>Residential Address:</label>
              <input
                type="text"
                name="address"
                value={createUser.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Street:</label>
              <input
                type="text"
                name="street"
                value={createUser.street}
                onChange={handleChange}
              />
            </div>
            <div className="add-user-content">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={createUser.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>State/Province:</label>
              <input
                type="text"
                name="state"
                value={createUser.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="third-form-group-add-user">
            <div className="add-user-content">
              <label>Zip/Postal Code:</label>
              <input
                type="text"
                name="zip"
                value={createUser.zip}
                onChange={handleChange}
              />
            </div>
            <div className="add-user-content">
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={createUser.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Mailing Address (if different):</label>
              <input
                type="text"
                name="mailing_address"
                value={createUser.mailing_address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Identification Details */}
          <h3>Identification Details</h3>
          <div className="third-form-group-add-user">
            <div className="add-user-content">
              <label>Government ID Type:</label>
              <input
                type="text"
                name="id_type"
                value={createUser.id_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>ID Number:</label>
              <input
                type="text"
                name="id_number"
                value={createUser.id_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Issue Date:</label>
              <input
                type="date"
                name="id_issue_date"
                value={createUser.id_issue_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="add-user-content">
              <label>Expiry Date:</label>
              <input
                type="date"
                name="id_expiry_date"
                value={createUser.id_expiry_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="submit-information">
              <span>Save Information</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
