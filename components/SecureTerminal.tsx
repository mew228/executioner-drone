'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SecureTerminal() {
    const [history, setHistory] = useState<string[]>(['> INITIATING SECURE LINK...', '> ENTER ORDER ID TO TRACK STATUS.']);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toUpperCase();
        if (!cmd) return;

        setHistory(prev => [...prev, `> ${cmd}`, '> AUTHENTICATING...', '> ...']);
        setInput('');

        setTimeout(() => {
            setHistory(prev => {
                const newHistory = [...prev];
                // Remove the '...' mock
                newHistory.pop();

                if (cmd.startsWith('ORD-')) {
                    newHistory.push('> ORDER FOUND.');
                    newHistory.push('> STATUS: FINAL ASSEMBLY');
                    newHistory.push('> EST. DELIVERY: T-MINUS 48 HOURS');
                    newHistory.push('> THANK YOU FOR CHOOSING EXECUTIONER SYSTEMS.');
                } else if (cmd === 'HELP') {
                    newHistory.push('> AVAILABLE COMMANDS:');
                    newHistory.push('> [ORDER_ID] - Track specific unit');
                    newHistory.push('> CLEAR - Clear terminal');
                } else if (cmd === 'CLEAR') {
                    return ['> TERMINAL CLEARED.', '> READY.'];
                } else {
                    newHistory.push('> ERROR: ORDER ID NOT RECOGNIZED. FORMAT: ORD-XXXX');
                }
                newHistory.push('> WAITING FOR INPUT...');
                return newHistory;
            });
        }, 1500);
    };

    // Auto scroll bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <section className="bg-black py-12 px-6 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="font-space font-bold text-white text-sm tracking-widest">SECURE_CLIENT_TERMINAL</h3>
                </div>

                <div
                    className="bg-black border border-gray-800 p-6 rounded-lg font-mono text-sm h-64 overflow-y-auto text-green-500 shadow-[0_0_20px_rgba(0,255,0,0.1)]"
                    ref={scrollRef}
                >
                    {history.map((line, i) => (
                        <div key={i} className="mb-1 animate-fadeIn">{line}</div>
                    ))}

                    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                        <span>{'>'}</span>
                        <input
                            className="bg-transparent outline-none w-full text-green-400 caret-green-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </form>
                </div>
                <p className="text-gray-600 text-xs mt-2 text-right">ENCRYPTION LEVEL: MIL-STD-2048</p>
            </div>
        </section>
    );
}
