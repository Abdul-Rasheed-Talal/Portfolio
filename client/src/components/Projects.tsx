import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "../content/projects.json";

export function Projects() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2); // Show 2 initially as requested

  const allProjects = projectsData.projects || [];
  const totalProjects = allProjects.length;
  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < totalProjects;

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, totalProjects)); // Load 2 more or all remaining
  };

  return (
    <section className="pt-4 pb-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className={`text-center mb-8 md:mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recent <span className="text-orange-500">Work</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            A collection of <span className="text-orange-500 font-bold">{totalProjects}</span> projects showcasing my journey in building digital solutions.
          </p>
        </div>

        {/* Projects Grid/Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={visibleCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-8 md:grid md:grid-cols-2 md:gap-12 md:pb-0 px-2 md:px-0 no-scrollbar justify-start md:justify-center md:place-items-center"
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-[85vw] md:w-full max-w-[550px] snap-center group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-orange-500/5"
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1a1a1a/333?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Floating Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 backdrop-blur-md text-white/90 text-xs px-3 py-1 rounded-full border border-white/10 shadow-lg">
                        {project.category || 'Development'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies?.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] text-neutral-300 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 4 && (
                          <span className="text-[10px] text-neutral-500 px-2 py-1">+{project.technologies.length - 4}</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 px-4 py-3 rounded-xl text-sm font-bold transition-transform hover:scale-105 active:scale-95"
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 border border-neutral-700 hover:border-white text-white px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-neutral-800 ${!project.liveUrl ? 'w-full' : ''}`}
                          >
                            <Github className="w-4 h-4" /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Load More Action - Subtle Button */}
        {hasMore && (
          <div className="mt-8 md:mt-16 text-center">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-orange-500/50 hover:bg-neutral-900 transition-all duration-300"
            >
              <span className="font-medium">View More Projects</span>
              <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black transition-colors">
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>
        )}

        <div className="mt-8 md:mt-16 text-center">
          <a
            href="https://github.com/Abdul-Rasheed-Talal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
          >
            <span>View full archive on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
