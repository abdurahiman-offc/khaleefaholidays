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

    const filteredDestinationData = destinationData.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
        <section id="services" className={`pt-0 md:pt-[100px] pb-0 md:pb-[75px] bg-transparent relative transition-colors duration-300 ${selectedId ? 'z-[100]' : 'z-10'}`}>
            {/* Scattered Small White Shapes */}



            <div className="container mx-auto px-6 relative z-10">

                <div className="flex items-center justify-center pt-10 pb-6 md:pt-20 md:pb-12">
                    <div className="relative inline-block">
                        {/* Background stretched text */}
                        <h2
                            className="font-oswald text-[50px] md:text-[70px] lg:text-[100px] font-bold text-white/65 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)] uppercase select-none pointer-events-none leading-none whitespace-nowrap"
                            style={{ transform: 'scaleY(1.6)', letterSpacing: '-5px' }}
                        >
                            Your Journey
                        </h2>

                        {/* Top cursive text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="font-satisfy-local text-[54px] md:text-[70px] lg:text-[90px] text-[#1D4ED8] whitespace-nowrap leading-none mt-4 md:mt-8">
                                Our Services
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4 md:mb-12 overflow-x-auto pb-4 py-[5px] scrollbar-hide">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setActiveTab(tab.id); setSelectedId(null); }}
                            className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2.5 md:py-3.5 rounded-full text-[10px] md:text-[12px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
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
                                <div className="mb-10 flex flex-col items-center w-full">
                                    {/* Search Box */}
                                    <div className="relative w-full md:w-[450px] mb-8">
                                        <input
                                            type="text"
                                            placeholder="SEARCH VISAS..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white/50 backdrop-blur-md border-2 border-white/20 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#0c39e0]/20 focus:border-[#0c39e0] outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Filters Container for Mobile */}
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full">
                                        {/* Mobile: Category and Type on same line */}
                                        <div className="flex flex-row md:flex-wrap items-center justify-center gap-2 w-full md:w-auto">
                                            {/* Visa Categories (Dropdown for Mobile) */}
                                            <div className="md:hidden relative flex-1 min-w-0">
                                                <select
                                                    value={activeVisaCategory}
                                                    onChange={(e) => {
                                                        setActiveVisaCategory(e.target.value);
                                                        setVisibleCards(6);
                                                    }}
                                                    className="w-full bg-white/50 border-2 border-black/5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-black/20 hover:bg-slate-50 transition-all text-[#1D4ED8]"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231D4ED8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '0.7rem' }}
                                                >
                                                    {visaCategories.map((category) => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Visa Type Filter */}
                                            <div className="relative flex-1 md:w-[180px] min-w-0">
                                                <select
                                                    value={activeVisaType}
                                                    onChange={(e) => {
                                                        setActiveVisaType(e.target.value);
                                                        setVisibleCards(6);
                                                    }}
                                                    className="w-full bg-white/50 border-2 border-black/5 px-3 py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-black/20 hover:bg-slate-50 transition-all text-[#0c39e0]"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2318189C'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '0.7rem' }}
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

                                        {/* Desktop Categories Buttons */}
                                        <div className="hidden md:flex flex-wrap justify-center gap-3">
                                            {visaCategories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setActiveVisaCategory(category);
                                                        setVisibleCards(6);
                                                    }}
                                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md border border-white/40 ${activeVisaCategory === category
                                                        ? "bg-[#1D4ED8] text-white shadow-lg scale-105"
                                                        : "bg-white/30 text-[#1D4ED8] hover:bg-white/50"
                                                        }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-start md:justify-center gap-4 md:gap-8 max-w-[1400px] mx-auto px-4 md:px-0 pb-20 md:pb-0 w-full max-h-[480px] overflow-y-auto md:max-h-none md:overflow-visible scrollbar-hide [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] md:[-webkit-mask-image:none] md:[mask-image:none]">
                                    <AnimatePresence mode="popLayout">
                                        {filteredVisaData.map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="visa"
                                                className={index >= visibleCards ? "md:hidden" : ""}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className={`hidden md:flex ${filteredVisaData.length > visibleCards && visibleCards > incrementBy ? 'flex-row gap-2 px-4' : 'flex-col gap-4'} md:flex-row md:justify-center items-center md:gap-6 mt-12 w-full md:px-0`}>
                                    {filteredVisaData.length > visibleCards && (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                            className={`bg-[#1e1e89] text-white rounded-full font-bold uppercase tracking-widest shadow-[0_15px_30px_rgba(30,30,137,0.25)] transition-all flex-1 md:flex-none w-full md:w-auto text-center whitespace-nowrap ${filteredVisaData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3.5 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm`}
                                        >
                                            Show More
                                        </motion.button>
                                    )}
                                    {visibleCards > incrementBy && (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                                setTimeout(() => {
                                                    setVisibleCards(incrementBy);
                                                }, 800);
                                            }}
                                            className={`bg-white text-[#1e1e89] border border-[#1e1e89]/20 hover:border-[#1e1e89] rounded-full font-bold uppercase tracking-widest transition-all flex-1 md:flex-none w-full md:w-auto text-center whitespace-nowrap ${filteredVisaData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3.5 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm`}
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
                                <div className="mb-10 flex justify-center">
                                    {/* Search Box */}
                                    <div className="relative w-full md:w-[400px]">
                                        <input
                                            type="text"
                                            placeholder="SEARCH DESTINATIONS..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setVisibleCards(6);
                                            }}
                                            className="w-full bg-white/50 backdrop-blur-md border-2 border-white/20 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#0c39e0]/20 focus:border-[#0c39e0] outline-none transition-all placeholder:text-slate-300 shadow-sm"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-start md:justify-center gap-4 md:gap-8 max-w-[1400px] mx-auto px-4 md:px-0 pb-20 md:pb-0 w-full max-h-[480px] overflow-y-auto md:max-h-none md:overflow-visible scrollbar-hide [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] md:[-webkit-mask-image:none] md:[mask-image:none]">
                                    <AnimatePresence mode="popLayout">
                                        {filteredDestinationData.map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="destination"
                                                className={index >= visibleCards ? "md:hidden" : ""}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className={`hidden md:flex ${filteredDestinationData.length > visibleCards && visibleCards > incrementBy ? 'flex-row gap-2 px-4' : 'flex-col gap-4'} md:flex-row md:justify-center items-center md:gap-6 mt-12 w-full md:px-0`}>
                                    {filteredDestinationData.length > visibleCards && (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                            className={`bg-[#1e1e89] text-white rounded-full font-bold uppercase tracking-widest shadow-[0_15px_30px_rgba(30,30,137,0.25)] transition-all flex-1 md:flex-none w-full md:w-auto text-center whitespace-nowrap ${filteredDestinationData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3.5 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm`}
                                        >
                                            Show More
                                        </motion.button>
                                    )}
                                    {visibleCards > incrementBy && (
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                                setTimeout(() => {
                                                    setVisibleCards(incrementBy);
                                                }, 800);
                                            }}
                                            className={`bg-white text-[#1e1e89] border border-[#1e1e89]/20 hover:border-[#1e1e89] rounded-full font-bold uppercase tracking-widest transition-all flex-1 md:flex-none w-full md:w-auto text-center whitespace-nowrap ${filteredDestinationData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3.5 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm`}
                                        >
                                            Show Less
                                        </motion.button>
                                    )}
                                </div>
                                {filteredDestinationData.length === 0 && <EmptyState message="No destinations found." />}
                            </div>
                        )}

                        {/* Rooms Content */}
                        {activeTab === "rooms" && (
                            <div className="w-full">
                                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-start md:justify-center gap-4 md:gap-8 max-w-[1400px] mx-auto px-4 md:px-0 pb-20 md:pb-0 w-full max-h-[480px] overflow-y-auto md:max-h-none md:overflow-visible scrollbar-hide [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] md:[-webkit-mask-image:none] md:[mask-image:none]">
                                    <AnimatePresence mode="popLayout">
                                        {roomData.map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="rooms"
                                                className={index >= visibleCards ? "md:hidden" : ""}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className={`hidden md:flex ${roomData.length > visibleCards && visibleCards > incrementBy ? 'flex-row gap-2 px-4' : 'flex-col gap-4'} md:flex-row md:justify-center items-center md:gap-6 mt-12 w-full md:px-0`}>
                                    {roomData.length > visibleCards && (
                                        <div className="relative group flex-1 md:flex-none w-full md:w-auto">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                                className={`relative bg-white text-[#0c39e0] rounded-full border-2 border-black font-black uppercase tracking-widest hover:bg-slate-50 w-full md:w-auto ${roomData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm whitespace-nowrap`}
                                            >
                                                Show More
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > incrementBy && (
                                        <div className="relative group flex-1 md:flex-none w-full md:w-auto">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => {
                                                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                                    setTimeout(() => {
                                                        setVisibleCards(incrementBy);
                                                    }, 800);
                                                }}
                                                className={`relative bg-white text-[#0c39e0] rounded-full border-2 border-black font-black uppercase tracking-widest hover:bg-slate-50 w-full md:w-auto ${roomData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm whitespace-nowrap`}
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
                                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-start md:justify-center gap-4 md:gap-8 max-w-[1400px] mx-auto px-4 md:px-0 pb-20 md:pb-0 w-full max-h-[480px] overflow-y-auto md:max-h-none md:overflow-visible scrollbar-hide [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] md:[-webkit-mask-image:none] md:[mask-image:none]">
                                    <AnimatePresence mode="popLayout">
                                        {cabData.map((item, index) => (
                                            <ServiceCard
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                onClick={() => setSelectedId(item._id)}
                                                type="cab"
                                                className={index >= visibleCards ? "md:hidden" : ""}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <div className={`hidden md:flex ${cabData.length > visibleCards && visibleCards > incrementBy ? 'flex-row gap-2 px-4' : 'flex-col gap-4'} md:flex-row md:justify-center items-center md:gap-6 mt-12 w-full md:px-0`}>
                                    {cabData.length > visibleCards && (
                                        <div className="relative group flex-1 md:flex-none w-full md:w-auto">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => setVisibleCards(prev => prev + incrementBy)}
                                                className={`relative bg-white text-[#0c39e0] rounded-full border-2 border-black font-black uppercase tracking-widest hover:bg-slate-50 w-full md:w-auto ${cabData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm whitespace-nowrap`}
                                            >
                                                Show More
                                            </button>
                                        </div>
                                    )}
                                    {visibleCards > incrementBy && (
                                        <div className="relative group flex-1 md:flex-none w-full md:w-auto">
                                            <div className="absolute -inset-1 bg-black rounded-full transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                                            <button
                                                onClick={() => {
                                                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                                                    setTimeout(() => {
                                                        setVisibleCards(incrementBy);
                                                    }, 800);
                                                }}
                                                className={`relative bg-white text-[#0c39e0] rounded-full border-2 border-black font-black uppercase tracking-widest hover:bg-slate-50 w-full md:w-auto ${cabData.length > visibleCards && visibleCards > incrementBy ? 'px-2 py-3 text-[10px]' : 'px-10 py-4 text-sm'} md:px-10 md:py-4 md:text-sm whitespace-nowrap`}
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
