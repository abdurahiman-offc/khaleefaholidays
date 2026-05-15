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
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

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
    const doubledFeedbacks = [...displayFeedbacks, ...displayFeedbacks];

    // Reset index if out of bounds when data changes
    useEffect(() => {
        if (activeIndex >= displayFeedbacks.length) {
            setActiveIndex(0);
        }
    }, [displayFeedbacks.length, activeIndex]);

    // Auto-swipe logic for mobile/tablet
    useEffect(() => {
        if (displayFeedbacks.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % displayFeedbacks.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [displayFeedbacks.length]);

    if (loading) {
        return (
            <section className="py-24 bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#0c39e0]" />
            </section>
        );
    }

    return (
        <section id="reviews" className="pt-[75px] pb-[75px] bg-transparent relative overflow-hidden contain-paint">
            {/* Background Effect */}
            <SectionBackground />

            <div className="flex items-center justify-center pt-10 pb-6 md:pt-20 md:pb-12">
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

            <div className="container mx-auto px-6 mt-10 md:mt-16">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {displayFeedbacks.map((item, index) => (
                        <FeedbackCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeedbackCard({ item }: { item: Feedback }) {
    if (!item) return null;

    return (
        <div
            className="relative flex flex-col bg-[#F5F5F5]/60 backdrop-blur-xl p-8 rounded-[32px] md:rounded-[40px] border-[8px] md:border-[10px] border-white h-full w-full sm:w-[380px]"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-[#0c39e0] shrink-0 shadow-sm border border-slate-100">
                    <User size={28} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 uppercase tracking-tight">{item.name || 'Anonymous'}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.place || 'Traveler'}</p>
                </div>
            </div>

            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className={i < (item.stars || 0) ? "fill-[#FFB800] text-[#FFB800]" : "text-slate-200"}
                    />
                ))}
            </div>

            <p className="text-base text-slate-600 leading-relaxed font-medium italic">
                "{item.feedback || 'No feedback provided'}"
            </p>
        </div>
    );
}
