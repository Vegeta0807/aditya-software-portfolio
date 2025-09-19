import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading, { SectionPalette } from "@/components/Heading";
import { useState } from "react";
import ScrollToLink from "./ScrollToLink";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const Projects = ({ palette }: { palette?: SectionPalette }) => {
  const slides = [
    {
      fallback: "https://picsum.photos/1200/1600?random=101",
      title: "E-Commerce Platform",
      desc: "Full-stack solution with React, Node.js, and PostgreSQL.",
      codeLink: "https://github.com",
      liveLink: "https://demo.com",
    },
    {
      fallback: "https://picsum.photos/1200/1600?random=102",
      title: "Task Management App",
      desc: "Real-time collaboration with drag-and-drop boards.",
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
      fallback: "https://picsum.photos/1200/1600?random=104",
      title: "Portfolio Website",
      desc: "Aurora animations & glassmorphism design.",
      codeLink: "https://github.com",
      liveLink: "https://demo.com",
    },
  ];

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
      <div className="w-full max-w-[1200px] h-[70vh] relative">
        <Swiper
          modules={[Navigation, Autoplay, EffectCreative]}
          slidesPerView={1}
          loop
          speed={1200}
          effect="creative"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -200],
              scale: 0.8,
              opacity: 0,
            },
            next: {
              translate: ["100%", 0, 0],
              scale: 1.2,
              opacity: 1,
            },
          }}
          className="w-full h-full rounded-3xl overflow-hidden"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <SlideItem slide={slide} />
            </SwiperSlide>
          ))}

          {/* Custom navigation buttons */}
          <div className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-20 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white transition-transform transform hover:scale-110 text-3xl">
              &#10094;
            </div>
          </div>
          <div className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-20 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center text-white/90 hover:text-white transition-transform transform hover:scale-110 text-3xl">
              &#10095;
            </div>
          </div>
        </Swiper>
      </div>
      <ScrollToLink href="#skills" />
    </section>
    );
};

interface SlideItemProps {
  slide: {
    fallback: string;
    title: string;
    desc: string;
    codeLink: string;
    liveLink: string;
  };
}

const SlideItem = ({ slide }: SlideItemProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
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
          const target = e.target as HTMLImageElement;
          if (target.src !== slide.fallback) {
            target.src = slide.fallback;
          }
        }}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 md:p-12 rounded-3xl">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {slide.title}
        </h3>
        <p className="text-white/80 max-w-lg mb-4">{slide.desc}</p>
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
};

export default Projects;
