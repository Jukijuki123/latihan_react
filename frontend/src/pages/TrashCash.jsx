"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import bgTukarSampah from "../assets/img/BGTukarSampah.png";
import api from "../api"; 

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

export default function TrashcashPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const lokasiDipilih = state?.lokasi;

  useEffect(() => {
    if (!lokasiDipilih) {
      navigate("/maptrashcash");
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

  // ✅ HANDLE SUBMIT BARU (KIRIM KE BACKEND)
  const handleSubmit = async () => {
    if (!jenis || !tanggal || !waktu) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    try {
      const res = await api.post("/transactions", {
        jenis,
        jumlah,
        lokasi: lokasiDipilih.name,
        tanggal,
        waktu,
      });

      const transaksi = res.data;

      const formattedHarga = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(transaksi.total_harga);

      setDetail({
        kode: transaksi.kode,
        lokasi: transaksi.lokasi,
        jenis: transaksi.jenis,
        jumlah: `${transaksi.jumlah} kg`,
        jadwal: `${formatTanggal(transaksi.tanggal)} ${transaksi.waktu}`,
        harga: formattedHarga,
      });

      setKodeTransaksi(transaksi.kode);
      setPopupOpen(true);

    } catch (err) {
      console.error(err);
      alert("Gagal membuat transaksi. Pastikan Anda sudah login.");
    }
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

      <main className="flex items-center justify-start h-screen px-6 md:px-12">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 z-20">

          <div className="bg-emerald-50 p-3 rounded-xl border text-sm">
            <p className="font-semibold text-primary-dark">
              Lokasi Dipilih:
            </p>
            <p>{lokasiDipilih?.name}</p>
          </div>

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

          <div className="flex items-center justify-between border rounded-xl">
            <button onClick={handleKurang} className="px-4 py-2">−</button>
            <span>{jumlah} kg</span>
            <button onClick={handleTambah} className="px-4 py-2">+</button>
          </div>

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

      {popupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-center">
              Penukaran Berhasil
            </h2>

            <div ref={qrContainerRef} className="flex justify-center">
              <QRCodeCanvas value={qrValue} size={200} includeMargin={true}/>
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
                onClick={() => setPopupOpen(false)}
                className="flex-1 bg-primary-dark text-white py-2 rounded-xl"
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
