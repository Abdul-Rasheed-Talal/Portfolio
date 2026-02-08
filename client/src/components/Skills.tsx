import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { IconMapper } from "@/utils/IconMapper";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "../content/skills.json";
import { Code2, Database, Wrench, BookOpen, Target, Layout } from "lucide-react";

// Optional: Map JSON categories to specific icons if needed, or use IconMapper dynamically
const getCategoryIcon = (title: string) => {
  switch (title) {
    case "Core Technologies": return <Code2 className="w-4 h-4" />;
    case "Database & Design": return <Database className="w-4 h-4" />;
    case "Development Tools": return <Wrench className="w-4 h-4" />;
    case "Learning List": return <BookOpen className="w-4 h-4" />;
    case "Future Goals": return <Target className="w-4 h-4" />;
    default: return <Layout className="w-4 h-4" />;
  }
};

export function Skills() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(skillsData.skillCategories[0]?.title || "Core Technologies");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  const activeCategory = skillsData.skillCategories.find(cat => cat.title === activeTab);

  return (
    <section id="skills" className="pt-24 pb-4 px-4 relative overflow-hidden flex flex-col items-center">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Skills</span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tabs - Mobile Scrollable */}
        <div className="flex flex-nowrap overflow-x-auto pb-4 mb-8 md:mb-16 gap-3 md:justify-center px-4 w-full no-scrollbar snap-x">
          {skillsData.skillCategories.map((category) => (
            <button
              key={category.title}
              onClick={() => setActiveTab(category.title)}
              className={`flex-none snap-center flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border whitespace-nowrap ${activeTab === category.title
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-transparent shadow-lg shadow-orange-500/20"
                  : "bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900"
                }`}
            >
              {getCategoryIcon(category.title)}
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid - 2 cols on mobile, 3 on desktop */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {activeCategory?.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 md:p-6 hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 md:mb-4 gap-2 md:gap-0">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="text-2xl md:text-3xl" style={{ color: skill.color }}>
                        <IconMapper name={skill.name} className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <h3 className="text-white font-bold text-base md:text-lg">{skill.name}</h3>
                    </div>
                    {skill.level > 0 ? (
                      <span className="text-orange-500 font-bold text-sm md:text-base">{skill.level}%</span>
                    ) : (
                      <span className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-wider bg-blue-400/10 px-2 py-1 rounded">Target</span>
                    )}
                  </div>

                  {skill.level > 0 ? (
                    <div className="h-1.5 md:h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color || '#f97316'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-1 w-full bg-neutral-800/50 rounded-full overflow-hidden mt-2">
                      <div className="h-full w-full bg-blue-500/20 animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
