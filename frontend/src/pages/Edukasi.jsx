// src/pages/Edukasi.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

const Edukasi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdukasi = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/edukasi", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetch edukasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEdukasi();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Memuat konten edukasi...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Gagal memuat data edukasi.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-emerald-800">{data.title}</h1>
        <p className="text-slate-700">{data.content}</p>

        {data.user && (
          <p className="text-sm text-slate-500">
            Diakses oleh: <span className="font-semibold">{data.user.name}</span> (
            {data.user.email})
          </p>
        )}
      </div>
    </div>
  );
};

export default Edukasi;
