"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import content from "@/content/home.json";
import Button from "./common/Button";

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
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CSR = () => {
  return (
    <section className="bg-[#f8f8f8] py-[80px]">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft}>
            <div className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
              {content.csr.label}
            </div>

            <h2 className="mb-6 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl">
              {content.csr.title}
            </h2>

            <p className="mb-6 text-base leading-relaxed text-[#555]">
              {content.csr.description}
            </p>

            <ul className="mb-6 space-y-2">
              {content.csr.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[#555]">
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

                  {item}
                </li>
              ))}
            </ul>

            <Button
              variant="primary"
              size="md"
              href={content.csr.buttonHref}
              className="rounded-full"
            >
              {content.csr.buttonText}
            </Button>
          </motion.div>

          <motion.div variants={fadeInRight} className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[400px]">
              <Image
                src={content.csr.image}
                alt="Winners in the Community Logo"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CSR;
