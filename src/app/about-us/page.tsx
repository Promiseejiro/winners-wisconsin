"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/common/Button";
import content from "@/content/about-us.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";
import { useChurchSettings } from "@/providers/church-settings-provider";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// The public CMS can contain fields that are not present in the bundled
// fallback JSON. Declare those optional fields here so TypeScript knows
// about them while preserving the fallback JSON's inferred pillar types.
type AboutUsContent = typeof content & {
  aboutImage?: string;
  header?: { title?: string };
  uiText?: {
    visionAlt?: string;
    historyButtonText?: string;
  };
  pillarsSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
};

export default function AboutUsPage() {
  const { settings } = useChurchSettings();
  const [openPillar, setOpenPillar] = useState<number | null>(null);

  const pageContent = useCmsPageData("about-us", content) as AboutUsContent;

  const aboutImage =
    pageContent.aboutImage ||
    settings.aboutImage ||
    "/assets/images/eveangelism.jpg";

  const togglePillar = (id: number) => {
    setOpenPillar((current) => (current === id ? null : id));
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="relative w-full bg-[#111] py-20 text-white">
        <div className="container text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-cormorant text-4xl font-bold sm:text-5xl md:text-6xl lg:text-[70px]"
          >
            {pageContent.header?.title || "About Us"}
          </motion.h1>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 items-center gap-[60px] lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInLeft}>
              <Image
                src={aboutImage}
                alt={
                  pageContent.uiText?.visionAlt ||
                  "Winners Chapel International Milwaukee Wisconsin"
                }
                width={600}
                height={600}
                className="h-auto w-full rounded-xl object-contain"
              />
            </motion.div>

            <motion.div variants={fadeInRight}>
              <div className="mb-8">
                <h2 className="mb-4 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
                  {pageContent.visionTitle || "OUR VISION"}
                </h2>
                <p className="text-base leading-relaxed text-[#555]">
                  {pageContent.vision}
                </p>
              </div>

              <div>
                <h2 className="mb-4 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
                  {pageContent.missionTitle || "OUR MISSION"}
                </h2>
                <p className="text-base leading-relaxed text-[#555]">
                  {pageContent.mission}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BRIEF HISTORY */}
      <section className="bg-[#f8f8f8] py-[80px]">
        <div className="container">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-6 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl"
            >
              {pageContent.historyTitle || "A BRIEF HISTORY"}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mb-8 text-base leading-relaxed text-[#555]"
            >
              {pageContent.history}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button variant="primary" size="md" href="/contact">
                {pageContent.uiText?.historyButtonText ||
                  pageContent.historyButtonText ||
                  "Get in Touch"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 12 PILLARS OF FAITH */}
      <section className="bg-white py-[80px]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
                {pageContent.pillarsSection?.eyebrow ||
                  "Faith based bible church"}
              </div>

              <h2 className="mb-4 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
                {pageContent.pillarsSection?.title || "THE 12 PILLARS OF FAITH"}
              </h2>

              <p className="mx-auto max-w-2xl text-[#555]">
                {pageContent.pillarsSection?.description ||
                  "Our beliefs are built on the Twelve Pillars of Faith that shape our teachings, empower our ministry, and guide us toward fulfilling God's purpose."}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {(pageContent.pillars || content.pillars).map((pillar) => (
                <div
                  key={pillar.id}
                  className="overflow-hidden rounded-lg bg-[#f8f8f8] shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => togglePillar(pillar.id)}
                    aria-expanded={openPillar === pillar.id}
                    className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-100"
                  >
                    <span className="text-sm font-semibold text-[#111] sm:text-base">
                      {pillar.id}. {pillar.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-4 flex-shrink-0 text-xl font-bold text-[#ef2b34]"
                    >
                      {openPillar === pillar.id ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openPillar === pillar.id ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 px-6 py-4 text-sm italic leading-relaxed text-[#555]">
                      <p>{pillar.scripture}</p>
                      <p className="mt-2">
                        {pillar.quote  }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
