import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      alert("Registered successfully. Please login.");
      navigate("/login");
    } else {
      const data = await res.json();
      alert(data.msg || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4 text-orange-600">Register</h2>

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

      <div className="mb-4">
        <label className="block font-semibold text-sm mb-2">Role:</label>
        <label className="mr-4">
          <input
            type="radio"
            value="customer"
            checked={form.role === "customer"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="mr-1"
          />
          Customer
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            checked={form.role === "admin"}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="mr-1"
          />
          Admin
        </label>
      </div>

      <button className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700">
        Register
      </button>

      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
