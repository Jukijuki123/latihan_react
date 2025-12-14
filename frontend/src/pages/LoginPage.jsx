// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      console.log("Response login:", res.data);

      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      setUserData({
        name: res.data.name,
        email: res.data.email,
      });

      alert("Login berhasil!");

      // ⬇️ LANGSUNG ARAHKAN KE HALAMAN EDUKASI
      navigate("/upload-news");
    } catch (err) {
      console.error(err);
      setError("Email atau password salah / server error");
      alert("Gagal login. Cek email/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 space-y-4">
      <h2 className="text-3xl font-bold text-blue-800">Login</h2>

      <form
        onSubmit={handleLogin}
        className="bg-white p-4 rounded-lg w-80 space-y-4"
      >
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none"
            placeholder="Masukkan email Anda"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none"
            placeholder="Masukkan password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>

      {/* Optional: tampilkan data user setelah login */}
      {userData && (
        <div className="mt-4 bg-white p-4 rounded-lg w-80 shadow">
          <h3 className="font-semibold mb-2">Data User (setelah login):</h3>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Login;
