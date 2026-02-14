'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TacticalCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", (e) => setPosition({ x: e.clientX, y: e.clientY }));
            document.addEventListener("mousedown", () => setClicked(true));
            document.addEventListener("mouseup", () => setClicked(false));

            const linkElements = document.querySelectorAll("a, button, input, .hover-target");
            linkElements.forEach(el => {
                el.addEventListener("mouseenter", () => setHovered(true));
                el.addEventListener("mouseleave", () => setHovered(false));
            });
        };
        addEventListeners();
        return () => { };
    }, []);

    // Hide on mobile
    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
            animate={{
                x: position.x - 16,
                y: position.y - 16,
                scale: clicked ? 0.8 : hovered ? 1.5 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="relative w-full h-full">
                {/* Crosshair */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white transform -translate-y-1/2" />
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white transform -translate-x-1/2" />
                <div className={`absolute inset-0 border border-white rounded-full transition-all duration-300 ${hovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
            </div>
        </motion.div>
    );
}
