"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import announcementFallback from "@/content/announcement.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API = (() => {
  const configured =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000/api/v1";

  const base = configured.replace(/\/+$/, "");

  return base.endsWith("/api/v1") ? base : `${base}/api/v1`;
})();

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

interface AnnouncementItem {
  id?: string | number;
  _id?: string;
  title: string;
  content: string;
  time?: string;
  date?: string;
  image?: string;
  youtubeUrl?: string;
  href?: string;
  linkText?: string;
  published?: boolean;
}

interface AnnouncementContent {
  header?: {
    label?: string;
    title?: string;
  };
  items?: AnnouncementItem[];
}

interface LiveAnnouncement {
  _id?: string;
  id?: string | number;
  title: string;
  content: string;
  time?: string;
  image?: string;
  imageUrl?: string;
  images?: string[];
  youtubeUrl?: string;
  videoUrl?: string;
  published?: boolean;
}

interface SliderMedia {
  id: string | number;
  type: "image" | "video";
  src: string;
  alt: string;
}

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

function YouTubeAnnouncementVideo({
  url,
  title,
  onPlaybackChange,
}: {
  url: string;
  title: string;
  onPlaybackChange?: (playing: boolean) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const videoId = getYouTubeId(url);

  const iframeId = `youtube-${videoId}`;

  useEffect(() => {
    if (!videoId || !onPlaybackChange) return;

    const sendCommand = (func: string, args: unknown[] = []) => {
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
          id: iframeId,
        }),
        "*",
      );
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) return;

      let data: any;

      try {
        data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }

      if (data?.event === "onReady") {
        sendCommand("addEventListener", ["onStateChange"]);
      }

      let playerState: number | undefined;

      if (data?.event === "onStateChange") {
        playerState = Number(data.info);
      } else if (data?.event === "infoDelivery") {
        playerState = Number(data.info?.playerState);
      }

      if (playerState !== undefined && !Number.isNaN(playerState)) {
        onPlaybackChange(playerState === 1);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      onPlaybackChange(false);
    };
  }, [videoId, iframeId, onPlaybackChange]);

  if (!videoId) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-sm text-white">
        Invalid YouTube URL
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <iframe
      ref={frameRef}
      id={iframeId}
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&origin=${encodeURIComponent(
        origin,
      )}&playsinline=1&rel=0&controls=1`}
      title={title}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      onLoad={() => {
        frameRef.current?.contentWindow?.postMessage(
          JSON.stringify({
            event: "listening",
            id: iframeId,
          }),
          "*",
        );
      }}
    />
  );
}

export default function AnnouncementPage() {
  const pageCopy = useCmsPageData("announcement", announcementFallback);

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const [cmsContent, setCmsContent] = useState<AnnouncementContent | null>(
    null,
  );

  const [liveAnnouncements, setLiveAnnouncements] = useState<
    LiveAnnouncement[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [contentError, setContentError] = useState(false);

  const announcementSwiper = useRef<SwiperInstance | null>(null);

  // PAUSE SLIDER WHEN VIDEO IS PLAYING

  const handleAnnouncementPlayback = (playing: boolean) => {
    const swiper = announcementSwiper.current;

    if (!swiper || swiper.destroyed) return;

    if (playing) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  };

  // PREVIOUS SLIDE

  const goToPreviousSlide = () => {
    announcementSwiper.current?.slidePrev();
  };

  // NEXT SLIDE

  const goToNextSlide = () => {
    announcementSwiper.current?.slideNext();
  };

  // LOAD ANNOUNCEMENT CONTENT

  useEffect(() => {
    let cancelled = false;

    const loadContent = async () => {
      setLoading(true);

      try {
        const [cmsResponse, liveResponse] = await Promise.allSettled([
          fetch(`${API}/content/public/page?slug=announcement`, {
            cache: "no-store",
          }),

          fetch(`${API}/announcements`, {
            cache: "no-store",
          }),
        ]);

        let cmsLoaded = false;
        let liveLoaded = false;

        // LOAD CMS CONTENT INDEPENDENTLY

        if (cmsResponse.status === "fulfilled" && cmsResponse.value.ok) {
          try {
            const cmsResult = await cmsResponse.value.json();

            const pageContent =
              cmsResult?.data?.data ?? cmsResult?.data ?? cmsResult;

            if (pageContent && typeof pageContent === "object") {
              if (!cancelled) {
                setCmsContent(pageContent);
              }

              cmsLoaded = true;
            }
          } catch (error) {
            console.error("CMS content parsing failed:", error);
          }
        }

        // LOAD LIVE ANNOUNCEMENTS INDEPENDENTLY

        if (liveResponse.status === "fulfilled" && liveResponse.value.ok) {
          try {
            const liveResult = await liveResponse.value.json();

            const records = Array.isArray(liveResult)
              ? liveResult
              : Array.isArray(liveResult?.data)
                ? liveResult.data
                : Array.isArray(liveResult?.items)
                  ? liveResult.items
                  : Array.isArray(liveResult?.data?.items)
                    ? liveResult.data.items
                    : [];

            const publishedRecords = records.filter(
              (item: LiveAnnouncement) =>
                item && item.title && item.published !== false,
            );

            if (!cancelled) {
              setLiveAnnouncements(publishedRecords);
            }

            liveLoaded = true;
          } catch (error) {
            console.error("Live announcement parsing failed:", error);
          }
        }

        if (!cancelled) {
          setContentError(!cmsLoaded && !liveLoaded);
        }
      } catch (error) {
        console.error("Announcement loading failed:", error);

        if (!cancelled) {
          setContentError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  // CMS ANNOUNCEMENTS

  const announcements = (cmsContent?.items || []).filter(
    (item) => item && item.title && item.published !== false,
  );

  // GET ANNOUNCEMENT IMAGE

  const getAnnouncementImage = (
    item: LiveAnnouncement | AnnouncementItem,
  ): string | null => {
    const liveItem = item as LiveAnnouncement;

    const candidate = liveItem.imageUrl || item.image;

    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }

    const images = liveItem.images;

    if (Array.isArray(images) && images.length > 0) {
      return images[0];
    }

    return null;
  };

  // ANNOUNCEMENT CAROUSEL IMAGES

  const uploadedAnnouncementImages: SliderMedia[] = liveAnnouncements.flatMap(
    (item, itemIndex) => {
      const images = Array.isArray(item.images) ? item.images : [];
      const legacy = getAnnouncementImage(item);
      const urls = images.length ? images : legacy ? [legacy] : [];

      return urls
        .filter((src) => typeof src === "string" && src.trim().length > 0)
        .map((src, index) => ({
          id: `${item._id || item.id || itemIndex}-${index}`,
          type: "image" as const,
          src,
          alt: item.title || "Church announcement",
        }));
    },
  );

  // ANNOUNCEMENT VIDEOS

  const announcementVideos: SliderMedia[] = [
    ...liveAnnouncements.map((item, index) => ({
      id: `live-video-${item._id || item.id || index}`,
      type: "video" as const,
      src: item.youtubeUrl || item.videoUrl || "",
      alt: item.title || "Church announcement video",
    })),

    ...announcements.map((item, index) => ({
      id: `cms-video-${item.id || item._id || index}`,
      type: "video" as const,
      src: item.youtubeUrl || "",
      alt: item.title || "Church announcement video",
    })),
  ].filter((item) => getYouTubeId(item.src));

  // COMBINE SLIDER MEDIA

  const sliderImages: SliderMedia[] =
    uploadedAnnouncementImages.length || announcementVideos.length
      ? [...uploadedAnnouncementImages, ...announcementVideos]
      : [];

  // PREFER LIVE ANNOUNCEMENTS, OTHERWISE USE CMS

  const announcementCards: AnnouncementItem[] =
    liveAnnouncements.length > 0
      ? liveAnnouncements.map((item) => ({
          id: item._id || item.id,
          title: item.title,
          content: item.content,
          image: getAnnouncementImage(item) || "",
          youtubeUrl: item.youtubeUrl || item.videoUrl || "",
          time: item.time,
        }))
      : announcements;

  // TOGGLE ACCORDION

  const toggleAccordion = (index: number) => {
    setOpenAccordion((previous) => (previous === index ? null : index));
  };

  return (
    <>
      {/* PAGE HEADER */}

      <section className="relative w-full py-20 text-white">
        <div className="container text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-cormorant text-4xl font-bold sm:text-5xl md:text-6xl lg:text-[70px]"
          >
            {pageCopy.sections?.pageTitle ||
              pageCopy.header?.title ||
              "Announcement"}
          </motion.h1>
        </div>
      </section>

      {/* LATEST CHURCH ANNOUNCEMENTS */}

      <section className="bg-white">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
              {pageCopy.sections?.latestLabel || "Live Updates"}
            </p>

            <h2 className="font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
              {pageCopy.sections?.latestTitle || "Latest Church Announcements"}
            </h2>
          </div>

          {loading && (
            <div className="rounded-xl bg-[#fafafa] p-8 text-center text-[#777]">
              {pageCopy.sections?.loadingText || "Loading announcements..."}
            </div>
          )}

          {!loading && contentError && announcementCards.length === 0 && (
            <div className="rounded-xl bg-[#fafafa] p-8 text-center text-[#777]">
              Unable to load announcement content at the moment.
            </div>
          )}

          {!loading && !contentError && announcementCards.length === 0 && (
            <div className="rounded-xl bg-[#fafafa] p-8 text-center text-[#777]">
              No announcements are currently available.
            </div>
          )}

          {!loading && announcementCards.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {announcementCards.map((item, index) => {
                const image = getAnnouncementImage(item);

                return (
                  <article
                    key={item.id || item._id || index}
                    className="overflow-hidden rounded-xl border border-[#eee] bg-[#fafafa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {item.youtubeUrl && getYouTubeId(item.youtubeUrl) ? (
                      <div className="aspect-video w-full overflow-hidden bg-black">
                        <YouTubeAnnouncementVideo
                          url={item.youtubeUrl}
                          title={item.title}
                        />
                      </div>
                    ) : image ? (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="p-6">
                      {item.time && (
                        <p className="mb-3 text-sm font-semibold text-[#ef2b34]">
                          {item.time}
                        </p>
                      )}

                      <h3 className="font-cormorant text-2xl font-bold text-[#111]">
                        {item.title}
                      </h3>

                      <p className="mt-3 whitespace-pre-line leading-relaxed text-[#555]">
                        {item.content}
                      </p>

                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-block font-bold text-primary hover:underline"
                        >
                          {item.linkText || "Learn More"}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* IMAGE AND VIDEO SLIDER */}

      <section className="py-[70px]">
        <div className="w-full px-0">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white">
              {cmsContent?.header?.label ||
                pageCopy.sections?.updatesLabel ||
                "Latest Updates"}
            </div>

            <h2 className="font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
              {cmsContent?.header?.title ||
                pageCopy.sections?.pageTitle ||
                "Announcements"}
            </h2>
          </div>

          <div className="relative mx-auto max-w-[1000px] px-2 sm:px-12">
            <Swiper
              modules={[Autoplay, EffectCreative, Pagination]}
              onSwiper={(swiper) => {
                announcementSwiper.current = swiper;
              }}
              effect="creative"
              creativeEffect={{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ["100%", 0, 0],
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1000}
              grabCursor
              loop={sliderImages.length > 1}
              pagination={{
                el: ".announcement-pagination",
                clickable: true,
                bulletClass: "announcement-bullet",
                bulletActiveClass: "announcement-bullet-active",
              }}
              className="w-full"
              slidesPerView={1}
              spaceBetween={0}
            >
              {sliderImages.map((media) => (
                <SwiperSlide
                  key={media.id}
                  className="flex items-center bg-white"
                >
                  <div className="relative h-[250px] w-full overflow-hidden rounded-2xl bg-black sm:h-[350px] md:h-[500px] lg:h-[600px]">
                    {media.type === "video" ? (
                      <YouTubeAnnouncementVideo
                        url={media.src}
                        title={media.alt}
                        onPlaybackChange={handleAnnouncementPlayback}
                      />
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="h-full w-full rounded-2xl object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* PREVIOUS BUTTON */}
            {sliderImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPreviousSlide}
                  aria-label="Previous slide"
                  className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white sm:left-0 sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>

                {/* NEXT BUTTON */}
                <button
                  type="button"
                  onClick={goToNextSlide}
                  aria-label="Next slide"
                  className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white sm:right-0 sm:h-12 sm:w-12"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>

          <div className="announcement-pagination mt-8 flex justify-center gap-2" />
        </div>
      </section>

      {/* CMS CONTROLLED ANNOUNCEMENTS ACCORDION */}

      <section className="bg-[#f8f8f8] py-[70px]">
        <div className="w-full px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {cmsContent?.header?.label ||
                  pageCopy.sections?.updatesLabel ||
                  "Latest Updates"}
              </p>

              <h2 className="mt-2 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
                {cmsContent?.header?.title ||
                  pageCopy.sections?.pageTitle ||
                  "Announcements"}
              </h2>
            </div>

            {loading && (
              <div className="rounded-xl bg-white p-8 text-center text-[#777]">
                {pageCopy.sections?.loadingText || "Loading announcements..."}
              </div>
            )}

            {!loading && contentError && announcements.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center text-red-500">
                Unable to load announcements. Please try again later.
              </div>
            )}

            {!loading && !contentError && announcements.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center text-[#777]">
                No announcements are currently available.
              </div>
            )}

            {!loading &&
              announcements.map((item, index) => (
                <div
                  key={item.id || item._id || index}
                  className="mb-4 overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="text-base font-semibold text-[#111] sm:text-lg">
                      {item.title}
                    </span>

                    <span className="ml-4 flex-shrink-0 text-2xl font-bold text-primary">
                      {openAccordion === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === index ? "max-h-[2000px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-gray-100 px-6 py-4 text-base leading-relaxed text-[#555]">
                      {item.time && (
                        <p className="mb-3 font-semibold text-primary">
                          {item.time}
                        </p>
                      )}

                      <p className="whitespace-pre-line">{item.content}</p>

                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block font-bold text-primary hover:underline"
                        >
                          {item.linkText || "Learn More"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SLIDER PAGINATION STYLES */}

      <style jsx>{`
        .announcement-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .announcement-bullet:hover {
          background: rgba(0, 0, 0, 0.4);
        }

        .announcement-bullet-active {
          width: 40px;
          height: 12px;
          border-radius: 6px;
          background: #ef2b34;
        }
      `}</style>
    </>
  );
}
