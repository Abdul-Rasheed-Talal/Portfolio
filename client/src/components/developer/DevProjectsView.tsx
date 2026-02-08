import { Github, ExternalLink, Star, GitFork, Eye, Terminal } from "lucide-react";

import projectsData from "../../content/projects.json";

// Reuse data from content
const projects = projectsData.projects;

export function DevProjectsView() {
    return (
        <div className="p-8 text-[#e0e0e0] font-mono">
            <div className="mb-8 border-b border-[#333] pb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Terminal className="text-[#00ff9d]" />
                        Repositories
                    </h1>
                    <p className="text-[#888]">
                        <span className="text-[#00ff9d]">root</span>/projects
                    </p>
                </div>
                <div className="text-xs text-[#666]">
                    Total Objects: {projects.length}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-[#0a0a0a] border border-[#333] rounded-lg overflow-hidden hover:border-[#00ff9d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)] flex flex-col"
                    >
                        {/* Repo Header */}
                        <div className="p-4 border-b border-[#222] bg-[#0f0f0f] flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <Github className="w-5 h-5 text-[#888]" />
                                <span className="text-[#00ff9d] font-bold text-sm tracking-wide">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                                <span className="text-xs border border-[#333] px-1.5 rounded-full text-[#666] ml-2">Public</span>
                            </div>
                        </div>

                        {/* Project Image (Integrated) */}
                        <div className="relative h-40 overflow-hidden border-b border-[#222] bg-black">
                            <div className="absolute inset-0 bg-[#00ff9d]/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/600x400/000000/333333?text=${project.title}`;
                                }}
                            />
                        </div>

                        {/* Description & Tech */}
                        <div className="p-4 flex-1 flex flex-col">
                            <p className="text-sm text-[#888] mb-4 flex-1">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.technologies?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="text-[10px] text-[#00ff9d] bg-[#00ff9d]/10 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies && project.technologies.length > 3 && (
                                    <span className="text-[10px] text-[#666] px-1 py-1">+{project.technologies.length - 3}</span>
                                )}
                            </div>

                            {/* Footer Stats */}
                            <div className="flex items-center justify-between text-xs text-[#666] pt-3 border-t border-[#222]">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 hover:text-[#e0e0e0]"><Star className="w-3 h-3" /> {project.stats?.stars || 0}</span>
                                    <span className="flex items-center gap-1 hover:text-[#e0e0e0]"><GitFork className="w-3 h-3" /> {project.stats?.forks || 0}</span>
                                </div>
                                <span className="text-[10px]">{project.stats?.updated || 'Recently'}</span>
                            </div>
                        </div>

                        {/* Actions (Only visible on hover or persistent low opacity) */}
                        <div className="p-2 bg-[#050505] flex gap-2 justify-end border-t border-[#222]">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#222] rounded text-[#888] hover:text-[#00ff9d] transition-colors" title="View Live">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#222] rounded text-[#888] hover:text-white transition-colors" title="View Code">
                                <Github className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
