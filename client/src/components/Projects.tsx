import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Building2, Bell, Rocket, Plus, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Bank Management System",
    description: "A comprehensive console application built in C++ featuring admin controls, PIN verification, account management, and a complete loan system. Demonstrates object-oriented programming and data structure implementation.",
    icon: Building2,
    status: "Completed",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    tags: ["C++", "OOP", "Data Structures"],
    links: {
      github: "https://github.com/Abdul-Rasheed-Talal",
      demo: "#"
    }
  },
  {
    title: "Prayer Alarm App", 
    description: "An intelligent prayer time notification system that alerts users 10 minutes before each prayer with automatic synchronization based on location. Features customizable reminders and beautiful Islamic design elements.",
    icon: Bell,
    status: "In Progress",
    statusColor: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    tags: ["Mobile App", "API Integration", "Location Services"],
    links: {
      github: "https://github.com/Abdul-Rasheed-Talal",
      demo: "#"
    }
  },
  {
    title: "Startup Journey",
    description: "My personal blog and journey documentation website where I share my experiences, learnings, and progress as I work towards building a tech company. Built with modern web technologies and responsive design.",
    icon: Rocket,
    status: "Live",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    tags: ["HTML", "CSS", "GitHub Pages"],
    links: {
      github: "https://github.com/Abdul-Rasheed-Talal",
      demo: "https://abdul-rasheed-talal.github.io/StartupJourney/"
    }
  }
];

export function Projects() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A showcase of my development journey and the solutions I'm building
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className={`project-card bg-slate-50 dark:bg-slate-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <project.icon className="h-16 w-16 text-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </CardTitle>
                  <Badge className={`${project.statusColor} px-3 py-1 rounded-full text-sm font-medium`}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-slate-600 dark:text-slate-300 mb-6">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-blue-700 transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
                {project.links.demo !== "#" && (
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={project.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-accent hover:text-cyan-700 transition-colors"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}

          {/* Future Project Placeholder */}
          <Card className="project-card bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <Plus className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">Next Project Coming Soon</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                What's Next?
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 mb-6">
                I'm constantly working on new projects and learning new technologies. 
                Follow my journey to see what innovative solutions I'll build next!
              </CardDescription>
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com/Abdul-Rasheed-Talal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-blue-700 transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Follow on GitHub
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
