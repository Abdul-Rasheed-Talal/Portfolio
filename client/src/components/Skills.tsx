import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useState } from "react";
import { Code, Globe, Wrench, Lightbulb, Heart, GraduationCap, Users, Target } from "lucide-react";

const programmingSkills = [
  { name: "C++", level: 75, status: "Intermediate" },
  { name: "C", level: 60, status: "Basic" },
  { name: "Python", level: 45, status: "Learning" },
];

const webSkills = [
  { name: "HTML & CSS", level: 70, status: "Intermediate" },
  { name: "JavaScript", level: 40, status: "Learning" },
  { name: "Responsive Design", level: 65, status: "Intermediate" },
];

const toolSkills = [
  { name: "Git & GitHub", level: 70, status: "Intermediate" },
  { name: "Bash/Command Line", level: 55, status: "Basic" },
  { name: "Problem Solving", level: 80, status: "Strong" },
];

const softSkills = [
  { icon: Heart, label: "Passionate" },
  { icon: GraduationCap, label: "Quick Learner" },
  { icon: Users, label: "Team Player" },
  { icon: Target, label: "Goal-Oriented" },
];

interface SkillBarProps {
  name: string;
  level: number;
  status: string;
  isVisible: boolean;
}

function SkillBar({ name, level, status, isVisible }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, level]);

  return (
    <div className="skill-item">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-slate-500">{status}</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full skill-bar transition-all duration-1500 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section id="skills" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Skills & Technologies</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Technologies I work with and continue to learn as I build my expertise
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Programming Languages */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Code className="text-primary mr-3 h-5 w-5" />
              Programming Languages
            </h3>
            <div className="space-y-4">
              {programmingSkills.map((skill) => (
                <SkillBar 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  status={skill.status}
                  isVisible={isIntersecting}
                />
              ))}
            </div>
          </div>

          {/* Web Development */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Globe className="text-primary mr-3 h-5 w-5" />
              Web Development
            </h3>
            <div className="space-y-4">
              {webSkills.map((skill) => (
                <SkillBar 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  status={skill.status}
                  isVisible={isIntersecting}
                />
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Wrench className="text-primary mr-3 h-5 w-5" />
              Tools & Technologies
            </h3>
            <div className="space-y-4">
              {toolSkills.map((skill) => (
                <SkillBar 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  status={skill.status}
                  isVisible={isIntersecting}
                />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Lightbulb className="text-primary mr-3 h-5 w-5" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div key={skill.label} className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <skill.icon className="text-primary text-2xl h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium text-sm">{skill.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
