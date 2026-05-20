"use client";

import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const XTwitterIcon = ({ size = 24, className = "" }: { size?: number | string, className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export default function Footer() {
    const navLinks = [
        { name: "Home", id: "hero" },
        { name: "Visa", id: "services" },
        { name: "Popular destination", id: "destinations" },
        { name: "Partner with Us", id: "b2b" },
        { name: "Contact Us", id: "contact" },
    ];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer
            className="bg-[#1D4ED8] text-white/60 pb-8 relative overflow-hidden"
            style={{
                clipPath: 'url(#footer-wave-clip)',
                marginTop: '-100px',
                paddingTop: '150px'
            }}
        >
            {/* SVG ClipPath Definition for Physical Cropping */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }} aria-hidden="true">
                <defs>
                    <clipPath id="footer-wave-clip" clipPathUnits="objectBoundingBox">
                        <path d="M0,0.1 
                                 C0.2,0 0.3,0.2 0.5,0.1 
                                 C0.7,0 0.8,0.2 1,0.1 
                                 L1,1 L0,1 Z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="container mx-auto px-6 relative z-10">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12 items-start">
                    
                    {/* TOP SECTION: Logo & Social (Centered on Tablet/Mobile) */}
                    <div className="w-full lg:col-span-1 flex flex-col items-center lg:items-start gap-4 md:gap-6">
                        <Link href="/" className="block relative w-full max-w-[280px] md:max-w-[350px] h-[50px] md:h-[90px]">
                            <Image
                                src="/images/kh-logo-white.png"
                                alt="Khaleefa Holidays Logo"
                                fill
                                className="object-contain object-center lg:object-left"
                                sizes="(max-width: 768px) 280px, 350px"
                                priority
                            />
                        </Link>
                        <div className="flex space-x-3 md:space-x-4">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/khaleefaholidays?igsh=cnE1amZvcWp0ZTBr&utm_source=qr" },
                                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583083937988&mibextid=wwXIfr" },
                                { Icon: XTwitterIcon, href: "#" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/khaleefa-holidays/about/" },
                            ].map(({ Icon, href }, idx) => (
                                <Link
                                    key={idx}
                                    href={href}
                                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-[#1D4ED8] hover:bg-white transition-all duration-300 shadow-sm border border-white/5"
                                >
                                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Split Navigation & Address (Tablet Layout) */}
                    <div className="w-full lg:contents flex flex-col md:flex-row gap-12 md:gap-0 lg:gap-12">
                        {/* COLUMN 2: Navigation (Left on Tablet) */}
                        <div className="w-full md:w-1/2 lg:w-auto flex flex-col items-start lg:items-start">
                            <h4 className="text-white/40 text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] mb-4 md:mb-8">Navigation</h4>
                            <ul className="flex flex-col items-start gap-3 md:gap-5 text-[12px] md:text-[15px] font-black text-white/60 uppercase tracking-[0.2em]">
                                {navLinks.map((link) => (
                                    <li key={link.id}>
                                        <button
                                            onClick={() => scrollToSection(link.id)}
                                            className="hover:text-white transition-colors whitespace-nowrap text-left"
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COLUMN 3: Address & Contact (Right on Tablet) */}
                        <div className="w-full md:w-1/2 lg:w-auto flex flex-col items-start lg:items-start">
                            <h4 className="text-white/40 text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] mb-4 md:mb-8">Connect</h4>
                            <div className="flex flex-col items-start lg:items-start gap-3 md:gap-5 text-[12px] md:text-[15px] font-black text-white/60 uppercase tracking-widest leading-relaxed">
                                <div className="flex items-center gap-3 md:gap-4 flex-row w-full max-w-full justify-start">
                                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-white shrink-0 opacity-40 order-first" />
                                    <a href="https://maps.app.goo.gl/97qePRPpddCfkvEW9" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 text-left break-words whitespace-normal leading-tight hover:text-white transition-colors">
                                        2nd Floor, Mecheri Tower, Pattambi Road, Koppam, Pin 679307
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 flex-row w-full max-w-full justify-start">
                                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white shrink-0 opacity-40 order-first" />
                                    <span className="flex-1 min-w-0 text-left break-words whitespace-normal leading-tight">+91 70121 66 800</span>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 flex-row w-full max-w-full justify-start">
                                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-white shrink-0 opacity-40 order-first" />
                                    <span className="flex-1 min-w-0 text-left break-words whitespace-normal leading-tight">info@khaleefaholidays.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM DIV: Centered Details */}
                <div className="flex flex-col items-center text-center gap-4 md:gap-6">
                    <div className="flex flex-col items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.1em]">
                        <p className="">&copy; {new Date().getFullYear()} Khaleefa Holidays. All Rights Reserved.</p>
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <div className="w-1 h-1 bg-white/10 rounded-full opacity-20" />
                            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
