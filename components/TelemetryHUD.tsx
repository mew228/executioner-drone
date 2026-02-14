'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function TelemetryHUD() {
    const { scrollYProgress } = useScroll();
    const altitude = useTransform(scrollYProgress, [0, 1], [0, 45000]);
    const [currentTime, setCurrentTime] = useState('');
    const [coords, setCoords] = useState({ lat: 34.0522, lng: -118.2437 });

    // Update time and pseudo-coords
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toISOString().split('T')[1].split('.')[0] + 'Z');

            setCoords(prev => ({
                lat: prev.lat + (Math.random() - 0.5) * 0.001,
                lng: prev.lng + (Math.random() - 0.5) * 0.001
            }));
        }, 100);
        return () => clearInterval(timer);
    }, []);

    // Formatted altitude
    const [displayedAlt, setDisplayedAlt] = useState(0);
    useEffect(() => {
        const unsubscribe = altitude.on('change', (v) => setDisplayedAlt(Math.floor(v)));
        return unsubscribe;
    }, [altitude]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden font-space text-[10px] md:text-xs text-exec-blue/60 mix-blend-screen select-none">
            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l border-t border-exec-blue/50" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r border-t border-exec-blue/50" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l border-b border-exec-blue/50" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r border-b border-exec-blue/50" />

            {/* Left Column: Altitude & System */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-8 hidden lg:block">
                <div>
                    <p className="opacity-50 mb-1">ALTITUDE</p>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold">{displayedAlt.toString().padStart(5, '0')}</span>
                        <span className="mb-1 text-[10px]">FT</span>
                    </div>
                    {/* Vertical Bar */}
                    <div className="h-32 w-1 bg-exec-blue/20 mt-2 relative">
                        <motion.div
                            style={{ height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                            className="w-full bg-exec-blue absolute bottom-0"
                        />
                    </div>
                </div>

                <div>
                    <p className="opacity-50 mb-1">SYSTEM_integrity</p>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-4 bg-exec-blue"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Coordinates & Time */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-8 text-right hidden lg:block">
                <div>
                    <p className="opacity-50 mb-1">GPS_COORDS</p>
                    <p>{coords.lat.toFixed(6)} N</p>
                    <p>{coords.lng.toFixed(6)} W</p>
                </div>

                <div>
                    <p className="opacity-50 mb-1">MISSION_CLOCK</p>
                    <p className="text-xl tracking-widest">{currentTime}</p>
                </div>
            </div>

            {/* Bottom Center: Speed/Status */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-12 text-center">
                <div>
                    <p className="opacity-50">SPEED</p>
                    <p className="text-white">MACH 0.8</p>
                </div>
                <div>
                    <p className="opacity-50">STATUS</p>
                    <p className="text-emerald-400 animate-pulse">LIVE_FEED</p>
                </div>
                <div>
                    <p className="opacity-50">LINK</p>
                    <p className="text-white">ENCRYPTED</p>
                </div>
            </div>

            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0V40M0 20H40" stroke="currentColor" strokeWidth="1" />
                    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>
        </div>
    );
}
