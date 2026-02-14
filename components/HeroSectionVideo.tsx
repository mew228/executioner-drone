'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { droneData } from '@/data/droneData';

export default function HeroSectionVideo() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
                <source src={droneData.hero.videoPath} type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[32rem] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

            <div className="relative z-10 h-full max-w-[1920px] mx-auto px-12">
                {/* Top HUD */}
                <div className="absolute top-28 left-0 right-0 flex justify-between px-12 pointer-events-none">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="font-space font-bold text-xs tracking-[0.2em]">LIVE FEED</span>
                    </div>
                    <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/10">
                        <div className="text-right"><p className="text-xs font-bold font-space">CPT. NATH</p><p className="text-[10px] text-white/50 uppercase">COMMAND</p></div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">👨✈️</div>
                    </div>

                </div>

                {/* Floating Weapon Tag */}
                <div className="absolute top-[40%] left-[20%] hidden lg:flex flex-col items-center gap-2 pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold font-space">VULCAN M134 ROTARY</span>
                    </div>
                    <div className="h-24 w-[1px] bg-gradient-to-b from-blue-500/50 to-transparent dashed-line" />
                </div>

                {/* Bottom Right Telemetry */}
                <div className="absolute bottom-12 right-12 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 w-80 shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className="relative w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white/80 animate-spin-slow" />
                            <div className="absolute inset-0 flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full" /></div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-space text-white/40 tracking-widest">HEADING</p>
                            <p className="text-5xl font-bold font-space">182°</p>
                            <p className="text-xs text-blue-400 font-bold tracking-widest mt-1">LOCKED</p>
                        </div>
                    </div>
                </div>

                {/* Main Title - Bottom Left */}
                <div className="absolute bottom-12 left-12 max-w-5xl pointer-events-none">
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <div className="relative">
                            <h1 data-text="THE EXECUTIONER" className="glitch text-[5rem] md:text-[9rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/40 leading-[0.8] tracking-tighter drop-shadow-2xl">THE<br />EXECUTIONER</h1>
                        </div>
                        <div className="mt-8 pl-6 border-l-2 border-white/40 pointer-events-auto">
                            <p className="text-xl font-rajdhani text-gray-200">{droneData.hero.subtitle}</p>
                            <div className="flex gap-4 mt-6">
                                <button className="px-8 py-3 bg-white text-black font-bold font-space text-sm tracking-widest rounded transition hover:scale-105">INITIATE</button>
                                <button className="px-8 py-3 border border-white/30 text-white font-bold font-space text-sm tracking-widest rounded backdrop-blur-md hover:bg-white/10">SPECS</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
