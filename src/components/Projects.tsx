import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";


import Heading, { SectionPalette } from "@/components/Heading";

interface ProjectsProps { palette?: SectionPalette }

const Projects = ({ palette }: ProjectsProps) => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "aurora-aqua"
    },
    {
      title: "Task Management App",
      description: "Modern task management application with real-time collaboration, drag-and-drop functionality, and team workspace features.",
      tech: ["React", "TypeScript", "Firebase", "Tailwind"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "aurora-purple"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with data visualization, location-based forecasts, and historical weather pattern analysis.",
      tech: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "aurora-green"
    },
    {
      title: "Portfolio Website",
      description: "This very portfolio website featuring aurora animations, glassmorphism design, and responsive layout built with modern web technologies.",
      tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      github: "https://github.com",
      live: "https://demo.com",
      color: "aurora-orange"
    }
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center pb-12">
          <div className="inline-block">
            <Heading as="h2" size="lg" className='pb-2' palette={palette}>
              Featured Projects
            </Heading>
            <div className="pt-4 h-[2px] w-full bg-gradient-to-r from-cyan-400/60 via-fuchsia-400/60 to-amber-300/60 rounded-full"></div>
            <p className="mt-4 text-base md:text-lg text-white/70">
              A curated selection of work across web, product and brand.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="glass-card group animate-fade-in-up hover:scale-[1.02] transition-all duration-300 border border-white/10 backdrop-blur-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <h3 className={`text-2xl font-semibold text-white/95`}>
                  {project.title}
                </h3>
                
                <p className="text-foreground/80 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full border border-muted-foreground/30 bg-muted/50 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-white/20 text-white hover:bg-white/5">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;