import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Users, ExternalLink, ArrowRight, Zap } from "lucide-react";

export function Team() {
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isIntersecting) {
            setIsLoaded(true);
        }
    }, [isIntersecting]);

    return (
        <section id="team" className="py-20 px-4 relative overflow-hidden bg-neutral-900/20">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-5xl mx-auto">
                <div
                    ref={ref}
                    className={`relative bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-8 md:p-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Users className="w-32 h-32" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                                <Users className="w-4 h-4" />
                                <span>Collaborative Development</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Building Big with <span className="text-purple-500">My Team</span>
                            </h2>

                            <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                                Beyond individual projects, I collaborate with a talented group of developers to build scalable, production-ready applications. Check out our collective work and open-source contributions.
                            </p>

                            <a
                                href="https://team-website-sigma.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 group"
                            >
                                <span>Visit Team Website</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="flex-1 w-full max-w-sm">
                            {/* Preview Card */}
                            <a
                                href="https://team-website-sigma.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group cursor-pointer"
                            >
                                <div className="relative aspect-video bg-neutral-950 rounded-xl overflow-hidden border border-neutral-700 group-hover:border-purple-500 transition-colors shadow-2xl">
                                    {/* Mockup UI */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50 group-hover:bg-neutral-900/40 transition-colors">
                                        <div className="text-purple-500 font-mono text-xl font-bold flex items-center gap-2">
                                            <Zap className="w-6 h-6" />
                                            <span>TEAM SIGMA</span>
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="mt-3 flex items-center justify-between text-sm">
                                    <span className="text-neutral-400 group-hover:text-purple-400 transition-colors">team-website-sigma.vercel.app</span>
                                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
