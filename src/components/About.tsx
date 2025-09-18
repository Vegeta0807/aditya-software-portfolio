import Heading, { SectionPalette } from "@/components/Heading";

interface AboutProps { palette?: SectionPalette }

const About = ({ palette }: AboutProps) => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card animate-fade-in-up">
          <Heading as="h2" size="lg" palette={palette} className="mb-8">
            About Me
          </Heading>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-foreground/90 leading-relaxed">
                I'm a passionate software developer with 5+ years of experience creating 
                innovative web applications and digital solutions. My journey started with 
                curiosity about how things work, and evolved into a deep love for crafting 
                elegant, efficient code.
              </p>
              
              <p className="text-lg text-foreground/90 leading-relaxed">
                I specialize in modern JavaScript frameworks, cloud technologies, and 
                creating seamless user experiences. When I'm not coding, you'll find me 
                exploring new technologies, contributing to open source, or hiking in nature.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 text-sm rounded-full border border-aurora-aqua/30 bg-aurora-aqua/10 text-aurora-aqua"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-2xl glass border-2 border-aurora-purple/30 flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;