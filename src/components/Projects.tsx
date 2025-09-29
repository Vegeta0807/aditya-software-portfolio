import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading, { SectionPalette } from "@/components/Heading";
import { useState, memo } from "react";
import ScrollToLink from "./ScrollToLink";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

interface Slide {
  fallback: string;
  title: string;
  desc: string;
  codeLink: string;
  liveLink: string;
}

const slides: Slide[] = [
  {
    fallback: `${import.meta.env.BASE_URL}portfolio-images/interior-designer-webpage.jpg`,
    title: "Interior Designer Portfolio",
    desc: "A stunning portfolio website for an interior designer with custom slideshows and animations.",
    codeLink: "https://github.com",
    liveLink: "https://demo.com",
  },
  {
    fallback: `${import.meta.env.BASE_URL}portfolio-images/ai-pdf-chatbot.jpg`,
    title: "AI PDF Chatbot",
    desc: "Real-time lightweight PDF Ai Chatbot powered by OpenAI, Grok and Llama index.",
    codeLink: "https://github.com",
    liveLink: "https://demo.com",
  },
  {
    fallback: "https://picsum.photos/1200/1600?random=103",
    title: "Weather Dashboard",
    desc: "Location-based forecasts & historical data visualization.",
    codeLink: "https://github.com",
    liveLink: "https://demo.com",
  },
  {
    fallback: `${import.meta.env.BASE_URL}portfolio-images/this-portfolio.jpg`,
    title: "Portfolio Website",
    desc: "Interactive webgl based Aurora animations & glassmorphism design.",
    codeLink: "https://github.com",
    liveLink: "https://demo.com",
  },
];
// ⚡ Memoized SlideItem to avoid re-renders of every slide on parent updates
const SlideItem = memo(function SlideItem({ slide }: { slide: Slide }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <img
        src={slide.fallback}
        alt={slide.title}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover rounded-3xl transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== slide.fallback) target.src = slide.fallback;
        }}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex flex-col justify-end p-6 sm:p-10 rounded-3xl">
        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-2">
          {slide.title}
        </h3>
        <p className="text-white/80 max-w-lg mb-4 text-sm sm:text-base">
          {slide.desc}
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a
              href={slide.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <a
              href={slide.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
});

const Projects = ({ palette }: { palette?: SectionPalette }) => {
  return (
    <section className="py-24 px-4 relative z-10 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-6xl text-center mb-12">
        <Heading as="h2" size="lg" palette={palette}>
          Featured Projects
        </Heading>
        <p className="mt-4 text-base md:text-lg text-white/70">
          A curated selection of work across web, product and brand.
        </p>
      </div>

      {/* Slider */}
      <div className="w-full max-w-[1200px] h-[65vh] sm:h-[70vh] relative">
        <Swiper
          modules={[Navigation, Autoplay, EffectCreative]}
          slidesPerView={1}
          loop
          speed={900} // slightly faster but smooth
          effect="creative"
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          creativeEffect={{
            prev: { shadow: true, translate: ["-20%", 0, -200], scale: 0.85, opacity: 0 },
            next: { translate: ["100%", 0, 0], scale: 1.15, opacity: 1 },
          }}
          className="w-full h-full rounded-3xl overflow-hidden"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <SlideItem slide={slide} />
            </SwiperSlide>
          ))}

          {/* Custom nav buttons */}
          <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-20 cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-transform hover:scale-110 text-2xl">
              &#10094;
            </div>
          </div>
          <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-20 cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-transform hover:scale-110 text-2xl">
              &#10095;
            </div>
          </div>
        </Swiper>
      </div>
      <ScrollToLink href="#skills" />
    </section>
  );
};

export default Projects;
