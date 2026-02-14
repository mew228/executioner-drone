'use client';
import { motion } from 'framer-motion';
import { droneData } from '@/data/droneData';

export default function PricingTiers() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-space tracking-tighter mb-6">ACQUISITION</h2>
                    <p className="text-xl text-gray-400 font-rajdhani max-w-2xl mx-auto">
                        Select your configuration. Scalable solutions for every sector.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {droneData.pricing.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-3xl border ${tier.id === 'government'
                                    ? 'bg-zinc-900/80 border-blue-500/50 shadow-[0_0_30px_rgba(0,122,255,0.1)]'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                } backdrop-blur-md flex flex-col transition-all group hover:-translate-y-2`}
                        >
                            <div className="mb-8">
                                <h3 className="text-xl font-bold font-space text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold font-rajdhani text-white">{tier.price}</span>
                                </div>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-rajdhani text-gray-300">
                                        <div className={`w-1.5 h-1.5 rounded-full ${tier.id === 'government' ? 'bg-blue-500' : 'bg-white/50'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold font-space text-sm tracking-widest transition-all ${tier.id === 'government'
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                    : 'bg-white text-black hover:bg-gray-200'
                                }`}>
                                SELECT
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
