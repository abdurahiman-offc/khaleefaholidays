"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight, Star, Plane, Search } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="hero-section relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-[#F5F5F5] -z-20" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center gap-12 md:gap-16">

                {/* First Div: Split Title */}
                <div className="text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[1px] md:text-[25px] lg:text-[50px] font-black leading-[1.1] tracking-tight uppercase text-[#01176a]"
                    >
                        Your Journey Begins <br /> With Us
                    </motion.h1>
                </div>

                {/* Second Div: Organic Shape Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-[85%] h-[50vh]"
                >
                    {/* Clipped Sky Background with Capsule Shape */}
                    <div className="absolute inset-0 rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1),inset_0_0_100px_40px_#F5F5F5] overflow-hidden">
                        <Image
                            src="/images/skyimg4.jpg"
                            alt="Sky Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* White Overlay */}
                        <div className="absolute inset-0 bg-white/30" />
                    </div>

                    {/* Overflowing Aeroplane */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full scale-125">
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

                {/* Third Div: Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-6 md:gap-8"
                >
                    {/* Services Button */}
                    <div className="relative group w-full sm:min-w-[200px]">
                        <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                        <button
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                            className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-10 py-5 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                        >
                            Services
                        </button>
                    </div>

                    {/* Destinations Button */}
                    <div className="relative group w-full sm:min-w-[200px]">
                        <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                        <button
                            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                            className="relative w-full bg-white text-[#18189C] px-10 py-5 rounded-full border-2 border-black font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-colors"
                        >
                            Destinations
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}


