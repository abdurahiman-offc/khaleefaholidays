"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBackground from "./SectionBackground";
import { ServiceCard, ServiceModal } from "./ServiceCard";
import type { Destination } from "./ServiceCard";
import { Search } from "lucide-react";

export default function Destinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState(8);
    const [incrementBy, setIncrementBy] = useState(8);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(4);
                setIncrementBy(4);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(6);
                setIncrementBy(6);
            } else {
                setVisibleCards(8);
                setIncrementBy(8);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch("/api/destinations");
                const data = await response.json();
                if (data.success) {
                    setDestinations(data.data.filter((d: Destination) => d.popularDestination));
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    // Body scroll lock on modal open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    const filteredDestinations = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeItem = destinations.find(d => d._id === selectedId);

    return (
        <section id="destinations" className={`pt-[75px] pb-[75px] bg-transparent relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            <SectionBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center justify-center pt-10 pb-[50px] md:pt-20">
                    <div className="relative inline-block text-center">
                        {/* Background stretched text */}
                        <h2 
                            className="font-oswald text-[40px] md:text-[65px] lg:text-[90px] font-bold text-white/65 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)] uppercase select-none pointer-events-none leading-none whitespace-nowrap"
                            style={{ transform: 'scaleY(1.6)', letterSpacing: '-5px' }}
                        >
                            Explore the world
                        </h2>
                        
                        {/* Top cursive text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="font-satisfy-local text-[42px] md:text-[55px] lg:text-[80px] text-[#1D4ED8] whitespace-nowrap leading-none mt-4 md:mt-8">
                                Popular Destination
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center mb-10 px-4">
                    <div className="relative w-full max-w-lg group">
                        <div className="absolute inset-0 bg-[#1D4ED8]/5 rounded-full blur-xl group-hover:bg-[#1D4ED8]/10 transition-all duration-500" />
                        <div className="relative flex items-center bg-white/60 backdrop-blur-md border border-[#1D4ED8]/20 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] focus-within:border-[#1D4ED8] focus-within:shadow-[0_8px_32px_rgba(29,78,216,0.1)] transition-all duration-300">
                            <Search className="text-[#1D4ED8] mr-4" size={22} />
                            <input
                                type="text"
                                placeholder="Search your dream destination..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-[#0F172A] font-outfit font-medium text-lg placeholder:text-[#0F172A]/40"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery("")}
                                    className="ml-4 text-[#0F172A]/40 hover:text-[#1D4ED8] font-bold"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#0c39e0] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
                        {/* DO NOT CHANGE THIS LAYOUT. This is permanent and always fixed. Keep flex flex-wrap. */}
                        <AnimatePresence mode="popLayout">
                            {filteredDestinations.slice(0, visibleCards).map((place, index) => (
                            <ServiceCard
                                key={place._id}
                                item={place}
                                index={index}
                                onClick={() => setSelectedId(place._id)}
                                type="destination"
                            />
                        ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && destinations.length > 0 && (
                    <div className="flex justify-center items-center gap-6 mt-12">
                        {destinations.length > visibleCards && (
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                className="bg-[#1e1e89] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-[0_15px_30px_rgba(30,30,137,0.25)] transition-all"
                            >
                                Show More Results
                            </motion.button>
                        )}
                        {visibleCards > incrementBy && (
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setVisibleCards(incrementBy)}
                                className="bg-white text-[#1e1e89] px-10 py-4 rounded-full border border-[#1e1e89]/20 text-sm font-bold uppercase tracking-widest hover:border-[#1e1e89] transition-all"
                            >
                                Show Less
                            </motion.button>
                        )}
                    </div>
                )}

                <ServiceModal 
                    isOpen={!!selectedId} 
                    item={activeItem} 
                    type="destinations" 
                    onClose={() => setSelectedId(null)} 
                />
            </div>

            {/* Decorative Bottom Line */}
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
