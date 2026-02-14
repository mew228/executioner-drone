'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Helper Component for Vision Toggles
const VisionButton = ({ mode, label }: { mode: 'standard' | 'night-vision' | 'thermal', label: string }) => {
    const { visionMode, setVisionMode } = useTheme();
    const isActive = visionMode === mode;

    return (
        <button
            onClick={() => setVisionMode(mode)}
            className={`px-3 py-1 rounded text-[10px] font-bold font-space transition-colors ${isActive ? 'bg-exec-blue text-white' : 'text-gray-400 hover:text-white'
                }`}
        >
            {label}
        </button>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to check initial position
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }} animate={{ y: 0 }}
                className="fixed top-0 left-0 right-0 z-50 pt-6 px-6"
            >
                <div className={`mx-auto transition-all duration-500 ease-in-out ${scrolled
                        ? 'max-w-full bg-black/40 backdrop-blur-2xl border-b border-white/5 py-3 px-8'
                        : 'max-w-7xl bg-white/5 backdrop-blur-md border border-white/10 py-3 px-6 rounded-full'
                    }`}>
                    <div className="flex justify-between items-center px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold">N</span>
                            </div>
                            <span className="font-space font-bold tracking-widest text-white">NATH INDUSTRIES</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex gap-8">
                            {['OVERVIEW', 'SPECS', 'CONTACT'].map((item) => (
                                <a key={item} href="#" className="font-rajdhani text-sm tracking-wide text-white/70 hover:text-white transition glitch" data-text={item}>{item}</a>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Vision Toggles */}
                            <div className="hidden lg:flex bg-white/10 rounded-lg p-1 gap-1">
                                <VisionButton mode="standard" label="STD" />
                                <VisionButton mode="night-vision" label="NVG" />
                                <VisionButton mode="thermal" label="THRM" />
                            </div>

                            <button className={`hidden md:block px-5 py-2 font-bold font-space text-xs rounded-lg transition ${scrolled ? 'bg-white text-black' : 'bg-white text-black hover:shadow-[0_0_15px_white]'}`}>
                                INQUIRE
                            </button>

                            {/* Mobile Toggle */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 flex items-center justify-center bg-white/10 rounded-full cursor-none">
                                <div className="space-y-1.5 pointer-events-none">
                                    <div className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                    <div className={`w-4 h-0.5 bg-white transition-all ml-auto ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                                    <div className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 90% 40px)" }}
                        animate={{ clipPath: "circle(150% at 90% 40px)" }}
                        exit={{ clipPath: "circle(0% at 90% 40px)" }}
                        transition={{ type: "spring", stiffness: 20, damping: 10 }}
                        className="fixed inset-0 bg-black z-40 flex items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {['OVERVIEW', 'SPECS', 'CONTACT', 'INQUIRE'].map((item) => (
                                <a key={item} href="#" onClick={() => setMobileMenuOpen(false)} className="font-space text-3xl font-bold text-white hover:text-blue-500 transition cursor-none">{item}</a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
