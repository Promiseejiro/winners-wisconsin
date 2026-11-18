"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

type HeroSlide = {
  id: string | number;
  image?: string;
  videoUrl?: string;
  title?: string;
  tagline?: string;
  badge?: string;
  subtitle?: string;
  verse?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

function getYouTubeId(value?: string): string | null {
  if (!value) return null;

  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || null;
    }

    if (host.endsWith("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const parts = url.pathname.split("/").filter(Boolean);

      if (["embed", "shorts", "live"].includes(parts[0])) {
        return parts[1] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function YouTubeSlide({
  url,
  title,
  isActive,
  onPlaybackChange,
}: {
  url: string;
  title: string;
  isActive: boolean;
  onPlaybackChange: (playing: boolean) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoId = useMemo(() => getYouTubeId(url), [url]);

  useEffect(() => {
    if (!videoId) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;

      let data: any;

      try {
        data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      let playerState: number | undefined;

      if (data?.event === "onStateChange") {
        playerState = data.info;
      }

      if (
        data?.event === "infoDelivery" &&
        typeof data.info?.playerState === "number"
      ) {
        playerState = data.info.playerState;
      }

      if (isActive && typeof playerState === "number") {
        onPlaybackChange(playerState === 1);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [videoId, isActive, onPlaybackChange]);

  useEffect(() => {
    const player = frameRef.current?.contentWindow;

    if (!player || !videoId) return;

    if (!isActive) {
      player.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: [],
        }),
        "*",
      );

      onPlaybackChange(false);
    }
  }, [isActive, videoId, onPlaybackChange]);

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        Invalid YouTube URL
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(origin)}&playsinline=1&rel=0`;

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title || "Church video"}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onLoad={() => {
        const player = frameRef.current?.contentWindow;

        if (!player) return;

        player.postMessage(
          JSON.stringify({
            event: "listening",
            id: videoId,
          }),
          "*",
        );

        player.postMessage(
          JSON.stringify({
            event: "command",
            func: "addEventListener",
            args: ["onStateChange"],
          }),
          "*",
        );

        if (!isActive) {
          player.postMessage(
            JSON.stringify({
              event: "command",
              func: "pauseVideo",
              args: [],
            }),
            "*",
          );
        }
      }}
    />
  );
}

const HeroSlider = () => {
  const pageContent = useCmsPageData("home", content);

  const slides: HeroSlide[] = Array.isArray(pageContent?.hero?.slides)
    ? pageContent.hero.slides
    : [];

  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePlaybackChange = useCallback((playing: boolean) => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (playing) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
    swiper.autoplay.start();
  }, []);

  useEffect(
    () => () => {
      swiperRef.current = null;
    },
    [],
  );

  if (!slides.length) return null;

  return (
    <section
      className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden lg:h-[120vh]"
      style={{
        backgroundImage: pageContent?.hero?.backgroundImage
          ? `url("${pageContent.hero.backgroundImage}")`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={handleSlideChange}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={800}
        loop={slides.length > 1}
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
        className="absolute inset-0 h-full w-full"
      >
        {slides.map((slide, index) => {
          const videoId = getYouTubeId(slide.videoUrl);
          const isActive = activeIndex === index;

          return (
            <SwiperSlide
              key={slide.id ?? index}
              className="relative flex! h-full w-full items-center justify-center !mt-0"
            >
              <div className="relative flex h-full w-full items-center justify-center">
                {videoId ? (
                  <div className="h-full w-full overflow-hidden bg-black">
                    <YouTubeSlide
                      url={slide.videoUrl || ""}
                      title={slide.title || "Winners Chapel Wisconsin"}
                      isActive={isActive}
                      onPlaybackChange={handlePlaybackChange}
                    />
                  </div>
                ) : slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.title || "Winners Chapel Wisconsin"}
                    width={1920}
                    height={1080}
                    priority={index === 0}
                    unoptimized
                    className="h-full w-full object-contain object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black text-white">
                    No image or video has been added to this slide.
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" />
            </SwiperSlide>
          );
        })}
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
