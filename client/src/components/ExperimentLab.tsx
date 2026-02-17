import * as React from "react";
import { useMode } from "@/context/ModeContext";
import { Zap, Terminal, Eye, Cpu, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ExperimentLab() {
    const {
        isMatrixEnabled,
        setIsMatrixEnabled,
        mode,
        toggleMode,
        isCVModalOpen,
        openCVPreview,
        openDiagnostics,
        activeDevSidebar,
        isMobile
    } = useMode();

    const experiments = [
        {
            title: "Matrix Mode",
            description: "Transform the interface into a digital rain environment. Works globally across the site.",
            icon: Zap,
            action: () => setIsMatrixEnabled(!isMatrixEnabled),
            active: isMatrixEnabled,
            color: "from-green-500 to-emerald-700",
            cta: isMatrixEnabled ? "Disable Matrix" : "Enable Matrix"
        },
        {
            title: "Developer Mode",
            description: "Switch to a full IDE-inspired workspace with a terminal, file explorer, and system logs.",
            icon: Terminal,
            action: toggleMode,
            active: mode === 'developer',
            color: "from-blue-500 to-indigo-700",
            cta: isMobile ? "Desktop Only" : (mode === 'developer' ? "Exit Dev Mode" : "Enter Dev Mode"),
            disabled: isMobile
        },
        {
            title: "System Diagnostics",
            description: "Monitor real-time system performance, activity graphs, and live server logs.",
            icon: Cpu,
            action: openDiagnostics,
            active: mode === 'developer' && activeDevSidebar === 'debug',
            color: "from-purple-500 to-pink-700",
            cta: isMobile ? "Desktop Only" : "Open Diagnostics",
            disabled: isMobile
        },
        {
            title: "Premium CV Engine",
            description: "Experience our seamless in-app resume viewer with zero-latency loading.",
            icon: Eye,
            action: openCVPreview,
            active: isCVModalOpen,
            color: "from-orange-500 to-red-700",
            cta: isCVModalOpen ? "Viewer Open" : "Preview Resume"
        }
    ];

    return (
        <section id="lab" className="py-24 px-4 relative overflow-hidden bg-black">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-xs font-mono mb-4 uppercase tracking-widest"
                    >
                        <Sparkles className="w-3 h-3" />
                        Interactive Playground
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        The <span className="gradient-text">Experiment Lab</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl text-lg">
                        A high-visibility hub to explore the unique features I've built for this portfolio.
                        Try them out and see the tech in action.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {experiments.map((exp, idx) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`group relative p-8 rounded-3xl border border-neutral-800 transition-all duration-500 hover:border-neutral-600 overflow-hidden flex flex-col h-full bg-neutral-900/40 backdrop-blur-sm ${(exp as any).disabled ? 'opacity-75' : ''}`}
                        >
                            {/* Card Background Gradient */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${exp.color}`} />

                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exp.color} p-3 mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                                <exp.icon className="w-full h-full text-white" />
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                                {exp.title}
                                {isMobile && (exp as any).disabled && (
                                    <span className="ml-2 text-[10px] font-mono text-orange-500 uppercase tracking-tighter">Gated</span>
                                )}
                            </h3>

                            <p className="text-neutral-400 text-sm mb-8 flex-1 leading-relaxed">
                                {exp.description}
                                {isMobile && (exp as any).disabled && (
                                    <span className="block mt-2 text-xs text-orange-400/70 italic">Best experienced on desktop.</span>
                                )}
                            </p>

                            <button
                                onClick={exp.action}
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${exp.active
                                    ? "bg-white text-black shadow-white/10"
                                    : (exp as any).disabled
                                        ? "bg-neutral-800/50 text-neutral-500 cursor-not-allowed"
                                        : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                    }`}
                            >
                                {exp.active && <Rocket className="w-4 h-4 animate-bounce" />}
                                {exp.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
