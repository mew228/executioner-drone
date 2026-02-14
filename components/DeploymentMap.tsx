'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const DEPLOYMENTS = [
    { id: 1, x: 25, y: 35, label: "PACIFIC_OUTPOST", active: true },
    { id: 2, x: 55, y: 30, label: "EURO_DEFENSE", active: true },
    { id: 3, x: 45, y: 60, label: "AFRICA_SURVEILLANCE", active: false },
    { id: 4, x: 75, y: 45, label: "ASIA_MONITOR", active: true },
];

export default function DeploymentMap() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section className="relative w-full h-[600px] bg-black overflow-hidden border-t border-white/10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('/images/extra/deployment-map.png')" }}
            >
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
            </div>

            <div className="absolute inset-0 z-10 p-12">
                <h2 className="text-3xl font-space font-bold text-white mb-2">LIVE OPERATIONS</h2>
                <div className="flex gap-4 items-center mb-8">
                    <span className="animate-pulse w-3 h-3 bg-red-500 rounded-full" />
                    <p className="text-xs font-mono text-red-500 tracking-widest">REALTIME_SATELLITE_FEED</p>
                </div>

                {/* Map Interactive Area (Absolute positioning relative to container) */}
                <div className="absolute inset-0 top-32">
                    {DEPLOYMENTS.map((dept) => (
                        <div
                            key={dept.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                            style={{ left: `${dept.x}%`, top: `${dept.y}%` }}
                            onClick={() => setSelected(dept.id)}
                        >
                            {/* Marker */}
                            <div className="relative">
                                <div className={`w-4 h-4 rounded-full border-2 ${dept.active ? 'border-red-500 bg-red-500/20' : 'border-gray-500 bg-gray-500/20'}`} />
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${dept.active ? 'bg-red-500' : 'hidden'}`} />
                            </div>

                            {/* Label On Hover */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                className="absolute left-6 top-0 bg-black/80 border border-white/20 p-2 whitespace-nowrap backdrop-blur-sm"
                            >
                                <p className="text-xs font-bold font-space text-white">{dept.label}</p>
                                <p className="text-[10px] text-gray-400">{dept.active ? 'STATUS: ACTIVE' : 'STATUS: OFFLINE'}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side Panel for Selected Zone */}
            <div className="absolute top-32 right-12 w-80 z-20">
                {selected ? (
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/90 border-l-2 border-red-500 p-6 backdrop-blur-md"
                    >
                        <h3 className="font-space font-bold text-lg mb-2 text-white">{DEPLOYMENTS.find(d => d.id === selected)?.label}</h3>
                        <div className="text-xs text-justify font-mono text-gray-400 space-y-4">
                            <p>SECTOR SURVEILLANCE ACTIVE. DRONE FLIGHT GROUP ALPHA-9 CURRENTLY ON PATROL PATTERN DELTA.</p>
                            <div className="grid grid-cols-2 gap-4 my-4">
                                <div>
                                    <span className="block text-gray-600">UNITS</span>
                                    <span className="text-white">12</span>
                                </div>
                                <div>
                                    <span className="block text-gray-600">THREAT</span>
                                    <span className="text-red-500 animate-pulse">ELEVATED</span>
                                </div>
                            </div>
                            <div className="h-32 bg-gray-900 border border-white/10 relative overflow-hidden">
                                {/* Simulated waveform */}
                                <div className="absolute inset-x-0 bottom-0 h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/c0/Sound_wave.svg')] opacity-20" />
                                <p className="absolute top-2 left-2 text-[10px] text-green-500">COMM_CHANNEL_OPEN</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-right text-gray-600 font-mono text-xs">
                        SELECT A ZONE TO VIEW INTEL
                    </div>
                )}
            </div>
        </section>
    );
}
