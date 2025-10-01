import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface SkillsProps {
  palette?: string;
}

const skillCategories = [
  {
    title: "Frontend",
    skills: ["Angular", "Ionic", "React", "React Native","TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SASS"],
    color: "aurora-aqua"
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Microservices"],
    color: "aurora-purple"
  },
  {
    title: "DevOps & Tools",
    skills: ["AWS", "Docker", "Git", "CI/CD", "Kubernetes", "Terraform", "Jenkins", "Linux", "Nginx"],
    color: "aurora-green"
  },
  {
    title: "Design & UI/UX",
    skills: ["Figma", "Adobe XD", "Photoshop", "Responsive Design", "Accessibility", "User Research"],
    color: "aurora-purple"
  }, 
  {
    title: "Mobile Development",
    skills: ["Swift", "Kotlin", "Flutter", "Dart", "Xcode", "Android Studio"],
    color: "aurora-aqua"
  },
  {
    title: "AI based Skills",
    skills: ["ChatGPT", "DALL·E", "MidJourney", "AI Integration", "Prompt Engineering", "Natural Language Processing", "Vector Databases"],
    color: "aurora-green"
  }
];

const Skills = ({ palette }: SkillsProps) => {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Skills & Technologies</h2>

        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
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
          {skillCategories.map((category) => (
            <SwiperSlide key={category.title} className="flex items-stretch">
              <div className="glass-card p-6 flex flex-col h-full w-full max-w-sm mx-auto relative">
                <div className="absolute inset-0 rounded-lg pointer-events-none glow-div hidden"></div>

                <h3 className={`text-xl font-bold mb-4`}>{category.title}</h3>
                <div className="space-y-3 flex-1">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 rounded-lg border border-glass-border bg-glass text-sm font-medium cursor-default transition-all duration-300 hover:border-accent"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Skills;
