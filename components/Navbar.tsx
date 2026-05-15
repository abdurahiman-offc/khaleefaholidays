"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Plane, Map, Handshake, PhoneCall, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

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
            <div className="container mx-auto px-6 flex lg:justify-center items-center relative">
                {/* Modern Combined Capsule - Desktop: Pill, Tablet/Mobile: Transparent/Split */}
                <div className={`flex items-center justify-between lg:justify-start w-full lg:w-auto bg-transparent lg:bg-white/10 lg:backdrop-blur-lg lg:rounded-full lg:px-8 lg:py-2.5 lg:border lg:border-white/20 relative transition-all duration-500 lg:shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]`}>

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
                    <div className="hidden lg:block h-6 w-[1px] bg-white/20 mx-10" />

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-10 relative z-10">
                        {navLinks.map(({ name, id, icon: Icon }) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => scrollToSection(id)}
                                className={`flex items-center gap-2.5 transition-all text-[11px] font-bold uppercase tracking-[0.25em] group/link ${activeSection === id
                                    ? "text-[#1D4ED8]"
                                    : "text-[#4B5563] hover:text-[#1D4ED8]"
                                    }`}
                            >
                                <Icon size={14} className={`${activeSection === id ? "text-[#1D4ED8]" : "text-[#9CA3AF] group-hover/link:text-[#1D4ED8]"} transition-colors`} />
                                <span>{name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-[#1D4ED8] p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}
            >
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Sidebar Drawer */}
                <div
                    className={`absolute top-0 right-0 h-full w-[300px] bg-white/80 backdrop-blur-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.05)] border-l border-white/20 transition-transform duration-500 ease-out p-8 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="flex justify-between items-center mb-16">
                        <div className="relative w-[120px] h-[35px]">
                            <Image src="/images/kh-logo-blue.png" alt="Logo" fill className="object-contain" />
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#1D4ED8]">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-8">
                        {navLinks.map(({ name, id, icon: Icon }) => (
                            <button
                                key={name}
                                onClick={() => scrollToSection(id)}
                                className={`flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] transition-all group ${activeSection === id ? "text-[#1D4ED8]" : "text-[#4B5563] hover:text-[#1D4ED8]"
                                    }`}
                            >
                                <div className={`p-3 rounded-xl transition-all ${activeSection === id ? "bg-[#1D4ED8] text-white shadow-lg" : "bg-white text-[#9CA3AF] border border-slate-100 group-hover:border-[#1D4ED8]/30 group-hover:text-[#1D4ED8]"}`}>
                                    <Icon size={18} />
                                </div>
                                <span>{name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Follow Us</p>
                        <div className="flex justify-center gap-4">
                            {[
                                { Icon: Instagram, href: "#" },
                                { Icon: Facebook, href: "#" },
                                { Icon: Twitter, href: "#" },
                                { Icon: Linkedin, href: "#" },
                            ].map(({ Icon, href }, idx) => (
                                <Link
                                    key={idx}
                                    href={href}
                                    className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-400 hover:text-white hover:bg-[#1D4ED8] hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-[#1D4ED8]"
                                >
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
