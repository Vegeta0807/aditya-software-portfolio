import { useEffect, useState } from "react";
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

  useEffect(() => {
    const ids = ["hero", "about", "projects", "skills", "contact"];

    const io = new IntersectionObserver(
      (entries) => {
        // Find the most visible intersecting section
        let top: IntersectionObserverEntry | undefined;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!top || e.intersectionRatio > top.intersectionRatio) top = e;
        }
        if (top) {
          const id = (top.target as HTMLElement).id;
          setSection(id);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "0px 0px -10% 0px",
      }
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
        orange: [1.0, 0.45, 0.22], // vivid orange
        blue: [0.2, 0.48, 1.0], // vivid blue
        base: [0.035, 0.055, 0.08],
      },
      speed: 2.3,
    },
    about: {
      palette: {
        orange: [0.64, 0.36, 1.0], // purple band
        blue: [0.1, 0.85, 0.8], // teal band
        base: [0.03, 0.04, 0.07],
      },
      speed: 2.0,
    },
    projects: {
      palette: {
        orange: [0.3, 0.95, 0.4], // lime/green
        blue: [0.15, 0.35, 1.0], // deep blue
        base: [0.03, 0.045, 0.06],
      },
      speed: 2.4,
    },
    skills: {
      palette: {
        orange: [1.0, 0.2, 0.7], // magenta
        blue: [0.1, 0.9, 1.0], // cyan
        base: [0.03, 0.035, 0.06],
      },
      speed: 2.1,
    },
    contact: {
      palette: {
        orange: [1.0, 0.5, 0.25], // warm orange
        blue: [1.0, 0.4, 0.7], // pink
        base: [0.04, 0.04, 0.06],
      },
      speed: 2.3,
    },
  } as const;

  const active = palettes[(section as keyof typeof palettes) ?? "hero"] ?? palettes.hero;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen relative">
      <AuroraBackground speed={active.speed} palette={active.palette} />

      <main className="relative z-10">
        <section id="hero" className="min-h-screen relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <div className="pointer-events-auto">
            {/* Override Hero buttons to link to sections */}
            <Hero />
            <div className="sr-only">Hero section</div>
          </div>
          <button
            type="button"
            aria-label="Scroll to About"
            className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition"
            onClick={() => scrollTo("about")}
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </button>
        </section>

        <section id="about" className="min-h-screen relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <About palette={palettes.about.palette} />
          <button
            type="button"
            aria-label="Scroll to Projects"
            className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition"
            onClick={() => scrollTo("projects")}
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </button>
        </section>

        <section id="projects" className="min-h-screen relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <Projects palette={palettes.projects.palette} />
          <button
            type="button"
            aria-label="Scroll to Skills"
            className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition"
            onClick={() => scrollTo("skills")}
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </button>
        </section>

        <section id="skills" className="min-h-screen relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <Skills palette={palettes.skills.palette} />
          <button
            type="button"
            aria-label="Scroll to Contact"
            className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md p-2 text-white/80 transition"
            onClick={() => scrollTo("contact")}
          >
            <ChevronDown className="w-5 h-5 transition group-hover:translate-y-0.5" />
          </button>
        </section>

        <section id="contact" className="min-h-screen relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          <Contact palette={palettes.contact.palette} />
        </section>
      </main>
    </div>
  );
};

export default Index;
