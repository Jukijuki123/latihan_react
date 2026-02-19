"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

export default function ScanPage() {
  const [searchParams] = useSearchParams();
  const kode = searchParams.get("kode");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!kode) return;

    const fetchData = async () => {
      try {
        const res = await api.get(`/transactions/${kode}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kode]);

  const handleConfirm = async () => {
    if (!data || data.status === "completed") return;

    try {
      setProcessing(true);

      const res = await api.patch(`/transactions/${kode}/verify`);

      setData(res.data.data);

      alert("Transaksi berhasil dikonfirmasi!");
    } catch (err) {
      console.error(err);
      alert("Gagal mengkonfirmasi transaksi.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="p-10">Memuat data...</div>;

  if (!data)
    return <div className="p-10 text-red-600">Transaksi tidak ditemukan</div>;

  const isCompleted = data.status === "completed";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">
          Detail Transaksi
        </h1>

        <div className="space-y-1 text-sm">
          <p><b>Kode:</b> {data.kode}</p>
          <p><b>Jenis:</b> {data.jenis}</p>
          <p><b>Jumlah:</b> {data.jumlah} kg</p>
          <p><b>Lokasi:</b> {data.lokasi}</p>
          <p><b>Tanggal:</b> {data.tanggal}</p>
          <p><b>Waktu:</b> {data.waktu}</p>
          <p><b>Total:</b> Rp {data.total_harga.toLocaleString("id-ID")}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                isCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {data.status}
            </span>
          </p>
        </div>

        {!isCompleted && (
          <button
            onClick={handleConfirm}
            disabled={processing}
            className="w-full bg-primary-dark text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {processing ? "Memproses..." : "Konfirmasi Transaksi"}
          </button>
        )}

        {isCompleted && (
          <div className="text-center text-green-600 font-semibold">
            Transaksi sudah selesai ✔
          </div>
        )}
      </div>
    </div>
  );
}
