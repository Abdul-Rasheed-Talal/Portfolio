import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Github, ExternalLink, Eye } from "lucide-react";

// Projects from CV with actual links
const projects = [
  {
    id: 1,
    title: "GCT Bhakkar Website",
    description: "Designed and developed a dynamic and responsive website for Government College of Technology Bhakkar. Used JavaScript DOM manipulation to dynamically update page content with interactive UI behavior and form validation.",
    image: "/assets/projects/gct-bhakkar.png",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    liveUrl: "https://gctbhakkar.netlify.app",
    githubUrl: "https://github.com/Abdul-Rasheed-Talal/gct-bhakkar",
    category: "Web Development",
    duration: "11/2025 - Present",
    featured: true,
  },
  {
    id: 2,
    title: "Spotify Clone",
    description: "Built a Spotify-inspired music player web application with dynamic loading of albums and songs from local storage. Implemented core music player controls including Play/Pause, Next/Previous track, and interactive seek bar for audio progress.",
    image: "/assets/projects/spotify-clone.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://spotify-frontend-project.netlify.app/",
    githubUrl: "https://github.com/Abdul-Rasheed-Talal/spotify-clone",
    category: "Web Development",
    duration: "12/2025",
    featured: true,
  },
  {
    id: 3,
    title: "Bank Management System",
    description: "Developed a console-based Bank Management System using C++ with core OOP principles including classes, objects, functions, and encapsulation. Features account creation, deposit, withdrawal, and balance inquiry functionality.",
    image: "/assets/projects/bank-system.png",
    technologies: ["C++", "OOP"],
    liveUrl: null,
    githubUrl: "https://github.com/Abdul-Rasheed-Talal/BankMgmSystem",
    category: "Desktop Application",
    duration: "03/2025 - 04/2025",
    featured: true,
  },
];

export function Projects() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Main Card Link - Overlay */}
              <a
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0 focus:outline-none"
                aria-label={`View ${project.title}`}
              >
                <span className="sr-only">View project</span>
              </a>

              <div className="relative z-10 pointer-events-none">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x400/1a1a1a/f97316?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-neutral-900/80 text-neutral-300 px-3 py-1 rounded-full text-xs">
                      {project.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-neutral-300 mb-4 leading-relaxed line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons - Raised above the overlay link and re-enable pointer events */}
                  <div className="flex space-x-4 relative z-30 pointer-events-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Live Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 border border-neutral-600 hover:border-orange-500 text-neutral-300 hover:text-orange-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <a
            href="https://github.com/Abdul-Rasheed-Talal"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500 text-neutral-300 hover:text-orange-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
