// src/pages/UploadNews.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const UploadNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/news",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Berita berhasil diunggah!");
      navigate("/"); // kembali ke landing
    } catch (err) {
      console.error(err);
      alert("Gagal mengunggah berita. Pastikan Anda sudah login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-green-700">
          Upload Berita
        </h2>

        <input
          type="text"
          placeholder="Judul Berita"
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-green-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Isi berita..."
          rows={5}
          className="w-full border border-gray-300 p-2 rounded-lg focus:outline-green-600"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-60"
        >
          {loading ? "Mengunggah..." : "Kirim Berita"}
        </button>
      </form>
    </div>
  );
};

export default UploadNews;
