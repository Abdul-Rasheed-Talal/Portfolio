import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { CheckCircle, Clock, Trophy, Award, Star, Target, Heart } from "lucide-react";

const educationData = [
  {
    title: "DAE Computer Information Technology",
    institution: "Govt College of Technology Bhakkar",
    period: "2023 - 2026 (2nd Year)",
    status: "Current",
    statusColor: "bg-primary text-white",
    description: "Pursuing comprehensive education in computer systems, programming, networking, and software development. Focus on practical skills and industry-relevant technologies.",
    subjects: ["Programming", "Networking", "Database"],
    side: "left"
  },
  {
    title: "Matriculation (SSC)",
    institution: "Govt Model High School Bhakkar", 
    period: "2021 - 2023",
    status: "Completed",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    description: "Completed secondary education with focus on Science subjects. Built strong foundation in Mathematics, Physics, and Computer Science.",
    subjects: ["Mathematics", "Physics", "Computer Science"],
    side: "right"
  },
  {
    title: "Primary Education",
    institution: "Zubaida Academy JPHS Bhakkar",
    period: "2013 - 2021", 
    status: "Completed",
    statusColor: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    description: "Foundation years where I developed love for learning and discovered my passion for technology and problem-solving.",
    subjects: [],
    side: "left"
  }
];

const learningItems = [
  { icon: CheckCircle, text: "Self-taught Programming in C & C++", status: "completed" },
  { icon: CheckCircle, text: "Git & GitHub Version Control", status: "completed" },
  { icon: Clock, text: "Web Development (HTML, CSS, JavaScript)", status: "learning" },
  { icon: Clock, text: "Python Programming", status: "learning" },
];

const achievements = [
  { icon: Star, text: "Started Tech Journey at Young Age" },
  { icon: Star, text: "Built Multiple Programming Projects" },
  { icon: Target, text: "Goal: Build Own Tech Company" },
  { icon: Heart, text: "Mission: Help Underprivileged Youth" },
];

export function Education() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="education" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Education Journey</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            My academic path and continuous learning journey in technology
          </p>
        </div>
        
        <div ref={ref} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-primary"></div>
          
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <div 
                key={item.title}
                className={`relative flex items-center ${item.side === 'right' ? 'md:justify-end' : ''} ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } transition-all duration-700`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-slate-900"></div>
                <div className={`ml-16 md:ml-0 ${item.side === 'right' ? 'md:w-1/2 md:pl-8' : 'md:w-1/2 md:pr-8'}`}>
                  <Card className="bg-white dark:bg-slate-800 shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </CardTitle>
                        <Badge className={`${item.statusColor} px-3 py-1 rounded-full text-sm`}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className={`${item.status === 'Current' ? 'text-primary' : 'text-accent'} font-medium mb-2`}>
                        {item.institution}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{item.period}</p>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 dark:text-slate-300 mb-4">
                        {item.description}
                      </CardDescription>
                      {item.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Learning */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <Award className="text-primary mr-3 h-5 w-5" />
                Continuous Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                {learningItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className={`mr-3 h-4 w-4 ${
                      item.status === 'completed' ? 'text-green-500' : 'text-blue-500'
                    }`} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <Trophy className="text-primary mr-3 h-5 w-5" />
                Achievements & Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                {achievements.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <item.icon className={`mr-3 h-4 w-4 ${
                      item.icon === Star ? 'text-yellow-500' : 
                      item.icon === Target ? 'text-blue-500' : 'text-red-500'
                    }`} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
