import Heading, { SectionPalette } from "@/components/Heading";
import ScrollToLink from "./ScrollToLink";

interface SkillsProps { palette?: SectionPalette }

const Skills = ({ palette }: SkillsProps) => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["Angular","React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SASS"],
      color: "aurora-aqua"
    },
    {
      title: "Backend",
      skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
      color: "aurora-purple"
    },
    {
      title: "DevOps & Tools",
      skills: ["AWS", "Docker", "Git", "CI/CD", "Kubernetes", "Terraform"],
      color: "aurora-green"
    },
    {
      title: "Design & UI/UX",
      skills: ["Figma", "Adobe XD", "Photoshop", "Responsive Design", "Accessibility", "User Research"],
      color: "aurora-purple"
    }
  ];

  const colorMap = {
    "aurora-aqua": {
      text: "text-aurora-aqua",
      border: "border-aurora-aqua/30",
      bg: "bg-aurora-aqua/10",
      hoverBorder: "hover:border-aurora-aqua/60",
      hoverBg: "hover:bg-aurora-aqua/20",
      shadow: "hover:shadow-[0_0_15px_rgba(var(--aurora-aqua_rgb),0.3)]"
    },
    "aurora-purple": {
      text: "text-aurora-purple",
      border: "border-aurora-purple/30",
      bg: "bg-aurora-purple/10",
      hoverBorder: "hover:border-aurora-purple/60",
      hoverBg: "hover:bg-aurora-purple/20",
      shadow: "hover:shadow-[0_0_15px_rgba(var(--aurora-purple_rgb),0.3)]"
    },
    "aurora-green": {
      text: "text-aurora-green",
      border: "border-aurora-green/30",
      bg: "bg-aurora-green/10",
      hoverBorder: "hover:border-aurora-green/60",
      hoverBg: "hover:bg-aurora-green/20",
      shadow: "hover:shadow-[0_0_15px_rgba(var(--aurora-green_rgb),0.3)]"
    }
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Heading as="h2" size="lg" palette={palette} className="pb-16">
          Skills & Technologies
        </Heading>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const colors = colorMap[category.color as keyof typeof colorMap];
            return (
              <div
                key={category.title}
                className="glass-card animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className={`text-xl font-bold mb-4 ${colors.text}`}>
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className="relative group"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      <div className={`px-3 py-2 rounded-lg border ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} ${colors.shadow} text-sm font-medium transition-all duration-300 cursor-default`}>
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 glass-card text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-aurora-purple to-aurora-green bg-clip-text text-transparent">
            Always Learning
          </h3>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            I'm constantly exploring new technologies and frameworks to stay ahead of the curve. 
            Currently diving deep into AI/ML integration, Web3 technologies, and advanced cloud architectures.
          </p>
        </div>
      </div>
      <ScrollToLink href="#contact" />
    </section>
  );
};

export default Skills;