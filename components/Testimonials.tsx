"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, Loader2 } from "lucide-react";
import SectionBackground from "./SectionBackground";

interface Feedback {
    _id?: string;
    name: string;
    place: string;
    stars: number;
    feedback: string;
    createdAt?: string;
}

const fallbackTestimonials: Feedback[] = [
    {
        name: "Sarah Mitchell",
        place: "New York, USA",
        stars: 5,
        feedback: "Bookease revolutionized how I plan my trips. The curated locations are simply breathtaking, and the booking process is seamless.",
    },
    {
        name: "David Chen",
        place: "Toronto, Canada",
        stars: 5,
        feedback: "I've never had a smoother travel experience. The tailored itineraries were spot on for my family's needs.",
    },
    {
        name: "Elena Rodriguez",
        place: "Madrid, Spain",
        stars: 4,
        feedback: "Great app with amazing customer support. Highly recommend for anyone looking to explore new places without the hassle.",
    },
    {
        name: "James Wilson",
        place: "London, UK",
        stars: 5,
        feedback: "Absolutely incredible service. From visa processing to the actual tour, everything was handled professionally.",
    },
    {
        name: "Ananya Rao",
        place: "Mumbai, India",
        stars: 5,
        feedback: "Khaleefa Holidays made our dream vacation a reality. Their attention to detail is unmatched in the industry.",
    },
    {
        name: "Marcus Weber",
        place: "Berlin, Germany",
        stars: 5,
        feedback: "Fast, reliable, and premium. The B2B options are especially impressive for corporate travel needs.",
    }
];

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isInteracting = useRef(false);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await fetch("/api/testimonials");
                const data = await res.json();
                if (data.success && data.data.length > 0) {
                    setFeedbacks(data.data);
                } else {
                    setFeedbacks(fallbackTestimonials);
                }
            } catch (error) {
                console.error("Failed to fetch feedbacks", error);
                setFeedbacks(fallbackTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    // Duplicate feedbacks for seamless loop on desktop
    const displayFeedbacks = feedbacks.length > 0 ? feedbacks : fallbackTestimonials;

    // Smooth continuous auto-scroll logic for mobile
    useEffect(() => {
        if (displayFeedbacks.length === 0) return;
        
        let animationId: number;
        let exactScrollLeft = scrollRef.current ? scrollRef.current.scrollLeft : 0;
        let lastTime = performance.now();
        
        const smoothScroll = (time: number) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            if (scrollRef.current && !isInteracting.current) {
                const container = scrollRef.current;
                const isMobile = window.innerWidth < 768;
                
                if (isMobile) {
                    // If user manually swiped, resync the exactScrollLeft
                    if (Math.abs(container.scrollLeft - exactScrollLeft) > 2) {
                        exactScrollLeft = container.scrollLeft;
                    }
                    
                    exactScrollLeft += deltaTime * 0.05; // ~50px per second for a smooth readable flow
                    container.scrollLeft = exactScrollLeft;
                    
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    if (container.scrollLeft >= maxScroll - 10) {
                        // Silently jump back to the middle of the track
                        exactScrollLeft = container.scrollWidth / 2;
                        container.scrollLeft = exactScrollLeft;
                    }
                }
            }
            animationId = requestAnimationFrame(smoothScroll);
        };
        
        animationId = requestAnimationFrame(smoothScroll);
        return () => cancelAnimationFrame(animationId);
    }, [displayFeedbacks.length]);

    // Create a multiplied array for infinite mobile scrolling
    const infiniteFeedbacks = Array(12).fill(displayFeedbacks).flat();

    if (loading) {
        return (
            <section className="py-24 bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#0c39e0]" />
            </section>
        );
    }

    return (
        <section id="reviews" className="pt-[50px] md:pt-[75px] pb-0 md:pb-[75px] bg-transparent relative overflow-hidden contain-paint">
            {/* Background Effect */}
            <SectionBackground />

            <div className="flex flex-col items-center justify-center pt-10 pb-6 md:pt-20 md:pb-12">
                <div className="flex gap-2 md:gap-4 mb-2 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.3, scale: 0.8 }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.15, 0.8] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3, // Sequential shine effect
                                ease: "easeInOut"
                            }}
                        >
                            <Star className="w-6 h-6 md:w-10 md:h-10 text-white/65 drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)]" fill="currentColor" />
                        </motion.div>
                    ))}
                </div>
                <div className="relative inline-block text-center">
                    {/* Background stretched text */}
                    <h2
                        className="font-oswald text-[40px] md:text-[60px] lg:text-[85px] font-bold text-white/65 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] drop-shadow-[0_8px_32px_rgba(255,255,255,0.2)] uppercase select-none pointer-events-none leading-none whitespace-nowrap"
                        style={{ transform: 'scaleY(1.6)', letterSpacing: '-4px' }}
                    >
                        From Our Valued Clients
                    </h2>

                    {/* Top cursive text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="font-satisfy-local text-[42px] md:text-[55px] lg:text-[80px] text-[#1D4ED8] whitespace-nowrap leading-none mt-4 md:mt-8">
                            Trusted Stories
                        </h2>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-0 md:px-6 mt-8 md:mt-16">
                <div 
                    ref={scrollRef}
                    onTouchStart={() => { isInteracting.current = true; }}
                    onTouchEnd={() => { setTimeout(() => { isInteracting.current = false; }, 800); }}
                    onMouseEnter={() => { isInteracting.current = true; }}
                    onMouseLeave={() => { isInteracting.current = false; }}
                    className="flex overflow-x-auto gap-4 md:gap-12 px-6 md:px-0 pb-8 md:pb-0 md:flex-wrap md:justify-center md:overflow-visible w-full [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {infiniteFeedbacks.map((item, index) => {
                        const isDuplicate = index >= displayFeedbacks.length;
                        return (
                            <div 
                                key={index} 
                                className={`shrink-0 flex w-[250px] sm:w-[280px] md:w-[380px] md:shrink h-auto ${isDuplicate ? 'md:hidden' : ''}`}
                            >
                                <FeedbackCard item={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function FeedbackCard({ item }: { item: Feedback }) {
    if (!item) return null;

    return (
        <div
            className="relative flex flex-col bg-white/10 backdrop-blur-lg p-5 md:p-8 rounded-[24px] md:rounded-[40px] border border-white/20 h-full w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_48px_rgba(0,0,0,0.08)]"
        >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white/40 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-[#0c39e0] shrink-0 shadow-sm border border-white/50">
                    <User className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div>
                    <h4 className="font-bold text-[13px] md:text-base text-slate-900 uppercase tracking-tight">{item.name || 'Anonymous'}</h4>
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.place || 'Traveler'}</p>
                </div>
            </div>

            <div className="relative z-10 flex gap-1 mb-3 md:mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i < (item.stars || 0) ? "fill-[#FFB800] text-[#FFB800]" : "text-slate-200"}`}
                    />
                ))}
            </div>

            <p className="relative z-10 text-[13px] md:text-base text-slate-600 leading-relaxed font-medium italic">
                "{item.feedback || 'No feedback provided'}"
            </p>
        </div>
    );
}
