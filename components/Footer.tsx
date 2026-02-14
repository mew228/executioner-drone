'use client';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-20">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                <span className="text-black font-bold text-xl">N</span>
                            </div>
                            <span className="font-space font-bold text-2xl tracking-widest text-white">NATH INDUSTRIES</span>
                        </div>
                        <p className="text-gray-500 font-rajdhani max-w-sm">
                            Advanced autonomous aerial systems for defense, enterprise, and research applications.
                        </p>
                    </div>

                    <div className="flex gap-12">
                        {['COMPANY', 'LEGAL', 'SOCIAL'].map((col) => (
                            <div key={col}>
                                <h4 className="font-space text-xs font-bold text-white/40 tracking-widest mb-6">{col}</h4>
                                <ul className="space-y-4">
                                    {['About', 'Careers', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <a href="#" className="font-rajdhani text-gray-400 hover:text-white transition-colors">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-12 p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left w-full md:w-auto">
                        <h4 className="font-space text-lg font-bold text-white">SECURE UPLINK</h4>
                        <p className="text-gray-400 text-sm font-rajdhani">Subscribe for classified product briefings.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-2">
                        <input type="email" placeholder="ENTER_EMAIL_ID" className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white font-space text-xs w-full md:w-64 focus:border-blue-500 outline-none" />
                        <button className="px-6 py-3 bg-white text-black font-bold font-space text-xs rounded-lg hover:bg-gray-200">CONNECT</button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                    <p className="text-xs font-space text-gray-600 uppercase tracking-wider">
                        © 2026 Nath Industries. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-bold font-space text-gray-600">SYSTEM STATUS: <span className="text-emerald-500">OPTIMAL</span></span>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-blue-900/5 blur-[100px] rounded-full pointer-events-none" />
        </footer>
    );
}
