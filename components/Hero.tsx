"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section id="hero" className="hero-section relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-[#F5F5F5] -z-20" />

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1e1e89]/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#18189c]/5 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left Column: Title and Buttons */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-outfit font-black leading-[1.05] tracking-tight text-transparent mb-8 pl-[5px]"
                        style={{ WebkitTextStroke: "2px #18189c" }}
                    >
                        Your Journey Begins With Us
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        {/* Services Button */}
                        <div className="relative group w-full sm:w-auto">
                            <button
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                className="relative w-full sm:min-w-[180px] bg-white text-[#1e1e89] px-8 py-4 rounded-full border border-white/50 shadow-[0_20px_40px_-15px_rgba(30,30,137,0.3)] font-black text-sm uppercase tracking-widest hover:-translate-y-1 transition-all duration-300"
                            >
                                Services
                            </button>
                        </div>

                        {/* Destinations Button */}
                        <div className="relative group w-full sm:w-auto">
                            <button
                                onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                                className="relative w-full sm:min-w-[180px] bg-white text-gray-800 px-8 py-4 rounded-full border border-white/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] font-black text-sm uppercase tracking-widest hover:-translate-y-1 transition-all duration-300"
                            >
                                Destinations
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Animated Blob Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full lg:w-1/2 h-[45vh] lg:h-[60vh] flex items-center justify-center"
                >
                    {/* The Blob Image Container */}
                    <div className="relative w-full h-full max-w-[600px]">
                        {/* Clipped Sky Background with Blob Shape */}
                        <div className="absolute inset-0 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob-morph shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1),inset_0_0_100px_40px_#F5F5F5] overflow-hidden">
                            <Image
                                src="/images/skyimg6.jpg"
                                alt="Sky Background"
                                fill
                                className="object-cover blur-sm scale-105"
                                priority
                            />
                        </div>

                        {/* Aeroplane Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center scale-150">
                            <Image
                                src="/images/aeroplaneimg2.png"
                                alt="Aeroplane"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
