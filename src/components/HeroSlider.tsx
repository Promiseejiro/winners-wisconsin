"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import content from "@/content/home.json";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const swiperRef = useRef(null);

  const slides = content.hero.slides;

  return (
    <section
      className="relative w-full h-[60vh] lg:h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url("${content.hero.backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={800}
        loop
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-custom-active",
        }}
        className="h-full w-full absolute inset-0 flex items-center justify-center"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-full w-full flex! items-center justify-center"
          >
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <Image
                src={slide.image}
                alt={slide.title || "Winners Chapel Wisconsin"}
                width={1920}
                height={1080}
                priority={slide.id === 1}
                unoptimized
                className="max-h-full max-w-full object-contain object-center"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-1 bg-black/20" />
            {/* <div className="absolute inset-0 z-2 flex items-center justify-center px-8 text-center">
              <div className="max-w-4xl text-white drop-shadow-lg">
                {slide.badge && (
                  <p className="mb-3 text-sm font-bold uppercase tracking-[3px]">
                    {slide.badge}
                  </p>
                )}
                {slide.tagline && (
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[3px]">
                    {slide.tagline}
                  </p>
                )}
                {slide.title && (
                  <h1 className="font-cormorant text-5xl font-bold sm:text-6xl lg:text-8xl">
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle && (
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {slide.subtitle}
                  </h2>
                )}
                {slide.description && (
                  <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                    {slide.description}
                  </p>
                )}
                {slide.buttonText && (
                  <a
                    href={slide.buttonHref}
                    className="pointer-events-auto mt-7 inline-flex rounded-full bg-[#ef2b34] px-7 py-3 font-semibold text-white"
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        className="swiper-button-prev-custom absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-300 hover:scale-110 hover:bg-black/50 sm:left-4 sm:h-12 sm:w-12"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        className="swiper-button-next-custom absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-300 hover:scale-110 hover:bg-black/50 sm:right-4 sm:h-12 sm:w-12"
      >
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="swiper-pagination-custom absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:bottom-8" />
    </section>
  );
};

export default HeroSlider;
