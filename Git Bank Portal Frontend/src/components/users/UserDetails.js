import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetails = ({ getUserData, user }) => {
  const { userId } = useParams();

  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="user-details-container">
      <h2>{user.username}</h2>
      <p>
        <strong>Full Name:</strong> {user.first_name} {user.middle_name}{" "}
        {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserDetails;
