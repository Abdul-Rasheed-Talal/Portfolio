import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Github, Coffee, Heart, Zap, Linkedin, Award, Star, Target, TrendingUp } from "lucide-react";
import aboutData from "../content/about.json";
import heroData from "../content/hero.json";

const iconMap: Record<string, any> = {
  Coffee,
  Heart,
  Zap,
  Award,
  Star,
  Target,
  TrendingUp
};

const userData = {
  name: aboutData.name || heroData.headline,
  title: aboutData.title || "Web Developer",
  location: aboutData.location || "Bhakkar, Pakistan",
  bio: aboutData.bio,
  social: aboutData.social,
  availableForHire: aboutData.availableForHire,
  badges: aboutData.badges || [
    { icon: "Coffee", text: "Tea Enthusiast", color: "text-orange-400" },
    { icon: "Heart", text: "Open Source Learner", color: "text-red-400" },
    { icon: "Zap", text: "Problem Solver", color: "text-yellow-400" }
  ]
};

export function About() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Developer{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Story</span>
          </h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <p className="text-lg text-neutral-300 leading-relaxed">{userData.bio}</p>

            <div className="flex flex-wrap gap-4">
              {userData.badges.map((badge, idx) => {
                const Icon = iconMap[badge.icon] || Zap;
                return (
                  <div key={idx} className="flex items-center space-x-2 bg-neutral-900/50 px-4 py-2 rounded-lg border border-neutral-800">
                    <Icon className={`w-5 h-5 ${badge.color}`} />
                    <span className="text-neutral-300">{badge.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links - Only GitHub */}
            <div className="flex justify-center space-x-4 pt-6">
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
            </div>
          </div>

          <div className={`relative transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-neutral-400 ml-4 font-mono text-sm">developer.js</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-purple-400">
                  const <span className="text-blue-400">developer</span> = {"{"}
                </div>
                <div className="text-neutral-400 ml-4">
                  name: <span className="text-green-400">'{userData.name}'</span>,
                </div>
                <div className="text-neutral-400 ml-4">
                  title: <span className="text-green-400">'{userData.title}'</span>,
                </div>
                <div className="text-neutral-400 ml-4">
                  location: <span className="text-green-400">'{userData.location}'</span>,
                </div>
                <div className="text-neutral-400 ml-4">
                  available: <span className="text-orange-400">{userData.availableForHire.toString()}</span>,
                </div>
                <div className="text-neutral-400 ml-4">
                  skills: [<span className="text-green-400">'HTML'</span>,{" "}
                  <span className="text-green-400">'CSS'</span>,{" "}
                  <span className="text-green-400">'JavaScript'</span>],
                </div>
                <div className="text-neutral-400 ml-4">
                  passion: <span className="text-green-400">'{aboutData.passion || 'Building amazing things'}'</span>
                </div>
                <div className="text-purple-400">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
