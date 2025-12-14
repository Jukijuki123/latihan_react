"use client";
import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/img/logoEartLine.svg"; 

const SplashScreen = () => {
    return (
        <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark"
        >
        {/* Glow circle */}
        <div className="relative flex flex-col items-center">
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl shadow-lime-400/40"
            >
            <img
                src={logo}
                alt="EarthLine"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
            </motion.div>

            {/* Text */}
            <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-white text-xl md:text-2xl font-semibold"
            >
            EARTHLINE
            </motion.p>

            {/* Loading bar */}
            <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            className="mt-1 h-1 rounded-full bg-secondary/80 overflow-hidden"
            >
            </motion.div>
        </div>
        </motion.div>
    );
};

export default SplashScreen;
