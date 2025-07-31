import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Laptop } from "lucide-react";

export function About() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover my journey, passion, and vision for creating positive change through technology
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Young developer at work illustration */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 h-80 flex items-center justify-center">
              <Laptop className="h-24 w-24 text-primary" />
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-200 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">My Story</h3>
            <div className="prose prose-lg text-slate-600 dark:text-slate-300 space-y-4">
              <p>
                I'm a dedicated Computer Information Technology student currently in my 2nd year at 
                <strong className="text-slate-800 dark:text-slate-200"> Govt College of Technology Bhakkar</strong>. My journey started with a simple 
                belief: technology can bridge gaps and create opportunities where none existed before.
              </p>
              <p>
                Coming from a backward area of Pakistan where talent is often overlooked, I'm determined 
                to change that narrative. My goal is to build my own tech company and create job 
                opportunities and tech training for youth in underprivileged areas.
              </p>
              <p>
                Every line of code I write, every project I build, is a step towards that vision. 
                I believe in the power of persistence, continuous learning, and using technology 
                as a force for positive social change.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-primary">17</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Years Old</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-2xl font-bold text-primary">2+</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Years Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
