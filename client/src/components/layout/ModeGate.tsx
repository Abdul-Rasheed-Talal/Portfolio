import { useState, useEffect } from 'react';
import { useMode } from '@/context/ModeContext';
import { Button } from "@/components/ui/button";
import { Terminal, LayoutTemplate, Smartphone } from 'lucide-react';

export function ModeGate() {
    const { mode, setMode, isFirstVisit } = useMode();
    const [showModal, setShowModal] = useState(false);
    const [isBypassed, setIsBypassed] = useState(false);

    useEffect(() => {
        // Only show modal if no mode is selected yet (first visit)
        if (mode === null && isFirstVisit && !isBypassed) {
            // Small delay to allow initial load before blurring
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 800);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [mode, isFirstVisit, isBypassed]);

    const isMobile = typeof window !== 'undefined' && window.matchMedia("(max-width: 768px)").matches;

    if (!showModal || isMobile) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop (Solid for clean look) */}
            <div className="absolute inset-0 bg-black/95 transition-all duration-500"></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-3xl px-6 animate-in zoom-in-95 duration-500 slide-in-from-bottom-5">
                <div className="bg-[#050505] border border-[#222] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">

                    <div className="grid md:grid-cols-2">
                        {/* Option 1: Developer Mode */}
                        <button
                            onClick={() => setMode('developer')}
                            className="group relative flex flex-col justify-center p-12 bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-300 border-r border-[#222] text-left"
                        >
                            <div className="absolute top-6 left-6 w-2 h-2 rounded-full bg-[#00ff9d] opacity-50 group-hover:opacity-100 shadow-[0_0_10px_#00ff9d] transition-all"></div>

                            <Terminal className="w-12 h-12 text-[#333] group-hover:text-[#00ff9d] mb-6 transition-colors duration-300" />

                            <h3 className="text-2xl font-mono text-white mb-2 group-hover:text-[#00ff9d] transition-colors">Developer Environment</h3>
                            <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#999]">
                                Access the architecture. Explore code,<br /> repositories, and system internals.
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-[#444] group-hover:text-[#00ff9d]">
                                <span>INITIALIZE_ENV</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                        </button>

                        {/* Option 2: Normal Mode */}
                        <button
                            onClick={() => setMode('normal')}
                            className="group relative flex flex-col justify-center p-12 bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-300 text-left"
                        >
                            <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-orange-500 opacity-50 group-hover:opacity-100 shadow-[0_0_10px_orange] transition-all"></div>

                            <LayoutTemplate className="w-12 h-12 text-[#333] group-hover:text-orange-500 mb-6 transition-colors duration-300" />

                            <h3 className="text-2xl font-sans font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">Visual Experience</h3>
                            <p className="text-sm text-[#666] leading-relaxed group-hover:text-[#999]">
                                View the portfolio as designed.<br /> Animations, interactions, and visuals.
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-xs font-sans font-bold text-[#444] group-hover:text-orange-500 uppercase tracking-widest">
                                <span>Enter Site</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </div>
                        </button>
                    </div>

                </div>

                <p className="text-center text-[#444] text-xs font-mono mt-8">
                    Press <span className="text-[#666]">Ctrl + Shift + D</span> to switch modes anytime
                </p>
            </div>
        </div>
    );
}
