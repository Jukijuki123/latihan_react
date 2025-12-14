"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Bot, X, Send } from "lucide-react";

const botData = [
    {
        keywords: ["halo", "hai", "hello", "hi"],
        answer: "Halo! Ada yang bisa EarthLine bantu? 😊",
    },
    {
        keywords: ["apa itu earthline", "earthline", "platform"],
        answer:
        "EarthLine adalah platform digital untuk edukasi dan pengelolaan sampah secara modern. Kamu bisa belajar memilah, menukar, dan melihat produk daur ulang.",
    },
    {
        keywords: ["cara kerja", "gimana sistem", "gimana cara kerja"],
        answer:
        "Cara kerja EarthLine sederhana: 1) Kumpulkan sampah, 2) Isi detail, 3) Antar ke lokasi, 4) Dapatkan uang!",
    },
    {
        keywords: ["jual sampah", "tukar sampah", "penukaran"],
        answer:
        "Untuk menjual sampah, kamu tinggal isi detail sampah di fitur Tukar Sampah lalu datang ke bank sampah terdekat.",
    },
    {
        keywords: ["edukasi", "belajar", "cara mengolah sampah"],
        answer:
        "Di halaman edukasi, kamu bisa belajar pemilahan, daur ulang, serta inspirasi kerajinan tangan dari sampah.",
    },
    {
        keywords: ["terima kasih", "thanks", "makasih"],
        answer: "Sama-sama! Senang bisa membantu 😊",
    },
];

const getBotResponse = (input) => {
    const clean = input.toLowerCase().trim();

    for (const item of botData) {
        if (item.keywords.some((key) => clean.includes(key))) {
        return item.answer;
        }
    }

    return "Maaf, aku belum punya jawaban untuk itu. Tapi aku terus belajar! 😊";
    };

    const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {
        id: 1,
        sender: "bot",
        text: "Halo! Saya EarthLineBot 🌱\nAda yang bisa saya bantu?",
        },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;

        const userMsg = {
        id: Date.now(),
        sender: "user",
        text,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        const botText = getBotResponse(text);
        const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
        };

        setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        }, 400);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
        }
    };

    return (
        <>

        <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="fixed bottom-6 right-6 bg-primary-dark text-white p-4 rounded-full shadow-lg hover:bg-primary cursor-pointer transition z-40"
            aria-label="Buka chatbot"
        >
            <MessageCircle className="w-6 h-6" />
        </button>

        {/* Chatbot Containre */}
        {isOpen && (
            <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl flex flex-col border border-primary-dark z-50">
            {/* Header */}
            <div className="bg-primary-dark text-white p-3 rounded-t-xl flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold text-sm">EarthLine Bot</span>
                </div>
                <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 cursor-pointer"
                aria-label="Tutup chatbot"
                >
                <X className="w-4 h-4" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="p-3 h-80 overflow-y-auto space-y-2 text-sm">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={
                    msg.sender === "bot"
                        ? "bg-green-100 text-primary-dark p-2 rounded-lg w-fit max-w-[80%] whitespace-pre-line"
                        : "bg-primary-dark text-white p-2 rounded-lg w-fit max-w-[80%] ml-auto whitespace-pre-line"
                    }
                >
                    {msg.text}
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-primary-dark rounded-lg px-3 py-2 text-sm focus:outline-none"
                placeholder="Tanyakan sesuatu"
                />
                <button
                type="button"
                onClick={handleSend}
                className="bg-primary-dark text-white px-3 py-2 rounded-lg hover:bg-primary flex items-center justify-center cursor-pointer"
                >
                <Send className="w-4 h-4" />
                </button>
            </div>
            </div>
        )}
        </>
    );
};

export default Chatbot;
