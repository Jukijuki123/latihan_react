"use client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ScanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // ambil parameter kode dari URL
    const params = new URLSearchParams(location.search);
    const kode = params.get("kode");
    if (!kode) return;

    const transaksi = localStorage.getItem(`transaksi_${kode}`);
    if (transaksi) {
      setData(JSON.parse(transaksi));
    }
  }, [location.search]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-bold text-red-600 mb-2">
            Transaksi Tidak Ditemukan
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Pastikan QR berasal dari sistem EarthLine
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-dark text-white px-4 py-2 rounded-lg"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 font-['Poppins']">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-primary-dark text-center mb-4">
          Detail Penukaran Sampah
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Kode</span>
            <span className="font-medium">{data.kode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Jenis</span>
            <span className="font-medium">{data.jenis}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Jumlah</span>
            <span className="font-medium">{data.jumlah}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Lokasi</span>
            <span className="font-medium">{data.lokasi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Jadwal</span>
            <span className="font-medium">{data.jadwal}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-3">
            <span className="font-semibold">Total Harga</span>
            <span className="font-bold text-primary-dark text-lg">
              {data.harga}
            </span>
          </div>
        </div>

        <button
          onClick={() => alert("Pembayaran berhasil dikonfirmasi!")}
          className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700"
        >
          Konfirmasi Pembayaran
        </button>
      </div>
    </div>
  );
}
