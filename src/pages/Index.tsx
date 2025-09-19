import { useEffect, useState, useRef, useMemo } from "react";
import AuroraBackground from "@/components/AuroraBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import type { SectionPalette } from "@/components/Heading";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [section, setSection] = useState<string>("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  // observe visible section
  useEffect(() => {
    const ids = ["hero", "about", "projects", "skills", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        let top: IntersectionObserverEntry | undefined;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!top || e.intersectionRatio > top.intersectionRatio) top = e;
        }
        if (top) setSection((top.target as HTMLElement).id);
      },
      { threshold: 0.5 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const palettes: Record<string, { palette: SectionPalette; speed: number }> = {
    hero: {
      palette: {
        orange: [1.0, 0.45, 0.22],
        blue: [0.2, 0.48, 1.0],
        base: [0.035, 0.055, 0.08],
      },
      speed: 2.3,
    },
    about: {
      palette: {
        orange: [0.64, 0.36, 1.0],
        blue: [0.1, 0.85, 0.8],
        base: [0.03, 0.04, 0.07],
      },
      speed: 2.0,
    },
    projects: {
      palette: {
        orange: [0.3, 0.95, 0.4],
        blue: [0.15, 0.35, 1.0],
        base: [0.03, 0.045, 0.06],
      },
      speed: 2.4,
    },
    skills: {
      palette: {
        orange: [1.0, 0.5, 0.25],
        blue: [1.0, 0.4, 0.7],
        base: [0.03, 0.035, 0.06],
      },
      speed: 2.1,
    },
    contact: {
      palette: {
        orange: [1.0, 0.5, 0.25],
        blue: [1.0, 0.4, 0.7],
        base: [0.04, 0.04, 0.06],
      },
      speed: 2.3,
    },
  } as const;

  const active = useMemo(
    () => palettes[section as keyof typeof palettes] ?? palettes.hero,
    [section]
  );

  return (
    <div className="min-h-screen relative">
      <AuroraBackground speed={active.speed} palette={active.palette} />

      <main
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth 
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section
          id="hero"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Hero />
          <a
            href="#about"
            aria-label="Scroll to About"
            className="group absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/5 
                       hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition z-50"
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </a>
        </section>

        <section
          id="about"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <About palette={palettes.about.palette} />
          <a
            href="#projects"
            aria-label="Scroll to Projects"
            className="group absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/5 
                       hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition z-50"
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </a>
        </section>

        <section
          id="projects"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Projects palette={palettes.projects.palette} />
          <a
            href="#skills"
            aria-label="Scroll to Skills"
            className="group absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/5 
                       hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition z-50"
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </a>
        </section>

        <section
          id="skills"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Skills palette={palettes.skills.palette} />
          <a
            href="#contact"
            aria-label="Scroll to Contact"
            className="group absolute right-4 bottom-4 rounded-full border border-white/20 bg-white/5 
                       hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition z-50"
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </a>
        </section>

        <section
          id="contact"
          className="min-h-screen snap-start relative bg-black text-white/95"
        >
          <Contact palette={palettes.contact.palette} />
        </section>
      </main>
    </div>
  );
};

export default Index;
