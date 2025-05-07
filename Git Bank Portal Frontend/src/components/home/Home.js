import React from "react";
import UserList from "../users/UserList";

const Home = ({ users }) => {
  return (
    <div>
      <h1>Welcome to User Management</h1>
      <UserList users={users} />
    </div>
  );
};

export default Home;
