'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
                >
                    <div className="w-64">
                        <div className="flex justify-between mb-2 font-space text-xs">
                            <span>SYSTEM_BOOT_SEQ_01</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-4 font-rajdhani text-white/50 text-sm text-center">
                            {progress < 30 ? "Initializing core modules..." :
                                progress < 60 ? "Establishing secure uplink..." :
                                    progress < 90 ? "Loading tactical assets..." : "Ready."}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
