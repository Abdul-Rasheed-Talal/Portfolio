import { Suspense, lazy } from "react";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewportLazyLoader } from "@/components/ViewportLazyLoader";

// Lazy load below-the-fold components
const About = lazy(() => import("@/components/About").then(module => ({ default: module.About })));
const Team = lazy(() => import("@/components/Team").then(module => ({ default: module.Team })));
const Skills = lazy(() => import("@/components/Skills").then(module => ({ default: module.Skills })));
const Projects = lazy(() => import("@/components/Projects").then(module => ({ default: module.Projects })));
const Education = lazy(() => import("@/components/Education").then(module => ({ default: module.Education })));
const Testimonials = lazy(() => import("@/components/Testimonials").then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import("@/components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

const SectionLoader = () => <div className="w-full h-96 flex items-center justify-center"><Skeleton className="w-full max-w-4xl h-64" /></div>;

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

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Team />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Education />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
        </ViewportLazyLoader>

        <ViewportLazyLoader placeholder={<SectionLoader />}>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </ViewportLazyLoader>
      </main>

      <ViewportLazyLoader placeholder={<div className="h-20 bg-neutral-900" />}>
        <Suspense fallback={<div className="h-20 bg-neutral-900" />}>
          <Footer />
        </Suspense>
      </ViewportLazyLoader>
    </div>
  );
}
