"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import announcementFallback from "@/content/announcement.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

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
  published?: boolean;
}

interface SliderImage {
  id: string | number;
  src: string;
  alt: string;
}

const announcementImages: SliderImage[] = [
  {
    id: 1,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-7.02.25-AM-scaled.jpeg",
    alt: "Church announcement",
  },
  {
    id: 2,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-6.54.03-AM-scaled.jpeg",
    alt: "Church announcement",
  },
  {
    id: 3,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/02/chop-new-scaled.jpeg",
    alt: "Covenant Hour of Prayer",
  },
  {
    id: 4,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-6.53.47-AM.jpeg",
    alt: "Church announcement",
  },
  {
    id: 5,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-12-at-8.00.31-AM.jpeg",
    alt: "Church announcement",
  },
  {
    id: 6,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-05-at-8.01.45-AM.jpeg",
    alt: "Church announcement",
  },
  {
    id: 7,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-12-at-8.53.30-AM-1.jpeg",
    alt: "Church announcement",
  },
  {
    id: 8,
    src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-28-at-7.47.02-AM-scaled.jpeg",
    alt: "Church announcement",
  },
];

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

  // UPLOADED ANNOUNCEMENT IMAGES

  const uploadedAnnouncementImages: SliderImage[] = liveAnnouncements.flatMap(
    (item, itemIndex) => {
      const images = Array.isArray(item.images) ? item.images : [];

      const legacy = getAnnouncementImage(item);

      const urls = images.length ? images : legacy ? [legacy] : [];

      return urls
        .filter((src) => typeof src === "string" && src.trim().length > 0)
        .map((src, index) => ({
          id: `${item._id || item.id || itemIndex}-${index}`,
          src,
          alt: item.title || "Church announcement",
        }));
    },
  );

  const sliderImages =
    uploadedAnnouncementImages.length > 0
      ? uploadedAnnouncementImages
      : announcementImages;

  // PREFER LIVE ANNOUNCEMENTS, OTHERWISE USE CMS

  const announcementCards: AnnouncementItem[] =
    liveAnnouncements.length > 0
      ? liveAnnouncements.map((item) => ({
          id: item._id || item.id,
          title: item.title,
          content: item.content,
          image: getAnnouncementImage(item) || "",
          time: item.time,
        }))
      : announcements;

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

      <section className="bg-white py-[70px]">
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
                    {image && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                        <img
                          src={image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}

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

      {/* IMAGE SLIDER */}

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

          <div className="mx-auto max-w-[1000px]">
            <Swiper
              modules={[Autoplay, EffectCreative, Pagination]}
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
              {sliderImages.map((image) => (
                <SwiperSlide
                  key={image.id}
                  className="flex items-center bg-white"
                >
                  <div className="relative h-[250px] w-full overflow-hidden bg-white sm:h-[350px] md:h-[500px] lg:h-[600px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full rounded-2xl object-cover"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="announcement-pagination mt-8 flex justify-center gap-2" />
          </div>
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
