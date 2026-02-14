import * as React from "react";
import { useState } from "react";
import { Github, ExternalLink, Star, GitFork, Eye, Terminal as TerminalIcon, Cpu, Globe, Database, Shield } from "lucide-react";
import { Terminal } from "./Terminal";
import projectsData from "../../content/projects.json";

// Reuse data from content
const projects = projectsData.projects;

export function DevProjectsView() {
    const [showTerminal, setShowTerminal] = useState(false);

    return (
        <div className="p-4 md:p-8 text-[#e0e0e0] font-mono bg-[#050505] min-h-screen">
            {/* Header Area */}
            <div className="mb-8 border-b border-neutral-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00ff9d]/10 rounded-lg">
                            <TerminalIcon className="text-[#00ff9d] w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tighter">
                            DEVELOPER_ENVIRONMENT
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#888]">
                        <span className="text-[#00ff9d]">AR_WORKSPACE</span>
                        <span>/</span>
                        <span className="text-blue-400">projects_root</span>
                        <span className="bg-neutral-800 px-1.5 py-0.5 rounded text-[10px] ml-2">v2.4.0-stable</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowTerminal((prev: boolean) => !prev)}
                        className={`
                            px-4 py-2 rounded-md text-xs font-bold transition-all duration-300 flex items-center gap-2
                            ${showTerminal
                                ? 'bg-[#00ff9d] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                : 'bg-neutral-900 text-[#888] border border-neutral-700 hover:border-[#00ff9d] hover:text-[#00ff9d]'
                            }
                        `}
                    >
                        <TerminalIcon className="w-4 h-4" />
                        {showTerminal ? 'CLOSE_TERMINAL' : 'OPEN_TERMINAL'}
                    </button>
                    <div className="text-[10px] text-[#444] hidden sm:block leading-tight text-right">
                        SYSTEM_ID: AR_89FB <br />
                        UPTIME: 99.9%
                    </div>
                </div>
            </div>

            {/* Quick Stats / Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "CORES", value: "8 ACTIVE", icon: Cpu, color: "text-blue-400" },
                    { label: "NETWORK", value: "CONNECTED", icon: Globe, color: "text-[#00ff9d]" },
                    { label: "DATABASE", value: "STABLE", icon: Database, color: "text-purple-400" },
                    { label: "SECURITY", value: "ENCRYPTED", icon: Shield, color: "text-orange-400" }
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-neutral-800 p-4 rounded-lg flex items-center gap-4 group hover:border-neutral-700 transition-colors">
                        <div className={`p-2 bg-neutral-900 rounded ${stat.color} group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] text-[#555] font-bold">{stat.label}</div>
                            <div className="text-xs text-neutral-300">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Terminal View */}
            {showTerminal && (
                <div className="mb-8">
                    <Terminal onClose={() => setShowTerminal(false)} />
                </div>
            )}

            {/* Projects Grid */}
            <h2 className="text-xs font-bold text-[#555] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></span>
                ACTIVE_REPOSITORIES ({projects.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden hover:border-[#00ff9d]/50 transition-all duration-300 flex flex-col relative"
                    >
                        {/* Status Light */}
                        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-full border border-neutral-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]"></span>
                            <span className="text-[9px] text-[#888] font-bold">STABLE</span>
                        </div>

                        {/* Repo Header */}
                        <div className="p-4 border-b border-neutral-900 bg-[#0c0c0c] flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#888] group-hover:text-[#00ff9d] transition-colors">
                                <Github className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#00ff9d] font-bold text-sm tracking-tight">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                                <span className="text-[9px] text-[#444] uppercase tracking-widest font-bold">git_branch: main</span>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="relative h-44 overflow-hidden border-b border-neutral-900 bg-black">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/000000/333333?text=${project.title}`;
                                }}
                            />

                            {/* Overlay Controls */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-900 text-white rounded-full border border-neutral-700 hover:scale-110 transition-transform shadow-xl">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Description & Tech */}
                        <div className="p-5 flex-1 flex flex-col space-y-4">
                            <p className="text-xs text-[#888] leading-relaxed flex-1 line-clamp-3 italic">
                                "{project.description}"
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {project.technologies?.slice(0, 4).map((tech: string) => (
                                    <span key={tech} className="text-[9px] text-blue-400 bg-blue-400/5 border border-blue-400/20 px-1.5 py-0.5 rounded font-bold uppercase">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Footer Stats */}
                            <div className="flex items-center justify-between text-[#555] pt-4 border-t border-neutral-900">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 text-[10px] group-hover:text-amber-500 transition-colors">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {project.stats?.stars || 0}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[10px] group-hover:text-blue-500 transition-colors">
                                        <GitFork className="w-3.5 h-3.5" />
                                        {project.stats?.forks || 0}
                                    </span>
                                </div>
                                <span className="text-[9px] font-bold text-[#333] tracking-widest">v{1 + Math.floor(Math.random() * 2)}.{Math.floor(Math.random() * 10)}.0</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Prompt */}
            <div className="mt-12 text-center text-[10px] text-[#333] font-bold tracking-[0.2em] uppercase">
                End of stack trace // System listening for interrupts
            </div>
        </div>
    );
}
