import { useEffect, useState, useRef, useMemo } from "react";
import Lenis from "lenis";
import AuroraBackground from "@/components/AuroraBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import type { SectionPalette } from "@/components/Heading";
import ScrollToLink from "@/components/ScrollToLink";

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
      orange: [1.0, 0.3, 0.6],
      blue: [0.6, 0.2, 1.0],
      base: [0.03, 0.04, 0.07],
    },
    speed: 2.0,
  },
  projects: {
    palette: {
      orange: [0.0, 0.7, 1.0],
      blue: [0.1, 1.0, 0.8],
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

const Index = () => {
  const [section, setSection] = useState<string>("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // lenis smooth scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis({
      wrapper: containerRef.current,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []
  );

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

  const active = useMemo(
    () => palettes[section as keyof typeof palettes] ?? palettes.hero,
    [section]
  );

  return (
    <div className="min-h-screen relative">
      <AuroraBackground speed={active.speed} palette={active.palette} />

      <main
        ref={containerRef}
        className="relative z-10 h-screen overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section
          id="hero"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Hero />
          <ScrollToLink href="#about" lenis={lenisRef.current} />
        </section>

        <section
          id="about"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <About palette={palettes.about.palette} />
          <ScrollToLink href="#projects" lenis={lenisRef.current} />
        </section>

        <section
          id="projects"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Projects palette={palettes.projects.palette} />
          <ScrollToLink href="#skills" lenis={lenisRef.current} />
        </section>

        <section
          id="skills"
          className="min-h-screen snap-start relative text-white/95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        >
          <Skills palette={palettes.skills.palette} />
          <ScrollToLink href="#contact" lenis={lenisRef.current} />
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
