import { Button } from "@/components/ui/button";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { Github, Mail, Globe } from "lucide-react";

const typingTexts = [
  "CIT Student & Developer",
  "Problem Solver", 
  "Tech Enthusiast",
  "Future Entrepreneur"
];

export function Hero() {
  const typedText = useTypingAnimation(typingTexts, 100, 50, 2000);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-4xl mx-auto text-center fade-in">
        {/* Professional headshot placeholder */}
        <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-accent p-1">
          <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <div className="w-32 h-32 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-slate-600 dark:text-slate-300">AR</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-slate-900 dark:text-white">Hello, I'm </span>
          <span className="text-primary">Abdul Rasheed Talal</span>
        </h1>

        <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 h-12 flex items-center justify-center">
          <span className="border-r-2 border-accent typing-cursor pr-1">
            {typedText}
          </span>
        </div>

        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          A passionate 17-year-old Computer Information Technology student from Pakistan, 
          on a mission to build tech solutions and create opportunities for youth in underprivileged areas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button 
            onClick={() => scrollToSection("projects")}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            View My Work
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <a 
            href="https://github.com/Abdul-Rasheed-Talal" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-300 hover:text-primary text-2xl transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a 
            href="mailto:mabdulrasheedtalal@gmail.com"
            className="text-slate-600 dark:text-slate-300 hover:text-primary text-2xl transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a 
            href="https://abdul-rasheed-talal.github.io/StartupJourney/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-slate-300 hover:text-primary text-2xl transition-colors"
          >
            <Globe className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
