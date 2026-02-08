import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import SEO from "@/components/SEO";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Abdul Rasheed - AI & GenAI Developer"
        description="Portfolio of Abdul Rasheed, a Full-Stack Generative AI Developer specializing in MERN stack, Next.js, and AI automation."
        keywords="Abdul Rasheed, AI Developer, Full Stack Developer, Generative AI, MERN Stack, React, Next.js, Portfolio, Web Development"
      />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Team />
        <Skills />
        <Projects />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
