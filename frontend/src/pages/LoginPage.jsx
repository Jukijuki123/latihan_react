// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import useAuth from '../contexts/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await api.post("/login", { email, password });

    login(
      {
        name: res.data.name,
        email: res.data.email,
      },
      res.data.token
    );

    navigate("/");
  } catch (err) {
    setError("Email atau password salah");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Login..." : "Login"}
        </button>
       
        <p className="text-sm">
          Belum punya akun?<Link to="/register"> <span className="text-blue-600 hover:underline">Daftar sekarang</span> 
          </Link>
        </p>
      </form>

    </div>
  );
};

export default Login;
