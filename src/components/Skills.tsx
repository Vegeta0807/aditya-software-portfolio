import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import Heading, { SectionPalette } from "@/components/Heading";
import ScrollToLink from "./ScrollToLink";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Import our custom CSS for glow & buttons
import "./skills.css";

interface SkillsProps {
  palette?: SectionPalette;
}

const Skills = ({ palette }: SkillsProps) => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        "Angular",
        "Ionic",
        "React",
        "React Native",
        "TypeScript",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "SASS",
      ],
      color: "aurora-aqua",
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Python",
        "Express",
        "FastAPI",
        "PostgreSQL",
        "MongoDB",
        "GraphQL",
        "REST APIs",
        "Microservices",
      ],
      color: "aurora-purple",
    },
    {
      title: "DevOps & Tools",
      skills: [
        "AWS",
        "Docker",
        "Git",
        "CI/CD",
        "Kubernetes",
        "Terraform",
        "Jenkins",
        "Linux",
        "Nginx",
      ],
      color: "aurora-green",
    },
    {
      title: "Design & UI/UX",
      skills: [
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Responsive Design",
        "Accessibility",
        "User Research",
      ],
      color: "aurora-purple",
    },
    {
      title: "Mobile Development",
      skills: ["Swift", "Kotlin", "Flutter", "Dart", "Xcode", "Android Studio"],
      color: "aurora-aqua",
    },
    {
      title: "AI based Skills",
      skills: [
        "ChatGPT",
        "DALL·E",
        "MidJourney",
        "AI Integration",
        "Prompt Engineering",
        "Natural Language Processing",
        "Vector Databases",
      ],
      color: "aurora-green",
    },
  ];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Heading as="h2" size="lg" palette={palette} className="pb-16">
          Skills & Technologies
        </Heading>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="skills-swiper"
        >
          {skillCategories.map((category, idx) => (
            <SwiperSlide key={category.title} className="flex items-stretch">
              <div className="glass-card p-6 flex flex-col h-full w-full max-w-sm mx-auto relative">
                {/* Glow div for active slide */}
                <div className="absolute inset-0 rounded-lg z-[-1] pointer-events-none glow-div"></div>

                <h3 className={`text-xl font-bold mb-4 text-${category.color}`}>
                  {category.title}
                </h3>
                <div className="space-y-3 flex-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 rounded-lg border border-glass-border bg-glass text-sm font-medium transition-all duration-300 cursor-default text-foreground hover:skill-glow"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-16 glass-card text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-aurora-purple to-aurora-green bg-clip-text text-transparent">
            Always Learning
          </h3>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            I'm constantly exploring new technologies and frameworks to stay
            ahead of the curve. Currently diving deep into AI/ML integration,
            Web3 technologies, and advanced cloud architectures.
          </p>
        </div>
      </div>
      <ScrollToLink href="#contact" />
    </section>
  );
};

export default Skills;
