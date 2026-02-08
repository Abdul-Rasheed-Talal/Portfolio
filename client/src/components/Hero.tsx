import { useState, useEffect } from "react";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { Github, Mail, MapPin, Phone, Download, Send, Linkedin } from "lucide-react";


const typingTexts = [
  "Web Developer",
  "CIT Student",
  "Problem Solver",
  "Tech Enthusiast"
];

// User Data from CV
const userData = {
  name: "Abdul Rasheed",
  title: "Web Developer",
  tagline: "Crafting digital experiences with code and creativity",
  location: "Bhakkar, Pakistan",
  email: "mabdulrasheedtalal@gmail.com",
  phone: "03361115907",
  resumeUrl: "/assets/Abdul-Rasheed-internship-CV.pdf",
  avatar: "/assets/profile-picture.jpg",
  availableForHire: true,
  availabilityText: "Seeking Internship Opportunities",
  stats: {
    yearsLearning: "2+",
    projects: "5+",
    skills: "9+",
  },
  social: {
    github: "https://github.com/Abdul-Rasheed-Talal",
    linkedin: "https://www.linkedin.com/in/abdulrasheedtalal/",
  },
};

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const typedText = useTypingAnimation(typingTexts, 100, 50, 2000);


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-orange-400/20 text-4xl font-mono animate-bounce" style={{ animationDelay: '0.3s' }}>
          {"<>"}
        </div>
        <div className="absolute top-40 right-20 text-blue-400/20 text-3xl font-mono animate-bounce" style={{ animationDelay: '0.7s' }}>
          {"{}"}
        </div>
        <div className="absolute bottom-40 left-20 text-green-400/20 text-5xl font-mono animate-bounce" style={{ animationDelay: '1s' }}>
          {"[]"}
        </div>
        <div className="absolute bottom-20 right-40 text-purple-400/20 text-2xl font-mono animate-bounce" style={{ animationDelay: '1.5s' }}>
          {"()"}
        </div>
      </div>

      <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        {/* Avatar */}
        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden p-1 bg-gradient-to-r from-orange-500 to-red-500">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-full h-full object-cover rounded-full bg-neutral-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Abdul+Rasheed&background=f97316&color=fff&size=200";
              }}
            />
          </div>

          {/* Status Badge */}
          {userData.availableForHire && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>{userData.availabilityText}</span>
              </div>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
          {userData.name}
        </h1>
        {/* Typing effect with more visible color */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-orange-500 border-r-2 border-orange-500 pr-1 animate-pulse">
            {typedText}
          </span>
        </h2>
        <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {userData.tagline}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-black text-orange-400 mb-1">{userData.stats.yearsLearning}</div>
            <div className="text-neutral-400 text-sm">Years Learning</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-blue-400 mb-1">{userData.stats.projects}</div>
            <div className="text-neutral-400 text-sm">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-green-400 mb-1">{userData.stats.skills}</div>
            <div className="text-neutral-400 text-sm">Technologies</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={() => scrollToSection("contact")}
            className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 flex items-center space-x-3"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <span>Get In Touch</span>
          </button>

          <a
            href={userData.resumeUrl}
            download
            className="group border-2 border-neutral-600 hover:border-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-red-500/10"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-neutral-400">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{userData.location}</span>
          </div>
          <a href={`mailto:${userData.email}`} className="flex items-center space-x-2 hover:text-orange-400 transition-colors">
            <Mail className="w-4 h-4" />
            <span>{userData.email}</span>
          </a>
          <a href={`tel:${userData.phone}`} className="flex items-center space-x-2 hover:text-orange-400 transition-colors">
            <Phone className="w-4 h-4" />
            <span>{userData.phone}</span>
          </a>
        </div>

        {/* Social Links - with bottom margin */}
        <div className="flex justify-center space-x-4 mt-8 mb-4">
          <a
            href={userData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-orange-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={userData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-blue-600 rounded-xl flex items-center justify-center text-neutral-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={`mailto:${userData.email}`}
            className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-blue-500 rounded-xl flex items-center justify-center text-neutral-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
