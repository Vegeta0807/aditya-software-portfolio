const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SASS"],
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
      color: "aurora-orange"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-aurora-orange to-aurora-aqua bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="glass-card animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className={`text-xl font-bold mb-4 text-${category.color}`}>
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="relative group"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                  >
                    <div className={`px-3 py-2 rounded-lg border border-${category.color}/30 bg-${category.color}/10 text-sm font-medium transition-all duration-300 hover:border-${category.color}/60 hover:bg-${category.color}/20 hover:shadow-[0_0_15px_rgba(var(--${category.color.replace('-', '')}_rgb),0.3)] cursor-default`}>
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
    </section>
  );
};

export default Skills;