'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Zap, Radio, ScanLine } from 'lucide-react';

const MODULES = {
    optics: [
        { id: 'std', name: 'Std. Optical', speedMod: 0, rangeMod: 0, desc: 'Standard 4K visual spectrum sensor.' },
        { id: 'multi', name: 'Multispectral 8K', speedMod: -5, rangeMod: 10, desc: 'Thermal + Night Vision. +10km Detection.' },
        { id: 'lidar', name: 'LIDAR Array', speedMod: -8, rangeMod: 5, desc: '3D Mapping & Autonomous threading.' },
    ],
    payload: [
        { id: 'none', name: 'Clean Wing', speedMod: 20, payloadMod: 0, desc: 'Max aerodynamic efficiency.' },
        { id: 'hellfire', name: 'AGM-114 Hellfire', speedMod: -15, payloadMod: 50, desc: 'Anti-armor capability. 8km range.' },
        { id: 'supply', name: 'Tac-Resupply', speedMod: -10, payloadMod: 100, desc: 'Emergency medical & ammo drops.' },
    ],
    comms: [
        { id: 'rf', name: 'RF Standard', speedMod: 0, rangeMod: 0, desc: 'Line-of-sight encrypted link.' },
        { id: 'sat', name: 'SATCOM Global', speedMod: -2, rangeMod: 500, desc: 'Global operational range via Starlink.' },
    ]
};

export default function PayloadConfigurator() {
    const [config, setConfig] = useState({
        optics: MODULES.optics[0],
        payload: MODULES.payload[0],
        comms: MODULES.comms[0]
    });

    // Base Stats
    const baseStats = { speed: 160, range: 400, payloadCap: 200 };

    const currentStats = {
        speed: baseStats.speed + config.optics.speedMod + config.payload.speedMod + config.comms.speedMod,
        range: baseStats.range + config.optics.rangeMod + config.comms.speedMod * 2, // Arbitrary math
        payload: baseStats.payloadCap + (config.payload.payloadMod > 0 ? config.payload.payloadMod : 0)
    };

    return (
        <section className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-space font-bold text-white mb-2">PAYLOAD <span className="text-exec-blue">CONFIGURATOR</span></h2>
                    <p className="text-gray-400 font-rajdhani">CUSTOMIZE MISSION PARAMETERS</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 items-center">

                    {/* Left: Modules */}
                    <div className="space-y-8">
                        {/* Optics Selector */}
                        <div className="space-y-3">
                            <h3 className="font-space text-sm text-exec-blue flex items-center gap-2"><ScanLine size={16} /> OPTICS PACKAGE</h3>
                            <div className="grid gap-2">
                                {MODULES.optics.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setConfig({ ...config, optics: opt })}
                                        className={`p-3 text-left border rounded hover:bg-white/5 transition-all ${config.optics.id === opt.id ? 'border-exec-blue bg-exec-blue/10 text-white' : 'border-white/10 text-gray-500'}`}
                                    >
                                        <div className="text-sm font-bold">{opt.name}</div>
                                        <div className="text-[10px] opacity-70">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payload Selector */}
                        <div className="space-y-3">
                            <h3 className="font-space text-sm text-exec-blue flex items-center gap-2"><Crosshair size={16} /> HARDPOINTS</h3>
                            <div className="grid gap-2">
                                {MODULES.payload.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setConfig({ ...config, payload: opt })}
                                        className={`p-3 text-left border rounded hover:bg-white/5 transition-all ${config.payload.id === opt.id ? 'border-exec-blue bg-exec-blue/10 text-white' : 'border-white/10 text-gray-500'}`}
                                    >
                                        <div className="text-sm font-bold">{opt.name}</div>
                                        <div className="text-[10px] opacity-70">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center: Visualization */}
                    <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
                        {/* Rotating ring behind drone */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[80%] h-[80%] border border-dashed border-white/10 rounded-full animate-spin-slow opacity-30" />
                            <div className="w-[60%] h-[60%] border border-white/5 rounded-full" />
                        </div>

                        {/* Drone Image */}
                        <motion.img
                            key={config.payload.id} // Animate on change
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            src="/images/extra/drone-blueprint.png"
                            alt="Drone Blueprint"
                            className="relative z-10 w-full object-contain drop-shadow-[0_0_30px_rgba(0,122,255,0.3)]"
                        />

                        {/* Overlay Labels */}
                        <AnimatePresence>
                            <motion.div
                                key={config.optics.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-1/4 left-0 bg-black/80 border border-white/20 p-2 text-xs"
                            >
                                OPTICS: {config.optics.name}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Stats & Comms */}
                    <div className="space-y-8">
                        {/* Comms Selector */}
                        <div className="space-y-3">
                            <h3 className="font-space text-sm text-exec-blue flex items-center gap-2"><Radio size={16} /> DATALINK</h3>
                            <div className="grid gap-2">
                                {MODULES.comms.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setConfig({ ...config, comms: opt })}
                                        className={`p-3 text-left border rounded hover:bg-white/5 transition-all ${config.comms.id === opt.id ? 'border-exec-blue bg-exec-blue/10 text-white' : 'border-white/10 text-gray-500'}`}
                                    >
                                        <div className="text-sm font-bold">{opt.name}</div>
                                        <div className="text-[10px] opacity-70">{opt.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Live Stats */}
                        <div className="border border-white/10 bg-white/5 p-6 rounded-xl space-y-6">
                            <h3 className="font-space text-lg text-white border-b border-white/10 pb-2">PREDICTED PERFORMANCE</h3>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">MAX SPEED</span>
                                    <span className="text-white font-bold">{currentStats.speed} KTS</span>
                                </div>
                                <div className="h-1 bg-white/10 w-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${(currentStats.speed / 200) * 100}%` }}
                                        className="h-full bg-exec-blue"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">OP. RANGE</span>
                                    <span className="text-white font-bold">{currentStats.range > 800 ? 'GLOBAL' : `${currentStats.range} KM`}</span>
                                </div>
                                <div className="h-1 bg-white/10 w-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${Math.min((currentStats.range / 1000) * 100, 100)}%` }}
                                        className={`h-full ${currentStats.range > 800 ? 'bg-purple-500' : 'bg-green-500'}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">PAYLOAD CAP.</span>
                                    <span className="text-white font-bold">{currentStats.payload} KG</span>
                                </div>
                                <div className="h-1 bg-white/10 w-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${(currentStats.payload / 400) * 100}%` }}
                                        className="h-full bg-orange-500"
                                    />
                                </div>
                            </div>

                            <button className="w-full py-3 bg-exec-blue text-white font-bold font-space uppercase hover:bg-blue-600 transition-colors">
                                SAVE CONFIGURATION
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
