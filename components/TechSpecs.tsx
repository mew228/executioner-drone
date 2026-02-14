'use client';
import { motion } from 'framer-motion';

export default function TechSpecs() {
    const specs = [
        { label: "MAX SPEED", value: "185", unit: "KNOTS", progress: 95 },
        { label: "RANGE", value: "850", unit: "KM", progress: 80 },
        { label: "ENDURANCE", value: "12", unit: "HOURS", progress: 70 },
        { label: "PAYLOAD", value: "450", unit: "KG", progress: 85 },
    ];

    return (
        <section className="py-32 bg-black relative border-t border-white/10 overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute top-0 right-0 w-full md:w-2/3 h-full object-cover opacity-20 mix-blend-screen pointer-events-none">
                <source src="/videos/extra/tech-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                {/* Left: Text & Bars */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-blue-500" />
                        <h3 className="text-blue-500 font-space text-sm tracking-[0.3em] font-bold">SYSTEM ARCHITECTURE</h3>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold font-space text-white mb-12 leading-none">
                        TECHNICAL<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">SPECIFICATIONS</span>
                    </h2>

                    <div className="space-y-10">
                        {specs.map((spec, index) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="font-space font-bold text-gray-400 text-sm tracking-wider">{spec.label}</span>
                                    <span className="font-rajdhani font-bold text-white text-xl">{spec.value} <span className="text-xs text-gray-500">{spec.unit}</span></span>
                                </div>
                                <div className="h-1 w-full bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${spec.progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-blue-600"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Simulated Radar/Blueprint */}
                <div className="relative h-[500px] border border-white/10 rounded-3xl bg-black/50 backdrop-blur-sm p-4 hidden lg:block overflow-hidden group">
                    {/* Background Video Layer */}
                    <div className="absolute inset-0 z-0 opacity-20 contrast-125 saturate-0 group-hover:opacity-40 transition-opacity duration-700">
                        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                            <source src="/videos/closeups/titanium-frame.mp4" type="video/mp4" />
                        </video>
                    </div>
                    {/* CRT Scanline Overlay */}
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />

                    <div className="relative z-10 w-full h-full">
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/50 rounded-tl-xl" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/50 rounded-tr-xl" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/50 rounded-bl-xl" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/50 rounded-br-xl" />

                        {/* Radar Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[300px] h-[300px] rounded-full border border-white/10 relative flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_20px_blue]" />
                                <div className="absolute top-1/2 left-1/2 w-[140px] h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent origin-left animate-spin" />

                                {/* Blips */}
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute top-10 right-20 w-1.5 h-1.5 bg-red-500 rounded-full" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} className="absolute bottom-20 left-10 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </div>
                        </div>

                        {/* Data Blocks */}
                        <div className="absolute top-8 left-8">
                            <p className="font-space text-[10px] text-gray-500">RADAR_SEQ_09</p>
                            <p className="font-space text-lg text-white">ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
