import Heading, { SectionPalette } from "@/components/Heading";
import ScrollToLink from "./ScrollToLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

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
      color: "aurora-orange", // fallback to your config
    },
  ];

  const colorMap = {
    "aurora-aqua": {
      text: "text-aurora-aqua",
      border: "border-aurora-aqua/30",
      bg: "bg-aurora-aqua/10",
      hoverBorder: "hover:border-aurora-aqua/60",
      hoverBg: "hover:bg-aurora-aqua/20",
      shadow: "hover:shadow-[0_0_20px_hsl(var(--aurora-aqua))]",
    },
    "aurora-purple": {
      text: "text-aurora-purple",
      border: "border-aurora-purple/30",
      bg: "bg-aurora-purple/10",
      hoverBorder: "hover:border-aurora-purple/60",
      hoverBg: "hover:bg-aurora-purple/20",
      shadow: "hover:shadow-[0_0_20px_hsl(var(--aurora-purple))]",
    },
    "aurora-green": {
      text: "text-aurora-green",
      border: "border-aurora-green/30",
      bg: "bg-aurora-green/10",
      hoverBorder: "hover:border-aurora-green/60",
      hoverBg: "hover:bg-aurora-green/20",
      shadow: "hover:shadow-[0_0_20px_hsl(var(--aurora-green))]",
    },
    "aurora-orange": {
      text: "text-aurora-orange",
      border: "border-aurora-orange/30",
      bg: "bg-aurora-orange/10",
      hoverBorder: "hover:border-aurora-orange/60",
      hoverBg: "hover:bg-aurora-orange/20",
      shadow: "hover:shadow-[0_0_20px_hsl(var(--aurora-orange))]",
    },
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <Heading as="h2" size="lg" palette={palette} className="pb-16">
          Skills & Technologies
        </Heading>

        {/* Swiper Coverflow Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className="pb-12"
        >
          {skillCategories.map((category) => {
            const colors =
              colorMap[category.color as keyof typeof colorMap] ||
              colorMap["aurora-green"];

            return (
              <SwiperSlide
                key={category.title}
                className="!w-[280px] sm:!w-[320px] md:!w-[350px]"
              >
                <div className="glass-card flex flex-col h-[420px] justify-between p-6">
                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-4 ${colors.text}`}>
                    {category.title}
                  </h3>

                  {/* Skills */}
                  <div className="space-y-3 flex-1 overflow-hidden">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`px-3 py-2 rounded-lg border ${colors.border} ${colors.bg} ${colors.hoverBorder} ${colors.hoverBg} ${colors.shadow} text-sm font-medium transition-all duration-300`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Bottom Card */}
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
