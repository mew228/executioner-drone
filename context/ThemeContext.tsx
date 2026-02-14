'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type VisionMode = 'standard' | 'night-vision' | 'thermal';

interface ThemeContextType {
    visionMode: VisionMode;
    setVisionMode: (mode: VisionMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [visionMode, setVisionMode] = useState<VisionMode>('standard');

    return (
        <ThemeContext.Provider value={{ visionMode, setVisionMode }}>
            <div
                className={`min-h-screen transition-all duration-500 ${visionMode === 'night-vision' ? 'vision-night' :
                        visionMode === 'thermal' ? 'vision-thermal' : ''
                    }`}
            >
                {/* Noise Overlay for Night Vision */}
                {visionMode === 'night-vision' && (
                    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-20 bg-[url('/images/noise.png')] mix-blend-overlay animate-noise" />
                )}

                {/* Scanlines for both Night/Thermal */}
                {visionMode !== 'standard' && (
                    <div className="fixed inset-0 pointer-events-none z-[9998] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                )}

                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
