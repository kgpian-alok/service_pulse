import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      onLogin(data.role);
      navigate(data.role === "admin" ? "/admin" : "/customer");
    } else {
      alert(data.msg || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-orange-600">Login</h2>
        <input
          className="w-full mb-3 p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full mb-3 p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition">
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-orange-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
