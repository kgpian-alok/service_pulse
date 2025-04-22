import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // 👈 import the footer

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar role={role} onLogout={handleLogout} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={setRole} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/customer"
              element={
                role === "customer" ? (
                  <CustomerDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        <Footer /> {/* 👈 render it at the bottom */}
      </div>
    </Router>
  );
};

export default App;
