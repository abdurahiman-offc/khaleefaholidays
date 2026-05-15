"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionBackground from "./SectionBackground";

export default function AboutUs() {
    return (
        <section id="about-us" className="pt-[400px] pb-[75px] bg-transparent overflow-visible relative contain-paint">
            <SectionBackground />

            {/* Destination Silhouette - Moved to section level for full visibility */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-[400px] z-0 pointer-events-none select-none">
                <Image 
                    src="/images/destinationsilhoute2.png" 
                    alt="Destinations Silhouette" 
                    fill 
                    className="object-cover object-bottom grayscale invert brightness-200 opacity-10"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`bg-white/10 backdrop-blur-lg rounded-[40px] md:rounded-[60px] border border-white/20 p-8 md:p-16 lg:p-20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] overflow-hidden relative group transition-all duration-500 hover:shadow-[0_8px_48px_rgba(0,0,0,0.08)]`}>
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 pointer-events-none" />
                    
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
                        {/* Big Title Content - Left column, Right-aligned internally */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-end order-1"
                        >
                            <h1 className="font-oswald text-[120px] md:text-[250px] font-black leading-[0.85] tracking-tighter text-[#1D4ED8] flex flex-col uppercase text-center lg:text-right">
                                <span className="block drop-shadow-2xl">Who</span>
                                <span className="block drop-shadow-2xl">We</span>
                                <span className="block drop-shadow-2xl">Are</span>
                            </h1>
                        </motion.div>

                        {/* Text Content - Right column */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full lg:w-1/2 text-center lg:text-left order-2"
                        >
                            <div className="mb-8">
                                <h2 className="font-oswald text-[40px] md:text-[80px] font-bold text-white/65 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] uppercase leading-none"
                                    style={{ transform: 'scaleY(1.6)', letterSpacing: '-4px' }}>
                                    About Us
                                </h2>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black mb-8 leading-tight uppercase tracking-tight text-slate-900">
                                Turning Dreams <br /> Into Reality Since 2024
                            </h2>
                            
                            <div className="text-lg text-slate-600 mb-8 leading-relaxed font-medium italic space-y-4">
                                <p>At Khaleefa Holidays, we make travel simple, smooth, and stress-free. We specialize in visa assistance and customized tour packages for travelers around the world.</p>
                                <p>Our expert team provides support for Business Visas, Job Seeker Visas, Tourist Visas, Family Visas, and other travel documentation services with reliable guidance throughout the process.</p>
                                <p>Whether you are planning a holiday, business trip, family visit, or international journey, we are committed to delivering trusted service and unforgettable travel experiences every step of the way.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-bold uppercase tracking-widest text-[#1D4ED8]">
                                <div className="flex items-center gap-2">
                                    <span className="w-12 h-[2px] bg-[#1D4ED8]" />
                                    <span>Based in Kerala</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-12 h-[2px] bg-[#1D4ED8]" />
                                    <span>Global Reach</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
