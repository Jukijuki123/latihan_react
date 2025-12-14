// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed_password, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        confirmed_password, // sesuai dengan AuthController kamu
      });

      console.log("Response register:", res.data);

      // ⬇️ DI SINI: JANGAN SIMPAN TOKEN, BIARKAN USER LOGIN MANUAL
      // const token = res.data.token;

      alert("Registrasi berhasil! Silakan login.");
      // reset form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");

      // ⬇️ ARAHKAN KE HALAMAN LOGIN
      navigate("/login");
    } catch (error) {
      console.error(error);

      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        alert("Terjadi kesalahan:\n" + errors.join("\n"));
      } else {
        alert("Gagal register, coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-green-100 space-y-4">
        <h2 className="text-3xl font-bold text-green-800">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg w-80 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none"
              placeholder="Masukkan nama Anda"
            />
          </div>

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
              placeholder="Masukkan alamat email Anda"
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
              placeholder="Masukkan Password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmed_password}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              name="confirmed_password"
              className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none"
              placeholder="Masukkan Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-800 text-white rounded-lg hover:bg-green-600 active:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
