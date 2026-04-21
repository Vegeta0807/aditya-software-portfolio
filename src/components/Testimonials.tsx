import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper";
import Heading, { SectionPalette } from "@/components/Heading";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ravi Kumar",
    role: "Founder",
    company: "The IDLI House",
    quote:
      "Aditya built our entire brand showcase from scratch — clean, fast, and exactly the premium feel we wanted. The attention to detail in every section was outstanding.",
    initials: "RK",
  },
  {
    name: "Meera Nair",
    role: "Creative Director",
    company: "Aruvam Interiors",
    quote:
      "Our portfolio website turned out beyond expectations. The custom animations and slideshow gave us a unique identity that our clients constantly compliment.",
    initials: "MN",
  },
  {
    name: "Arun Sharma",
    role: "CTO",
    company: "SmartCity Initiative",
    quote:
      "The real-time bus tracking system was complex, but Aditya delivered a polished, reliable product. Excellent problem-solver with strong communication throughout.",
    initials: "AS",
  },
];

const Testimonials = ({ palette }: { palette?: SectionPalette }) => {
  // Build gradient string from palette for decorative elements
  const gradientStyle = palette
    ? {
        background: `linear-gradient(135deg,
          rgb(${palette.orange.map((v) => Math.round(v * 255)).join(",")}) 0%,
          rgb(${palette.blue.map((v) => Math.round(v * 255)).join(",")}) 100%)`,
      }
    : {};

  return (
    <section className="py-24 px-4 relative z-10 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-6xl w-full text-center mb-12">
        <Heading as="h2" size="lg" palette={palette}>
          What Clients Say
        </Heading>
        <p className="mt-4 text-base md:text-lg text-white/70">
          Real words from people I've had the pleasure of working with.
        </p>
      </div>

      {/* Slider */}
      <div className="w-full max-w-[900px] pb-12">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={1}
          loop
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 1.3 },
          }}
          className="w-full"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i} className="pb-2">
              <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col gap-6 h-full">
                {/* Quote mark */}
                <span
                  className="text-6xl font-bold leading-none select-none"
                  style={{
                    ...gradientStyle,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  &ldquo;
                </span>

                {/* Quote text */}
                <p className="text-white/85 text-base sm:text-lg leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* Divider */}
                <div
                  className="h-px w-16 rounded-full opacity-60"
                  style={gradientStyle}
                />

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={gradientStyle}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-white/60">
                      {t.role} &middot; {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
