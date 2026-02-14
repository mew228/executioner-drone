'use client';
import { motion } from 'framer-motion';

const ShowcaseSection = ({ videoPath, title, subtitle, align = 'center' }: any) => (
    <section className="relative w-full h-[110vh] bg-black overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
            <source src={videoPath} type="video/mp4" />
        </video>
        <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: "-20%" }} transition={{ duration: 1 }}
            className={`relative z-10 max-w-7xl mx-auto px-6 w-full ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}
        >
            <div className={`inline-block ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
                <h2 className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-6 drop-shadow-2xl font-space">{title}</h2>
                <p className="text-3xl text-gray-300 font-medium max-w-2xl leading-relaxed font-rajdhani">{subtitle}</p>
            </div>
        </motion.div>
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent" />
    </section>
);

export default function CloseupGalleryVideo() {
    return (
        <div className="bg-black text-white relative z-20">
            <div className="relative py-40 text-center overflow-hidden border-b border-white/5 group">
                {/* Background Video Layer */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src="/videos/extra/mastery-bg.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />

                <div className="relative z-10">
                    <h3 className="text-sm font-bold font-space text-blue-500 mb-6 tracking-[0.3em] uppercase">Engineering Mastery</h3>
                    <p className="text-7xl font-bold tracking-tight text-white drop-shadow-2xl">Forged from titanium.<br /><span className="text-gray-500">Powered by intelligence.</span></p>
                </div>
            </div>

            <ShowcaseSection videoPath="/videos/closeups/vulcan-cannon.mp4" title="VULCAN M134" subtitle="6,000 rounds per minute. Unrivaled suppression." />
            <ShowcaseSection videoPath="/videos/closeups/rotor-assembly.mp4" title="SILENT FLIGHT" subtitle="Dual-rotor system. Acoustic signature reduced by 60%." align="left" />
            <ShowcaseSection videoPath="/videos/closeups/sensor-integration.mp4" title="ALL-SEEING" subtitle="Multi-spectral imaging meets edge AI." align="right" />

            {/* Spotlight CTA */}
            <section className="py-40 bg-black text-center px-6">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-[90rem] mx-auto rounded-[3rem] bg-zinc-900/50 border border-white/10 p-32 overflow-hidden relative">
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-white/5 to-transparent rotate-45 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-8xl font-bold text-white mb-8 tracking-tighter">Ready to deploy.</h2>
                        <button className="px-12 py-6 bg-blue-600 text-white text-lg font-bold rounded-full hover:scale-105 transition shadow-[0_0_50px_blue]">Order Now</button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
