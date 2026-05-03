"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight, Star, Plane, Search } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="hero-section relative min-h-screen w-full overflow-hidden flex items-center pt-20">
            {/* Base Background Color */}
            <div className="absolute inset-0 bg-[#F5F5F5] -z-20" />

            {/* Tablet Background Image */}
            <div className="absolute inset-0 block xl:hidden -z-10 pointer-events-none overflow-hidden">
                <motion.div
                    initial={{ filter: "blur(0px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/headerimage-4.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </div>


            <div className="container mx-auto px-6 lg:px-12 relative z-10 hero-container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 hero-layout-wrapper">

                    {/* Left Content */}
                    <div className="w-full lg:w-[45%] flex flex-col items-start text-left hero-left-content">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hero-motion-wrapper relative w-full"
                        >
                            {/* Tablet/Mobile Centralized Layout */}
                            <div className="block xl:hidden w-full py-6 md:py-12">
                                <div className="hero-tablet-central-box relative mx-auto overflow-hidden rounded-[32px] md:rounded-[48px] shadow-2xl p-6 sm:p-8 md:p-12 flex flex-col items-center gap-8 md:gap-10 max-w-[700px] bg-[#F5F5F5]">

                                    {/* Background Image for the Box */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src="/images/headerimage-4.png"
                                            alt="Box Background"
                                            fill
                                            className="object-cover scale-150 blur-sm"
                                            priority
                                        />
                                    </div>

                                    {/* Layer 1: Heading */}
                                    <div className="w-full text-center relative z-10">
                                        <h1 className="text-[#18189C] text-[45px] md:text-[60px] font-black leading-[1.1] uppercase">
                                            Your <br />
                                            journey <br />
                                            Begins with <br />
                                            <span className="text-[#6A9BFF]">us</span>
                                        </h1>
                                    </div>

                                    {/* Layer 2: Buttons */}
                                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                                        {/* Visa Button */}
                                        <div className="relative group min-w-[180px]">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                            >
                                                Visa
                                            </motion.button>
                                        </div>

                                        {/* Popular Destinations Button */}
                                        <div className="relative group min-w-[220px]">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                            >
                                                Popular destinations
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Layer 3: Design Box (Adventure Badge) */}
                                    <div className="w-full flex justify-center relative z-10">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <div className="relative bg-gradient-to-r from-[#B388FF] to-[#FFA726] px-8 py-3 rounded-full border-2 border-black text-center">
                                                <span className="text-white text-lg md:text-xl font-bold">Plan your next adventure</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Desktop Content (Hidden on Mobile/Tablet) */}
                            <div className="hidden xl:block">
                                {/* Heading */}
                                <div className="hero-tablet-heading-row">
                                    <h1 className="hero-heading text-[50px] md:text-[80px] lg:text-[90px] font-black leading-[1.05] tracking-tight mb-8 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                                        Your <br />
                                        journey <br className="hero-tablet-br hidden" />
                                        Begins <br />
                                        with <br className="hero-tablet-br hidden" />
                                        <span className="text-[#6A9BFF]">us</span>
                                    </h1>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 hero-buttons-tablet">
                                    {/* Visa Button */}
                                    <div className="relative group min-w-[200px]">
                                        <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                        >
                                            Visa
                                        </motion.button>
                                    </div>

                                    {/* Popular Destinations Button */}
                                    <div className="relative group min-w-[240px]">
                                        <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="relative w-full bg-gradient-to-r from-[#18189C] to-black px-8 py-4 rounded-full border-2 border-black text-white font-black text-sm uppercase tracking-widest"
                                        >
                                            Popular destinations
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Adventure Badge */}
                                <div className="relative mb-12 group adventure-badge-tablet">
                                    <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                    <div className="relative bg-gradient-to-r from-[#B388FF] to-[#FFA726] px-8 py-3 rounded-full border-2 border-black text-center">
                                        <span className="text-white text-lg md:text-2xl font-bold">Plan your next adventure</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Desktop Illustration Area */}
                    <div className="hidden xl:block w-full lg:w-[55%] relative h-[500px] lg:h-[800px] scale-110 lg:scale-125 origin-center hero-illustration-desktop">
                        {/* Main Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full h-full z-10"
                        >
                            <Image
                                src="/images/headerimage-4.png"
                                alt="Travel Illustrations"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}


