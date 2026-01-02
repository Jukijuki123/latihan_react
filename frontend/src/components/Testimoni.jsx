"use client";
import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimoniSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get("/testimonials").then((res) => {
      setTestimonials(res.data);
    });
  }, []);

  return (
    <section id="testimoni" className="bg-white py-10 px-4">
      {/* HEADER TETAP */}

      <motion.div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className="bg-green-100 p-6 rounded-2xl shadow"
          >
            <Quote className="text-primary-dark mb-3" />

            <p className="text-green-900 mb-4">{item.quote}</p>

            {/* ⭐ RATING */}
            <div className="flex mb-3">
              {[1,2,3,4,5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i <= item.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">{item.username}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
