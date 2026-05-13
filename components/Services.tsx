"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck, BedDouble, Car, MapPin, Loader2, Plane } from "lucide-react";
import { ServiceCard, ServiceModal, Visa, Destination, Room, Cab } from "./ServiceCard";

const tabs = [
    { id: "visa", label: "Visa", icon: FileCheck },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "rooms", label: "Rooms", icon: BedDouble },
    { id: "cab", label: "Cab", icon: Car },
];

const defaultVisaCategories = ["All Categories", "GCC", "Schengen", "Asia"];

export default function Services() {
    const [activeTab, setActiveTab] = useState("visa");
    const [activeVisaCategory, setActiveVisaCategory] = useState("All Categories");
    const [activeVisaType, setActiveVisaType] = useState("All Types");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Body scroll lock on modal open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedId]);

    // Dynamic Data State
    const [visaData, setVisaData] = useState<Visa[]>([]);
    const [destinationData, setDestinationData] = useState<Destination[]>([]);
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [cabData, setCabData] = useState<Cab[]>([]);

    const [visaCategories, setVisaCategories] = useState<string[]>(defaultVisaCategories);
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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [visasRes, destsRes, roomsRes, cabsRes] = await Promise.all([
                    fetch("/api/visas"),
                    fetch("/api/destinations"),
                    fetch("/api/rooms"),
                    fetch("/api/cabs"),
                ]);

                const visas = await visasRes.json();
                const dests = await destsRes.json();
                const rooms = await roomsRes.json();
                const cabs = await cabsRes.json();

                if (visas.success) {
                    setVisaData(visas.data);
                }
                if (dests.success) setDestinationData(dests.data);
                if (rooms.success) setRoomData(rooms.data);
                if (cabs.success) setCabData(cabs.data);

            } catch (error) {
                console.error("Failed to fetch services data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const filteredVisaData = visaData.filter(item => {
        const matchesCategory = activeVisaCategory === "All Categories" || item.category === activeVisaCategory;
        const matchesType = activeVisaType === "All Types" || item.visaType === activeVisaType;
        const matchesSearch = item.country.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesType && matchesSearch;
    });

    const getActiveItem = () => {
        if (activeTab === "visa") return visaData.find(v => v._id === selectedId);
        if (activeTab === "destinations") return destinationData.find(d => d._id === selectedId);
        if (activeTab === "rooms") return roomData.find(r => r._id === selectedId);
        if (activeTab === "cab") return cabData.find(c => c._id === selectedId);
        return null;
    };

    const activeItem = getActiveItem();

    return (
        <section id="services" className={`pt-[150px] pb-[100px] bg-transparent relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            {/* Scattered Small White Shapes */}



            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#0c39e0] to-black">Our Services</h2>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 overflow-x-auto pb-4 py-[5px] scrollbar-hide">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setActiveTab(tab.id); setSelectedId(null); }}
                            className={`flex items-center gap-3 px-8 py-3.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                ? "bg-[#1e1e89] text-white"
                                : "bg-white text-[#4B5563] border border-[#1e1e89]/10 hover:border-[#1e1e89] hover:text-[#1e1e89]"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-bookease-navy " />
                    </div>
                ) : (
                    <div className="">
                        {/* Visa Content */}
                        {activeTab === "visa" && (
                            <>
                                <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                                    {/* Search Box */}
                                    <div className="relative w-full md:w-[300px]">
                                        <input
                                            type="text"
                                            placeholder="SEARCH COUNTRY..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white/50 border-2 border-black/5 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#0c39e0]/20 focus:border-[#0c39e0] outline-none transition-all placeholder:text-slate-300"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Visa Categories (Subbuttons) */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {visaCategories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveVisaCategory(category);
                                                    setVisibleCards(6);
                                                }}
                                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeVisaCategory === category
                                                    ? "bg-[#0c39e0] text-white shadow-sm scale-105"
                                                    : "text-[#0c39e0]/60 hover:text-[#0c39e0] hover:bg-black/5"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Visa Type Filter */}
                                    <div className="relative w-full md:w-[180px]">
                                        <select
                                            value={activeVisaType}
                                            onChange={(e) => {
                                                setActiveVisaType(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white/50 border-2 border-black/5 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-black/20 hover:bg-slate-50 transition-all text-[#0c39e0]"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2318189C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.9rem' }}
                                        >
                                            <option value="All Types">All Types</option>
                                            <option value="Tourist">Tourist</option>
                                            <option value="Business">Business</option>
                                            <option value="Job seeker">Job seeker</option>
                                            <option value="Umrah">Umrah</option>
                                            <option value="Family">Family</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
                                    <AnimatePresence mode="popLayout">
                                        {filteredVisaData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="visa"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-12">
                                    {filteredVisaData.length > visibleCards && (
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
                                {filteredVisaData.length === 0 && <EmptyState message="No visas found." />}
                            </>
                        )}


                        {/* Destinations Content */}
                        {activeTab === "destinations" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
                                    <AnimatePresence mode="popLayout">
                                        {destinationData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="destination"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-12">
                                    {destinationData.length > visibleCards && (
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
                                {destinationData.length === 0 && <EmptyState message="No destinations found." />}
                            </div>
                        )}

                        {/* Rooms Content */}
                        {activeTab === "rooms" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
                                    <AnimatePresence mode="popLayout">
                                        {roomData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="rooms"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-12">
                                    {roomData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                                className="relative bg-white text-[#0c39e0] px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-slate-50"
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
                                                className="relative bg-white text-[#0c39e0] px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {roomData.length === 0 && <EmptyState message="Coming Soon" />}
                            </div>
                        )}

                        {/* Cabs Content */}
                        {activeTab === "cab" && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-8 max-w-[1400px] mx-auto">
                                    <AnimatePresence mode="popLayout">
                                        {cabData.slice(0, visibleCards).map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="cab"
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className="flex justify-center items-center gap-6 mt-12">
                                    {cabData.length > visibleCards && (
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                                className="relative bg-white text-[#0c39e0] px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-slate-50"
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
                                                className="relative bg-white text-[#0c39e0] px-10 py-4 rounded-full border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-slate-50"
                                            >
                                                Show Less
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {cabData.length === 0 && <EmptyState message="Coming Soon" />}
                            </div>
                        )}
                    </div>
                )}

                <ServiceModal
                    isOpen={!!selectedId}
                    item={activeItem}
                    type={activeTab}
                    onClose={() => setSelectedId(null)}
                />

            </div>
        </section>
    );
}

function EmptyState({ message }: { message: string }) {
    const isComingSoon = message.toLowerCase().includes("soon");
    return (
        <div className="col-span-full text-center py-32 rounded-[40px] relative overflow-hidden">
            {isComingSoon ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <h3 className="text-5xl md:text-8xl font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-b from-[#1e1e89] to-[#1e1e89]/20 mb-4 opacity-20">
                        {message}
                    </h3>
                    <p className="text-[#1e1e89]/40 text-xs font-bold uppercase tracking-[0.5em] mt-4">
                        Under Development
                    </p>
                </motion.div>
            ) : (
                <p className="text-black/30 font-bold uppercase tracking-widest text-sm">{message}</p>
            )}
        </div>
    );
}
