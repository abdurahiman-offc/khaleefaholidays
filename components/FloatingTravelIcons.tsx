"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SVGS = [
    "https://api.iconify.design/fluent-emoji/airplane.svg",
    "https://api.iconify.design/fluent-emoji/luggage.svg",
    "https://api.iconify.design/fluent-emoji/camera-with-flash.svg",
    "https://api.iconify.design/fluent-emoji/world-map.svg",
    "https://api.iconify.design/fluent-emoji/ticket.svg",
    "https://api.iconify.design/fluent-emoji/umbrella-on-ground.svg",
    "https://api.iconify.design/fluent-emoji/globe-showing-europe-africa.svg",
    "https://api.iconify.design/fluent-emoji/passenger-ship.svg",
    "https://api.iconify.design/fluent-emoji/compass.svg",
    "https://api.iconify.design/fluent-emoji/tent.svg",
    "https://api.iconify.design/fluent-emoji/desert-island.svg",
    "https://api.iconify.design/fluent-emoji/sun-with-face.svg",
    "https://api.iconify.design/fluent-emoji/backpack.svg",
    "https://api.iconify.design/fluent-emoji/automobile.svg",
    "https://api.iconify.design/fluent-emoji/hotel.svg",
];

export default function FloatingTravelIcons() {
    const [icons, setIcons] = useState<any[]>([]);

    useEffect(() => {
        // Uniform distribution: Create a grid
        const cols = 4;
        const rows = 12; // Spread across a long scrollable page
        const total = cols * rows;

        const generated = Array.from({ length: total }).map((_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);

            // Add random jitter to grid positions (±10%)
            const jitterX = (Math.random() - 0.5) * 15;
            const jitterY = (Math.random() - 0.5) * 5;

            const left = `${(col * (100 / cols)) + (100 / cols / 2) + jitterX}%`;
            const top = `${(row * (100 / rows)) + (100 / rows / 2) + jitterY}%`;

            return {
                id: i,
                src: SVGS[Math.floor(Math.random() * SVGS.length)],
                top: top,
                left: left,
                size: Math.floor(Math.random() * 40) + 40, // 40px to 80px
                opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 for vibrancy
                delay: Math.random() * 5,
                duration: Math.random() * 20 + 20,
            };
        });
        setIcons(generated);
    }, []);

    if (icons.length === 0) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {icons.map((item) => (
                <motion.div
                    key={item.id}
                    animate={{ 
                        y: [0, -60, 0], 
                        x: [0, 40, 0], 
                        rotate: [0, 20, -20, 0] 
                    }}
                    transition={{ 
                        duration: item.duration, 
                        repeat: Infinity, 
                        delay: item.delay, 
                        ease: "easeInOut" 
                    }}
                    className="absolute flex items-center justify-center mix-blend-multiply"
                    style={{ 
                        top: item.top, 
                        left: item.left, 
                        opacity: item.opacity 
                    }}
                >
                    <img 
                        src={item.src} 
                        alt="Travel icon" 
                        style={{ width: item.size, height: item.size }} 
                    />
                </motion.div>
            ))}
        </div>
    );
}
