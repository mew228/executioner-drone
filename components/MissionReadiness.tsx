'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Wind, Eye, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export default function MissionReadiness() {
    const [city, setCity] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'result'>('idle');
    const [data, setData] = useState<any>(null);

    const checkWeather = (e: React.FormEvent) => {
        e.preventDefault();
        if (!city) return;

        setStatus('scanning');

        // Simulate API delay
        setTimeout(() => {
            // Mock logic based on city name length to be deterministic but varied
            const isBadValues = city.length % 3 === 0;
            const isCaution = city.length % 2 === 0;

            const mockData = {
                wind: isBadValues ? 45 : (isCaution ? 25 : 12),
                vis: isBadValues ? 2 : (isCaution ? 8 : 25),
                temp: 18,
                precip: isBadValues ? 'STORM' : 'CLEAR'
            };

            setData(mockData);
            setStatus('result');
        }, 2000);
    };

    const getStatusType = () => {
        if (!data) return 'idle';
        if (data.wind > 40 || data.vis < 3) return 'nogo';
        if (data.wind > 20 || data.vis < 10) return 'caution';
        return 'go';
    };

    const statusType = getStatusType();

    return (
        <section className="py-24 bg-zinc-900 border-b border-white/5 relative overflow-hidden">
            {/* Dynamic background effect */}
            <div className={`absolute inset-0 opacity-20 transition-colors duration-1000 ${statusType === 'go' ? 'bg-emerald-900' : statusType === 'nogo' ? 'bg-red-900' : 'bg-blue-900'}`} />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl font-space font-bold mb-8">MISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">READINESS CHECK</span></h2>

                <form onSubmit={checkWeather} className="relative max-w-lg mx-auto mb-12">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="ENTER DEPLOYMENT ZONE (e.g. KYIV, TAIPEI)"
                        className="w-full bg-black/50 border border-white/20 p-4 rounded-full font-space text-center focus:border-exec-blue outline-none transition-all uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                    />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 bg-exec-blue px-6 rounded-full font-bold hover:bg-blue-600 transition-colors">
                        SCAN
                    </button>
                </form>

                {status === 'scanning' && (
                    <div className="font-space text-exec-blue animate-pulse">
                        ACCESSING METEOROLOGICAL SATELLITES...
                    </div>
                )}

                {status === 'result' && data && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/80 backdrop-blur border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto grid md:grid-cols-2 gap-8 items-center"
                    >
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="bg-white/5 p-4 rounded-xl">
                                <div className="text-gray-400 text-xs flex items-center gap-2 mb-1"><Wind size={12} /> WIND SPEED</div>
                                <div className={`text-2xl font-rajdhani font-bold ${data.wind > 30 ? 'text-red-500' : 'text-white'}`}>{data.wind} KNOTS</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <div className="text-gray-400 text-xs flex items-center gap-2 mb-1"><Eye size={12} /> VISIBILITY</div>
                                <div className={`text-2xl font-rajdhani font-bold ${data.vis < 5 ? 'text-red-500' : 'text-white'}`}>{data.vis} KM</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <div className="text-gray-400 text-xs flex items-center gap-2 mb-1"><CloudRain size={12} /> CONDITION</div>
                                <div className="text-2xl font-rajdhani font-bold text-white">{data.precip}</div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl">
                                <div className="text-gray-400 text-xs flex items-center gap-2 mb-1"> TEMP</div>
                                <div className="text-2xl font-rajdhani font-bold text-white">{data.temp}°C</div>
                            </div>
                        </div>

                        {/* Verdict */}
                        <div className="text-center md:border-l border-white/10 pl-6">
                            {statusType === 'go' && (
                                <div>
                                    <CheckCircle size={64} className="text-emerald-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-space font-bold text-emerald-500">MISSION GREEN</h3>
                                    <p className="text-gray-400 text-sm mt-2">OPTIMAL CONDITIONS FOR FLIGHT</p>
                                </div>
                            )}
                            {statusType === 'caution' && (
                                <div>
                                    <AlertTriangle size={64} className="text-amber-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-space font-bold text-amber-500">CAUTION ADVISED</h3>
                                    <p className="text-gray-400 text-sm mt-2">REDUCED SENSOR RANGE LIKELY</p>
                                </div>
                            )}
                            {statusType === 'nogo' && (
                                <div>
                                    <XCircle size={64} className="text-red-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-space font-bold text-red-500">NO GO</h3>
                                    <p className="text-gray-400 text-sm mt-2">DANGEROUS FLIGHT CONDITIONS</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
