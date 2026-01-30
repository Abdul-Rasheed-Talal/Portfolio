import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { GraduationCap, Award, Trophy, Star, Target, TrendingUp } from "lucide-react";

// Education from CV
const educationData = [
  {
    degree: "DAE CIT (Intermediate)",
    institution: "Govt College of Technology Bhakkar",
    duration: "09/2024 - Present",
    location: "Bhakkar",
    details: "Pursuing comprehensive education in computer systems, programming, networking, and software development. Focus on practical skills and industry-relevant technologies.",
    achievement: "1st year: 1174/1200 (97%) - 2nd Position in PBTE",
    status: "Current",
  },
  {
    degree: "SSC (Matric)",
    institution: "Govt Model High School Bhakkar",
    duration: "2022 - 2024",
    location: "Bhakkar",
    details: "Completed secondary education with focus on Science subjects. Built strong foundation in Mathematics, Physics, and Computer Science.",
    achievement: "Score: 1147/1200 (95%)",
    status: "Completed",
  },
];

const achievements = [
  { icon: Trophy, text: "2nd Position in PBTE Board", color: "text-yellow-400" },
  { icon: Star, text: "97% in DAE 1st Year", color: "text-orange-400" },
  { icon: Award, text: "95% in Matriculation", color: "text-blue-400" },
  { icon: Target, text: "5+ Projects Completed", color: "text-green-400" },
];

export function Education() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Education{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            My academic path and achievements in technology
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-8 mb-16">
          {educationData.map((edu, index) => (
            <div
              key={edu.degree}
              className={`bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-orange-400 font-medium">{edu.institution}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${edu.status === "Current"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-neutral-700 text-neutral-300"
                  }`}>
                  {edu.status}
                </span>
              </div>

              <div className="flex items-center space-x-4 text-neutral-400 text-sm mb-4">
                <span>{edu.duration}</span>
                <span>•</span>
                <span>{edu.location}</span>
              </div>

              <p className="text-neutral-300 mb-4 leading-relaxed">{edu.details}</p>

              {/* Achievement Badge */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg px-4 py-3">
                <Award className="w-5 h-5 text-orange-400" />
                <span className="text-orange-400 font-semibold">{edu.achievement}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Key{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.text}
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-3`} />
                <p className="text-neutral-300 text-sm font-medium">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
