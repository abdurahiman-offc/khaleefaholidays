"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Plane, Map, Handshake, PhoneCall } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    const navLinks = [
        { name: "Home", id: "hero", icon: Home },
        { name: "Visa", id: "services", icon: Plane },
        { name: "Destination", id: "destinations", icon: Map },
        { name: "B2B", id: "b2b", icon: Handshake },
        { name: "Contact", id: "contact", icon: PhoneCall },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const scrollPos = window.scrollY + 150;
            let current = "hero";

            for (const link of navLinks) {
                const element = document.getElementById(link.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        current = link.id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: id === "hero" ? 0 : offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-2" : "py-4"}`}>
            <div className="container mx-auto px-6 flex justify-center items-center relative">

                {/* Modern Combined Capsule (No Glow/Shadow) */}
                <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 lg:px-8 py-1.5 lg:py-2.5 border border-black/10 relative overflow-hidden group transition-all duration-500">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                        <div className="relative w-[130px] lg:w-[150px] h-[35px] lg:h-[45px]">
                            <Image
                                src="/images/kh-logo-blue.png"
                                alt="Khaleefa Holidays Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Minimalist Divider */}
                    <div className="hidden lg:block h-6 w-[1px] bg-black/10 mx-10" />

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-10 relative z-10">
                        {navLinks.map(({ name, id, icon: Icon }) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => scrollToSection(id)}
                                className={`flex items-center gap-2.5 transition-all text-[11px] font-bold uppercase tracking-[0.25em] group/link ${activeSection === id
                                        ? "text-[#1e1e89]"
                                        : "text-[#4B5563] hover:text-[#1e1e89]"
                                    }`}
                            >
                                <Icon size={14} className={`${activeSection === id ? "text-[#1e1e89]" : "text-[#9CA3AF] group-hover/link:text-[#1e1e89]"} transition-colors`} />
                                <span>{name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden ml-4 text-[#1e1e89] p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
                <div className="flex flex-col items-center justify-center h-full space-y-10 px-6">
                    {navLinks.map(({ name, id, icon: Icon }) => (
                        <button
                            key={name}
                            onClick={() => scrollToSection(id)}
                            className={`flex items-center gap-5 text-2xl font-bold uppercase tracking-[0.3em] transition-all ${activeSection === id ? "text-[#1e1e89] scale-110" : "text-[#4B5563]"
                                }`}
                        >
                            <Icon size={28} />
                            <span>{name}</span>
                        </button>
                    ))}
                    <button onClick={() => setIsMobileMenuOpen(false)} className="mt-12 p-4 bg-[#1e1e89] text-white rounded-full">
                        <X size={32} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
