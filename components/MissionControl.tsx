'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const missions = [
    { id: 'surveillance', label: 'SURVEILLANCE', content: 'High-altitude loitering with 8K multispectral imaging. Identify targets from 15km with zero acoustic footprint.' },
    { id: 'combat', label: 'COMBAT', content: 'Precision strikes using Hellfire-compatible hardpoints. Autonomous threat designation and engagement protocols.' },
    { id: 'rescue', label: 'RESCUE', content: 'Autonomous supply drops and medevac pathfinding in hostility zones 4 and above.' },
];

export default function MissionControl() {
    const [active, setActive] = useState(missions[0]);

    return (
        <section className="py-24 bg-zinc-900/30 border-t border-white/5 relative overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                    <source src="/videos/extra/mission-bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl font-bold font-space text-white mb-12">MISSION PROFILES</h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {missions.map((mission) => (
                        <button
                            key={mission.id}
                            onClick={() => setActive(mission)}
                            className={`px-8 py-3 rounded-full font-space text-sm font-bold transition-all border ${active.id === mission.id ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}
                        >
                            {mission.label}
                        </button>
                    ))}
                </div>

                <div className="relative min-h-[200px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-black/50 border border-white/10 p-10 rounded-3xl backdrop-blur-md max-w-2xl mx-auto"
                        >
                            <div className="w-12 h-1 bg-blue-500 mb-6 mx-auto" />
                            <p className="font-rajdhani text-2xl text-gray-200 leading-relaxed">
                                {active.content}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
