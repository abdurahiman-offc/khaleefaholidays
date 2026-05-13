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

    const activeItem = destinations.find(d => d._id === selectedId);

    return (
        <section id="destinations" className={`pt-[100px] pb-[100px] bg-transparent relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            <SectionBackground />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[10px] font-black text-[#2D3E33]/40 uppercase tracking-[0.2em] mb-4">
                        Discover
                    </h2>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#0c39e0] to-black">
                        Popular Destinations
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[#0c39e0] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
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
        </section>
    );
}
