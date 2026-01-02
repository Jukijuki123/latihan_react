"use client";
import React, { useState } from "react";
import api from "../api";
import useAuth from "../contexts/useAuth";
import { Star } from "lucide-react";

export default function TestimoniForm() {
  const { isAuthenticated } = useAuth();
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(0);

  if (!isAuthenticated) return null;

  const submit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/testimonials", {
      quote,
      rating,
    });

    alert("Testimoni berhasil dikirim");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Gagal mengirim testimoni");
  }
};

  return (
    <form
      onSubmit={submit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mb-10"
    >
      <h3 className="text-lg font-semibold mb-4">
        Tulis Testimoni Kamu
      </h3>

      {/* ⭐ */}
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map((i) => (
          <Star
            key={i}
            onClick={() => setRating(i)}
            className={`cursor-pointer ${
              i <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
        rows={4}
        className="w-full border rounded-xl p-3 mb-4"
        placeholder="Tulis pengalaman kamu..."
      />

      <button className="px-6 py-2 bg-primary-dark text-white rounded-full">
        Kirim
      </button>
    </form>
  );
}
