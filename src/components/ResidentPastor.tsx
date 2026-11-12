"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";
import { useChurchSettings } from "@/providers/church-settings-provider";

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function ResidentPastor() {
  const pageContent = useCmsPageData("home", content);
  const { settings } = useChurchSettings();

  const pastorContent = pageContent.pastor;

  const pastorName =
    settings.pastorName || pastorContent.name || "Resident Pastor";

  const pastorTitle =
    settings.pastorTitle || pastorContent.label || "Resident Pastor";

  const pastorDescription =
    settings.pastorBiography || pastorContent.description || "";

  const pastorImage = settings.pastorImage || pastorContent.image || "";

  return (
    <section className="bg-primary py-[80px]">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              {pastorImage ? (
                <Image
                  key={pastorImage}
                  src={pastorImage}
                  alt={pastorName}
                  width={600}
                  height={700}
                  unoptimized
                  className="h-[500px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[500px] w-full items-center justify-center bg-white/10 text-center text-white/80">
                  <div>
                    <p className="text-lg font-semibold">{pastorName}</p>

                    <p className="mt-2 text-sm">
                      Pastor photograph will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <div className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-white">
              {pastorTitle}
            </div>

            <h2 className="mb-6 font-cormorant text-4xl font-bold text-white sm:text-5xl">
              {pastorName}
            </h2>

            <p className="mb-6 text-base leading-relaxed text-white">
              {pastorDescription}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
