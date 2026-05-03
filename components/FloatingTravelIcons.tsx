"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plane, Map, Camera, Compass, Ticket, Luggage, Umbrella, Globe, Sun, Ship, MapPin, Backpack } from "lucide-react";

const ICONS = [
    { Icon: Plane, color: "text-[#18189C]" },
    { Icon: Map, color: "text-[#6A9BFF]" },
    { Icon: Camera, color: "text-[#FFA726]" },
    { Icon: Compass, color: "text-[#B388FF]" },
    { Icon: Ticket, color: "text-[#FF5252]" },
    { Icon: Luggage, color: "text-[#4CAF50]" },
    { Icon: Umbrella, color: "text-[#FF4081]" },
    { Icon: Globe, color: "text-[#00BCD4]" },
    { Icon: Sun, color: "text-[#FFD740]" },
    { Icon: Ship, color: "text-[#795548]" },
    { Icon: MapPin, color: "text-[#FF9800]" },
    { Icon: Backpack, color: "text-[#8BC34A]" }
];

export default function FloatingTravelIcons() {
    const [icons, setIcons] = useState<any[]>([]);

    useEffect(() => {
        // Generate random icons on client to avoid hydration mismatch
        const generated = ICONS.map((item, i) => ({
            id: i,
            Icon: item.Icon,
            color: item.color,
            top: `${Math.floor(Math.random() * 90) + 5}%`,
            left: `${Math.floor(Math.random() * 90) + 5}%`,
            size: Math.floor(Math.random() * 20) + 24, // 24px to 44px
            opacity: Math.random() * 0.15 + 0.1, // 0.10 to 0.25 opacity
            delay: Math.random() * 5,
            duration: Math.random() * 20 + 20, // 20s to 40s duration
        }));
        setIcons(generated);
    }, []);

    if (icons.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {icons.map((item) => {
                const IconComponent = item.Icon;
                return (
                    <motion.div
                        key={item.id}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 30, 0],
                            rotate: [0, 15, -15, 0]
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            delay: item.delay,
                            ease: "easeInOut"
                        }}
                        className={`absolute flex items-center justify-center ${item.color}`}
                        style={{
                            top: item.top,
                            left: item.left,
                            opacity: item.opacity
                        }}
                    >
                        <IconComponent size={item.size} strokeWidth={1.5} />
                    </motion.div>
                );
            })}
        </div>
    );
}
ease: "easeInOut" 
                    }}
className = "absolute flex items-center justify-center mix-blend-multiply"
style = {{
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
                </motion.div >
            ))}
        </div >
    );
}
