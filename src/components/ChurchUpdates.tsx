"use client";

import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ChurchUpdates = () => {
  const pageContent = useCmsPageData("home", content);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = pageContent.churchUpdates.tabs;
  const activeContent = tabs[activeTab];

  if (!tabs.length) return null;

  return (
    <section className="relative bg-[#f8f8f8] py-[80px]">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <div className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
              {pageContent.churchUpdates.label}
            </div>

            <h2 className="font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
              {pageContent.churchUpdates.title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#555]">
              {pageContent.churchUpdates.description}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            {/* Tabs */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  aria-pressed={activeTab === index}
                  className={`cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? "bg-[#ef2b34] text-white"
                      : "bg-white text-[#111] hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeContent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className="mb-4 font-cormorant text-3xl font-bold text-[#111]">
                    {activeContent.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-[#555]">
                    {activeContent.description}
                  </p>

                  <ul className="space-y-2">
                    {activeContent.details.map((detail, index) => (
                      <li
                        key={`${activeContent.id}-${index}`}
                        className="flex items-start gap-3"
                      >
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ef2b34]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <span className="text-[#555]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative min-h-[300px] lg:min-h-[400px]">
                  <Image
                    src={activeContent.image}
                    alt={activeContent.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChurchUpdates;
