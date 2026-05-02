"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionBackground from "./SectionBackground";
import { ServiceCard, ServiceModal } from "./ServiceCard";
import type { Destination } from "./ServiceCard";

export default function Destinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState(8);
    const [incrementBy, setIncrementBy] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) { // xl desktop
                setVisibleCards(8);
                setIncrementBy(8);
            } else if (window.innerWidth >= 1024) { // lg desktop
                setVisibleCards(6);
                setIncrementBy(6);
            } else { // md tablet and below
                setVisibleCards(6);
                setIncrementBy(6);
            }
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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

    const activeItem = destinations.find(d => d._id === selectedId);

    return (
        <section id="destinations" className={`pt-[100px] pb-7 md:pb-[100px] bg-[#F5F5F5] relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            <SectionBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[10px] font-black text-[#2D3E33]/40 uppercase tracking-[0.2em] mb-4">
                        Discover
                    </h2>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#18189C] to-black">
                        Popular Destinations
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#18189C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3 md:gap-8 max-w-[1400px] mx-auto">
                        {/* DO NOT CHANGE THIS LAYOUT. This is permanent and always fixed. Keep flex flex-wrap. */}
                        <AnimatePresence mode="popLayout">
                            {destinations.slice(0, visibleCards).map((place, index) => (
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
                    <div className="flex justify-center items-center gap-6 mt-8 md:mt-12">
                        {destinations.length > visibleCards && (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                <button
                                    onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                    className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                >
                                    Show More Results
                                </button>
                            </div>
                        )}
                        {visibleCards > incrementBy && (
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                <button
                                    onClick={() => setVisibleCards(incrementBy)}
                                    className="relative bg-white text-[#18189C] px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-black text-xs md:text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                >
                                    Show Less
                                </button>
                            </div>
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
        </section>
    );
}
