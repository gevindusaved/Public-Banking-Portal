import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/registry/Login";
import UserPage from "./components/users/Userpage";
import AddUserForm from "./components/users/AddUserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:username" element={<UserPage />} />
        <Route path="/register" element={<AddUserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
