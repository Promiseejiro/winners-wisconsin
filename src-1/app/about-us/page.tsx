"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/common/Button";
import content from "@/content/about-us.json";
//02
// Animation variants
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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const pillars = content.pillars;

export default function AboutUsPage() {
  const [openPillar, setOpenPillar] = useState<number | null>(null);

  const togglePillar = (id: number) => {
    setOpenPillar(openPillar === id ? null : id);
  };

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <section className="relative w-full py-20 bg-[#111] text-white">
        <div className="container text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="py-[80px] bg-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Image */}
            <motion.div variants={fadeInLeft}>
              <Image
                src="/assets/images/about-wcim-2.png"
                alt="About Winners Chapel Manchester"
                width={600}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>

            {/* Content */}
            <motion.div variants={fadeInRight}>
              {/* Vision */}
              <div className="mb-8">
                <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-4">
                  OUR VISION
                </h2>
                <p className="text-[#555] leading-relaxed text-base">
                  {content.vision}
                </p>
              </div>

              {/* Mission */}
              <div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-4">
                  OUR MISSION
                </h2>
                <p className="text-[#555] leading-relaxed text-base">
                  {content.mission}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BRIEF HISTORY ===== */}
      <section className="py-[80px] bg-[#f8f8f8]">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-6"
            >
              A BRIEF HISTORY
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#555] leading-relaxed text-base mb-8"
            >
              {content.history}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Button variant="primary" size="md" href="/contact">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 12 PILLARS OF FAITH ===== */}
      <section className="py-[80px] bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="text-[#ef2b34] font-semibold text-sm uppercase tracking-[1px] mb-2">
                Faith based bible church
              </div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-4">
                THE 12 PILLARS OF FAITH
              </h2>
              <p className="text-[#555] max-w-2xl mx-auto">
                Our beliefs are built on the Twelve Pillars of Faith that shape
                our teachings, empower our ministry, and guide us toward
                fulfilling God's purpose.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="bg-[#f8f8f8] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-semibold text-[#111] text-sm sm:text-base">
                      {pillar.id}. {pillar.title}
                    </span>
                    <span className="text-[#ef2b34] text-xl font-bold flex-shrink-0 ml-4">
                      {openPillar === pillar.id ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openPillar === pillar.id ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-4 border-t border-gray-200 text-[#555] text-sm leading-relaxed italic">
                      {/* "{pillar.description}" */}
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
