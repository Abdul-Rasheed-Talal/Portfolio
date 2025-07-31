import { Github, Mail, Globe } from "lucide-react";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const technologies = [
  "C++ & C Programming",
  "HTML, CSS & JavaScript", 
  "Git & GitHub",
  "Python (Learning)",
  "Web Development",
];

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Abdul Rasheed Talal</h3>
            <p className="text-slate-400 mb-4">
              Computer Information Technology Student passionate about creating 
              technology solutions for underprivileged communities.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/Abdul-Rasheed-Talal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="mailto:mabdulrasheedtalal@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://abdul-rasheed-talal.github.io/StartupJourney/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Technologies</h4>
            <ul className="space-y-2 text-slate-400">
              {technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            &copy; 2024 Abdul Rasheed Talal. Built with passion for technology and social impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
