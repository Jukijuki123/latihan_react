"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import bgTukarSampah from "../assets/img/BGTukarSampah.png";

const hargaPerKg = {
  Plastik: 5000,
  Kertas: 3000,
  Logam: 15000,
  Kaca: 2000,
  Organik: 1000,
};

const formatTanggal = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()} ${date.toLocaleString("id-ID", {
    month: "long",
  })} ${date.getFullYear()}`;
};

const generateKodeTransaksi = () => {
  const now = new Date();
  const rand = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `TRX-${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now
    .getDate()
    .toString()
    .padStart(2, "0")}-${rand}`;
};

export default function TrashcashPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const lokasiDipilih = state?.lokasi;

  // 🔴 Kalau belum pilih lokasi → balik ke map
  useEffect(() => {
    if (!lokasiDipilih) {
      navigate("/trashcash/map");
    }
  }, [lokasiDipilih, navigate]);

  const todayStr = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  const [jenis, setJenis] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [tanggal, setTanggal] = useState(todayStr);
  const [waktu, setWaktu] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const [kodeTransaksi, setKodeTransaksi] = useState("");
  const [detail, setDetail] = useState({});
  const qrContainerRef = useRef(null);

  const baseURL = window.location.origin;
  const qrValue = useMemo(
    () => `${baseURL}/scan?kode=${kodeTransaksi}`,
    [kodeTransaksi]
  );

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let h = 8; h <= 16; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return slots;
  }, []);

  const handleTambah = () => setJumlah((prev) => prev + 1);
  const handleKurang = () =>
    setJumlah((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = () => {
    if (!jenis || !tanggal || !waktu) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    const harga = jumlah * (hargaPerKg[jenis] || 0);
    const formattedHarga = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);

    const kode = generateKodeTransaksi();

    const transaksiData = {
      kode,
      lokasi: lokasiDipilih.name,
      jenis,
      jumlah: `${jumlah} kg`,
      jadwal: `${formatTanggal(tanggal)} ${waktu}`,
      harga: formattedHarga,
    };

    localStorage.setItem(
      `transaksi_${kode}`,
      JSON.stringify(transaksiData)
    );

    setDetail(transaksiData);
    setKodeTransaksi(kode);
    setPopupOpen(true);
  };

  const handleDownloadQr = () => {
    const canvas = qrContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR_${kodeTransaksi}.png`;
    link.click();
  };

  return (
    <div className="bg-linear-to-br from-green-50 to-emerald-50 min-h-screen relative">

      {/* FORM */}
      <main className="flex items-center justify-start h-screen px-6 md:px-12">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 z-20">

          {/* INFO LOKASI */}
          <div className="bg-emerald-50 p-3 rounded-xl border text-sm">
            <p className="font-semibold text-primary-dark">
              Lokasi Dipilih:
            </p>
            <p>{lokasiDipilih?.name}</p>
          </div>

          {/* JENIS */}
          <div>
            <label className="block text-sm mb-1">Jenis Sampah</label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-gray-100"
            >
              <option value="">Pilih jenis</option>
              <option value="Plastik">Plastik</option>
              <option value="Kertas">Kertas</option>
              <option value="Logam">Logam</option>
              <option value="Kaca">Kaca</option>
              <option value="Organik">Organik</option>
            </select>
          </div>

          {/* JUMLAH */}
          <div className="flex items-center justify-between border rounded-xl">
            <button onClick={handleKurang} className="px-4 py-2">−</button>
            <span>{jumlah} kg</span>
            <button onClick={handleTambah} className="px-4 py-2">+</button>
          </div>

          {/* TANGGAL & WAKTU */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              value={tanggal}
              min={todayStr}
              onChange={(e) => setTanggal(e.target.value)}
              className="bg-gray-100 px-3 py-2 rounded-xl"
            />
            <select
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              className="bg-gray-100 px-3 py-2 rounded-xl"
            >
              <option value="">Jam</option>
              {timeSlots.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary-dark text-white rounded-xl"
          >
            Jual
          </button>
        </div>
      </main>

      {/* POPUP */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-center">
              Penukaran Berhasil
            </h2>

            <div ref={qrContainerRef} className="flex justify-center">
              <QRCodeCanvas value={qrValue} size={200} />
            </div>

            <div className="text-sm space-y-1">
              <p><b>Kode:</b> {detail.kode}</p>
              <p><b>Lokasi:</b> {detail.lokasi}</p>
              <p><b>Jenis:</b> {detail.jenis}</p>
              <p><b>Jumlah:</b> {detail.jumlah}</p>
              <p><b>Jadwal:</b> {detail.jadwal}</p>
              <p><b>Harga:</b> {detail.harga}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDownloadQr}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
              >
                Download QR
              </button>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="flex-1 bg-primary-dark text-white font-bold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition text-sm"
              >
                Kembali
              </button>

            </div>
          </div>
        </div>
      )}

      <img
        src={bgTukarSampah}
        alt=""
        className="absolute bottom-0 right-0 w-[500px] pointer-events-none"
      />
    </div>
  );
}
