// src/components/NewsSection.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

const NewsSection = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");
        setNewsList(res.data);
      } catch (err) {
        console.error("Gagal ambil berita:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="bg-white py-10 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Berita Terbaru
      </h2>

      {newsList.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada berita untuk ditampilkan.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-linear-to-b from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg p-5 transition"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {item.content}
              </p>
              <p className="mt-3 text-xs text-gray-400">
                oleh {item.user?.name || "Anonim"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;
