"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plane, Globe, ShieldCheck, ArrowRight, MapPin, Users, Briefcase, Sailboat } from "lucide-react";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center pt-24 lg:pt-48 pb-0 md:pb-32 bg-transparent">
            <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-24">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left relative z-20"
                    >
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-[#0047FF] font-black text-[10px] md:text-sm tracking-[0.2em] uppercase mb-6 relative z-[999]">
                            <Plane size={16} className="rotate-45" />
                            <span>Explore. Dream. Discover.</span>
                        </motion.div>

                        <div className="relative mb-8">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-40 w-48 h-24 pointer-events-none opacity-40 z-[999]">
                                <svg viewBox="0 0 200 100" className="w-full h-full">
                                    <path d="M10,80 Q60,10 110,60 T190,20" fill="none" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 6" />
                                    <path d="M190,20 L182,16 M190,20 L186,28" fill="none" stroke="#2563EB" strokeWidth="2" />
                                </svg>
                            </div>

                            {/* Desktop Heading (Unchanged) */}
                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hidden lg:block text-6xl md:text-8xl lg:text-[7.5rem] font-outfit font-black leading-[1.1] tracking-tight text-white drop-shadow-2xl">
                                Your Journey <br />
                                <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6">
                                    <span>Begins</span>
                                    <span className="relative inline-block text-[#1D4ED8] font-satisfy-local font-normal italic pt-2 pb-6">
                                        With Us
                                        <svg className="absolute bottom-0 left-0 w-full h-4 text-[#1D4ED8]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                            <path d="M5,15 Q40,10 95,18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </span>
                            </motion.h1>

                            {/* Tablet/Mobile Heading - Stacked Flow */}
                            <div className="lg:hidden relative w-full flex flex-col items-center mb-0">
                                <div className="relative w-full flex items-start justify-center mb-0 min-h-[400px]">
                                    {/* TOP TEXT: Your Journey (Layered Inside) */}
                                    <motion.h1
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className="absolute top-[-10px] text-[67px] md:text-[9rem] font-outfit font-extrabold leading-[0.85] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-20 text-center"
                                    >
                                        Your <br /> Journey
                                    </motion.h1>

                                    {/* BACKGROUND: Sky Image Base */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="relative w-full h-[250px] md:h-[427px] flex items-center justify-center mt-[-15px] md:mt-0 z-10"
                                    >
                                        <div className="relative w-full h-full max-w-[180px] md:max-w-[342px] aspect-[4/2.2] flex items-center justify-center">
                                            <div className="absolute inset-0 rounded-[35%_35%_35%_35%/48%_48%_48%_48%] bg-white/40 backdrop-blur-md p-4 flex items-center justify-center overflow-hidden border-2 border-white/60 shadow-2xl">
                                                <div className="relative w-full h-full rounded-[32%_32%_32%_32%/45%_45%_45%_45%] overflow-hidden border-2 border-white/5">
                                                    <Image src="/images/skyimg6.jpg" alt="Khaleefa Holidays" fill className="object-cover scale-110" priority />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* TABLET FOREGROUND: Aeroplane */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.5, delay: 0.4 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-30 pointer-events-none"
                                    >
                                        <div className="relative w-[1000px] max-w-[none] aspect-video">
                                            <Image src="/images/aeroplaneimg2.png" alt="Flight" fill className="object-contain drop-shadow-2xl" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.5, delay: 0.4 }}
                                        className="absolute top-[-20px] left-1/2 -translate-x-1/2 flex md:hidden items-center justify-center z-30 pointer-events-none"
                                    >
                                        <div className="relative w-[475px] max-w-[none] aspect-video">
                                            <Image src="/images/aeroplaneimg2.png" alt="Flight Mobile" fill className="object-contain drop-shadow-2xl" />
                                        </div>
                                    </motion.div>

                                    {/* BOTTOM TEXT: Begins With Us (Layered Inside) */}
                                    <motion.h1
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className="absolute bottom-28 text-[67px] md:text-[9rem] font-outfit font-extrabold leading-none tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-50 flex flex-col items-center"
                                    >
                                        <span className="flex flex-wrap items-center justify-center gap-x-4">
                                            <span>Begins</span>
                                            <span className="relative inline-block text-[#1D4ED8] font-satisfy-local font-normal italic pt-2 pb-4 drop-shadow-[0_2px_8px_rgba(29,78,216,0.3)]">
                                                With Us
                                                <svg className="absolute bottom-0 left-0 w-full h-3 text-[#1D4ED8]" viewBox="0 0 100 20" preserveAspectRatio="none">
                                                    <path d="M5,15 Q40,10 95,18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                                </svg>
                                            </span>
                                        </span>
                                    </motion.h1>

                                    {/* MOBILE BUTTONS (Moved inside for closer proximity) */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute bottom-[56px] flex flex-row items-center justify-center gap-2 w-full px-4 z-50">
                                        <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-center gap-1.5 bg-[#1D4ED8] text-white px-4 py-2 rounded-full font-outfit font-bold text-xs hover:bg-[#1e40af] transition-all duration-300 shadow-lg whitespace-nowrap">
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            Services
                                        </button>
                                        <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center justify-center gap-1.5 bg-white text-[#0F172A] px-4 py-2 rounded-full font-outfit font-bold text-xs border-2 border-[#1D4ED8] hover:bg-blue-50 transition-all duration-300 shadow-sm whitespace-nowrap">
                                            <MapPin size={14} className="text-[#1D4ED8]" />
                                            Destinations
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[12px] md:text-lg text-slate-500 font-outfit font-medium max-w-xl mt-[-70px] md:mt-4 mb-8 leading-relaxed text-center lg:text-left" >
                            We turn your travel dreams into unforgettable experiences with seamless services and worldwide destinations.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, delay: 0.4 }} 
                            className="flex flex-row flex-nowrap justify-center lg:justify-start gap-4 md:gap-8 mt-[-10px] md:mt-0 mb-12 w-full overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                <div className="bg-white/20 p-2 md:p-3 rounded-xl shadow-inner"><Plane size={20} className="md:w-[24px] md:h-[24px] text-[#1D4ED8]" /></div>
                                <span className="font-outfit font-bold text-slate-800 text-[10px] md:text-base leading-tight text-center md:text-left">Global <br className="hidden md:block" /> Destinations</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                <div className="bg-white/20 p-2 md:p-3 rounded-xl shadow-inner"><Briefcase size={20} className="md:w-[24px] md:h-[24px] text-[#1D4ED8]" /></div>
                                <span className="font-outfit font-bold text-slate-800 text-[10px] md:text-base leading-tight text-center md:text-left">Visa <br className="hidden md:block" /> Assistance</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                                <div className="bg-white/20 p-2 md:p-3 rounded-xl shadow-inner"><Users size={20} className="md:w-[24px] md:h-[24px] text-[#1D4ED8]" /></div>
                                <span className="font-outfit font-bold text-slate-800 text-[10px] md:text-base leading-tight text-center md:text-left">B2B <br className="hidden md:block" /> Partnerships</span>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="hidden lg:flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center justify-center gap-3 bg-[#1D4ED8] text-white px-10 py-4 rounded-full font-outfit font-bold text-lg hover:bg-[#1e40af] transition-all duration-300 w-full sm:w-auto shadow-lg">
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                Explore Services
                            </button>
                            <button onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center justify-center gap-3 bg-white text-[#0F172A] px-10 py-4 rounded-full font-outfit font-bold text-lg border-2 border-[#1D4ED8] hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto shadow-sm">
                                <MapPin size={20} className="text-[#1D4ED8]" />
                                View Destinations
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visuals (Desktop only) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="hidden lg:flex w-full lg:w-[50%] relative h-[450px] md:h-[600px] items-center justify-center lg:translate-x-12"
                    >
                        <div className="relative w-full h-full max-w-[460px] aspect-[3/4.2] flex items-center justify-center">
                            <div className="absolute inset-0 rounded-[35%_35%_35%_35%/48%_48%_48%_48%] bg-white/40 backdrop-blur-md p-5 md:p-7 flex items-center justify-center overflow-hidden border-2 border-white/60">
                                <div className="absolute inset-0 rounded-[35%_35%_35%_35%/48%_48%_48%_48%] pointer-events-none z-10" />
                                <div className="relative w-full h-full rounded-[32%_32%_32%_32%/45%_45%_45%_45%] overflow-hidden border-2 border-white/5">
                                    <Image src="/images/skyimg6.jpg" alt="Khaleefa Holidays" fill className="object-cover scale-110" priority />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-40" />
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        >
                            <div className="relative w-[550%] md:w-[850%] h-[550%] md:h-[850%]">
                                <Image src="/images/aeroplaneimg2.png" alt="Flight" fill className="object-contain drop-shadow-2xl" />
                            </div>
                        </motion.div>

                        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 w-24 h-24 bg-[#0047FF]/10 rounded-full blur-2xl" />
                        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
            {/* Wavy Bottom Line with Plane and Ship icons */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-24 pointer-events-none flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path
                        d="M 0 10 L 100 10"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="blur-[1px] opacity-80"
                    />
                </svg>
            </div>
        </section>
    );
}
