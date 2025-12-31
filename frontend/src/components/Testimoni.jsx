"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import api from "../api"; // axios instance

export default function TestimoniSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get("/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.error("Gagal ambil testimoni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Memuat testimoni...</p>;
  }

  return (
    <section id="testimoni" className="bg-white py-10 px-4">

      {/* HEADER TETAP */}
      <motion.div
        className="flex flex-col md:flex-row max-w-5xl mb-10 mx-auto pb-3 px-4 justify-between border-b-2 border-primary-dark"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-dark text-center mb-6">
            Apa Kata Mereka{" "}
            <span className="text-secondary">Tentang EarthLine?</span>
          </h2>
        </div>

        <div className="md:w-1/2">
          <p className="text-primary-dark text-center md:text-start text-sm">
            Kami memahami bahwa setiap orang memiliki pengalaman berbeda dalam
            mengelola sampah bersama EarthLine.
          </p>
        </div>
      </motion.div>

      {/* TESTIMONI CARD */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className={`pb-1 bg-${item.color}-400/50 rounded-2xl`}
          >
            <div className={`bg-${item.color}-100 p-6 rounded-2xl shadow-md`}>
              <Quote className={`text-${item.color}-500 text-3xl mb-3`} />
              <p className="text-green-900 mb-6">{item.quote}</p>
              <div className="mt-3 text-yellow-400">★★★★★</div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.username}</p>
                </div>

                <img
                  src={item.avatar || "/default-avatar.png"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
