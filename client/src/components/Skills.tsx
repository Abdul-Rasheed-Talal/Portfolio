import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Rocket, BookOpen, Code2, Wrench, Database } from "lucide-react";


// Skills organized by categories with icons
import skillsData from "../content/skills.json";

const iconMap: { [key: string]: any } = {
  Code2, Wrench, Database, Rocket, BookOpen,
  // Add other icons if needed by new skills
};

// Transform JSON data to match component structure
const skillCategories = skillsData.skillCategories.map(cat => ({
  ...cat,
  icon: iconMap[cat.iconName] || Code2, // Fallback icon
  skills: cat.skills.map(skill => ({
    ...skill,
    icon: (
      // Icon logic can be simplified or successfully mapped if we had strict icon names. 
      // For now, let's stick to the specific SVG icons or map them if possible.
      // Since the original code had complex custom SVGs, we might lose them if we just use Lucide icons.
      // HOWEVER, for a dynamic CMS, we likely want to use standard icons or allow SVG uploads.
      // To keep it simple and dynamic, we will use Lucide icons for now, or just keep the mapped structure.
      // Let's use the color to determine the custom SVG if we want to preserve exact look, OR just simplify to standard icons.
      // Given the user wants "dynamic", standard icons are better.
      <div style={{ color: skill.color }}>
        {/* We'll use a generic icon or try to map based on name if we really want to preserve specific SVGs, 
              but for a CMS, consistent icons are better. Let's use the category icon or a default. */}
        <Code2 className="w-10 h-10" />
      </div>
    )
  }))
}));

// Actually, to preserve the BEAUTIFUL custom SVGs, we should probably keep a mapping of "Technology Name" -> SVG Component.
// But that defeats the purpose of "dynamic" if we add a new technology.
// A middle ground: Use an icon library (Lucide or React Icons) and store the "icon name" in the CMS.
// For this step, I will map the EXISTING skills to their original complex SVGs if possible, or transition to Lucide icons for scalability.
// Transitioning to Lucide icons is safer for "dynamic" additions.

// REVISED STRATEGY:
// 1. Define a mapping of common tech icons (Lucide has many, or use a package like react-icons).
// 2. For now, to ensure the site still looks good, I will map the iconName from JSON to a Lucide icon.
// 3. I will update the renderer to use this map.

const SkillIcon = ({ name, color }: { name: string, color: string }) => {
  // We can map specific known skills to custom SVGs here if we want to preserve them
  // Or just return a Lucide icon based on name
  return <Code2 className="w-10 h-10" color={color} />;
}

const processedCategories = skillsData.skillCategories.map(cat => ({
  ...cat,
  icon: iconMap[cat.iconName] || Code2,
  skills: cat.skills.map(skill => ({
    ...skill,
    icon: <SkillIcon name={skill.name} color={skill.color} />
  }))
}));

// Currently Learning
const learningSkills = [
  {
    name: "React.js",
    color: "#61DAFB",
    description: "Frontend Library",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#61DAFB">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
    )
  },
];

// Future Learning Goals - Professional categories
const futureLearningCategories = [
  {
    category: "Backend Development",
    items: ["Express.js", "MongoDB"],
    color: "#47A248"
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "CI/CD", "AWS", "Azure"],
    color: "#2496ED"
  },
];

export function Skills() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (isIntersecting) {
      setIsLoaded(true);
      const timer = setTimeout(() => {
        const levels: { [key: string]: number } = {};
        processedCategories.forEach(category => {
          category.skills.forEach(skill => {
            levels[skill.name] = skill.level;
          });
        });
        setAnimatedLevels(levels);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting]);



  // Normal Mode
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skills by Category - Centered */}
        <div ref={ref} className="space-y-16">
          {processedCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <category.icon className="w-6 h-6" style={{ color: category.color }} />
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skills Grid - Centered */}
              <div className="flex flex-wrap justify-center gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 w-40 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 text-center group"
                  >
                    {/* Icon */}
                    <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>

                    {/* Name */}
                    <h4 className="text-white font-semibold text-sm mb-3">{skill.name}</h4>

                    {/* Progress Bar */}
                    <div className="w-full bg-neutral-800 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${animatedLevels[skill.name] || 0}%`,
                          backgroundColor: skill.color
                        }}
                      ></div>
                    </div>

                    {/* Percentage */}
                    <span className="text-xs font-bold" style={{ color: skill.color }}>
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-neutral-800"></div>

        {/* Currently Learning Section */}
        <div className={`text-center transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Currently Learning</h3>
          </div>

          <div className="flex justify-center">
            {learningSkills.map((skill) => (
              <div
                key={skill.name}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl px-8 py-6 flex items-center gap-4 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {skill.icon}
                <div className="text-left">
                  <span className="text-white font-bold text-lg block">{skill.name}</span>
                  <span className="text-cyan-400 text-sm">{skill.description}</span>
                </div>
                <span className="text-xs text-white bg-cyan-500/30 px-3 py-1.5 rounded-full font-medium ml-2">
                  In Progress
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Future Learning Goals */}
        <div className={`mt-16 text-center transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Rocket className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Future Learning Goals</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {futureLearningCategories.map((cat) => (
              <div
                key={cat.category}
                className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 text-center"
              >
                <h4 className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  {cat.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="bg-neutral-800/80 text-neutral-300 px-3 py-1.5 rounded-lg text-sm border border-neutral-700 hover:border-purple-500/50 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
