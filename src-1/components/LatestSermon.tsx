"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Button from "./common/Button";

type Sermon = {
  _id?: string;
  title?: string;
  preacher?: string;
  date?: string;
  category?: string;
  sermonUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  thumbnail?: string;
  description?: string;
};

type LatestSermonContent = {
  label?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

const DEFAULT_CONTENT: LatestSermonContent = {
  label: "Latest Sermons",
  title: "Be Inspired by the Word",
  description:
    "Revisit recent messages and continue growing in faith. Browse the sermon library for more teachings.",
  buttonText: "View All Sermons",
  buttonHref: "/sermons",
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const API =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api/v1";

function sermonLink(sermon: Sermon) {
  return sermon.sermonUrl || sermon.videoUrl || sermon.downloadUrl || "";
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

function extractHomeContent(body: any): LatestSermonContent {
  const candidates = [
    body?.data?.data,
    body?.data,
    body?.content,
    body?.page,
    body,
  ];

  let homeContent: any = null;

  for (const candidate of candidates) {
    if (
      candidate &&
      typeof candidate === "object" &&
      !Array.isArray(candidate)
    ) {
      if (candidate.latestSermon) {
        homeContent = candidate;
        break;
      }

      if (candidate.data?.latestSermon) {
        homeContent = candidate.data;
        break;
      }
    }
  }

  const section = homeContent?.latestSermon || {};

  return {
    label: section.label || DEFAULT_CONTENT.label,
    title: section.title || DEFAULT_CONTENT.title,
    description: section.description || DEFAULT_CONTENT.description,
    buttonText: section.buttonText || DEFAULT_CONTENT.buttonText,
    buttonHref: section.buttonHref || DEFAULT_CONTENT.buttonHref,
  };
}

const LatestSermon = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [content, setContent] = useState<LatestSermonContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  // Load homepage CMS content.
  useEffect(() => {
    let active = true;

    fetch(`${API}/content/page?slug=home`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load homepage content");
        }

        return response.json();
      })
      .then((body) => {
        if (!active) return;
        setContent(extractHomeContent(body));
      })
      .catch((error) => {
        console.error("Homepage sermon section content error:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  // Load sermon records independently from the CMS section content.
  useEffect(() => {
    let active = true;

    fetch(`${API}/sermons`, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load sermons");
        }

        return response.json();
      })
      .then((body) => {
        if (!active) return;

        const records = Array.isArray(body.data) ? body.data : [];

        setSermons(
          [...records].sort(
            (a, b) =>
              new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
          ),
        );
      })
      .catch((error) => {
        console.error("Sermons loading error:", error);
        if (active) setSermons([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Only show the three newest sermons on the homepage.
  const latestSermons = useMemo(() => sermons.slice(0, 3), [sermons]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-10 text-center sm:mb-12"
          >
            <p className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
              {content.label}
            </p>

            <h2 className="font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
              {content.title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#555]">
              {content.description}
            </p>
          </motion.div>

          {loading ? (
            <div className="py-10 text-center text-sm text-[#777]">
              Loading latest sermons...
            </div>
          ) : latestSermons.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#ddd] bg-[#fafafa] px-6 py-12 text-center">
              <h3 className="font-semibold text-[#222]">Sermons coming soon</h3>

              <p className="mt-2 text-sm text-[#777]">
                Please check back soon for the latest messages.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestSermons.map((sermon, index) => {
                const link = sermonLink(sermon);

                return (
                  <motion.article
                    key={sermon._id || `${sermon.title}-${index}`}
                    variants={fadeInUp}
                    className="overflow-hidden rounded-2xl border border-[#eee] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] bg-[#f2f2f2]">
                      <Image
                        src={sermon.thumbnail || "/assets/images/CSR-logo.png"}
                        alt={`${sermon.title || "Sermon"} cover`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[#fff0f1] px-3 py-1 text-xs font-semibold capitalize text-[#ef2b34]">
                          {(sermon.category || "General").replaceAll("-", " ")}
                        </span>

                        <span className="text-xs text-[#888]">
                          {formatDate(sermon.date)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold leading-snug text-[#171717]">
                        {sermon.title || "Sermon"}
                      </h3>

                      {sermon.preacher && (
                        <p className="mt-1 text-sm font-medium text-[#ef2b34]">
                          {sermon.preacher}
                        </p>
                      )}

                      {sermon.description && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#666]">
                          {sermon.description}
                        </p>
                      )}

                      <div className="mt-5 border-t border-[#eee] pt-4">
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-[#ef2b34] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d9232c]"
                          >
                            Open Sermon
                            <span className="ml-2" aria-hidden="true">
                              ↗
                            </span>
                          </a>
                        ) : (
                          <span className="text-sm text-[#999]">
                            Sermon link will be available soon
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <motion.div variants={fadeInUp} className="mt-9 text-center">
            <Button
              variant="primary"
              size="md"
              href={content.buttonHref || "/sermons"}
              className="rounded-full"
            >
              {content.buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestSermon;
