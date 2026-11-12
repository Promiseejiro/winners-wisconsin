"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Button from "./common/Button";
import content from "@/content/home.json";

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

const About = () => {
  const serviceTimes = content.serviceTimes;

  return (
    <section className="bg-white py-[80px]">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 items-start gap-[60px] lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft}>
            <Image
              src={content.about.image}
              alt="Winners Chapel Milwaukee"
              width={600}
              height={550}
              className="h-[300px] rounded-xl object-cover shadow-lg lg:h-[550px]"
            />
          </motion.div>

          <motion.div variants={fadeInRight}>
            <div className="mb-2 text-sm font-semibold uppercase tracking-[1px] text-[#ef2b34]">
              {content.about.eyebrow}
            </div>

            <h2 className="mb-6 font-cormorant text-4xl font-bold text-[#111] sm:text-5xl lg:text-6xl">
              {content.about.title}
            </h2>

            <p className="mb-6 leading-relaxed text-[#555]">
              {content.about.description}
            </p>

            <div className="mb-6">
              <h3 className="mb-3 font-inter text-lg font-semibold text-[#111]">
                Our Service Times
              </h3>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {serviceTimes.map((item, index) => (
                  <div
                    key={`${item.day}-${index}`}
                    className="flex items-center gap-2 text-sm text-[#555]"
                  >
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-[#ef2b34]"
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

                    <span>
                      <strong className="text-[#111]">{item.day}:</strong>{" "}
                      {item.service} - {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-6 text-sm text-[#555]">
              <strong className="text-[#111]">Week of Emphasis:</strong>{" "}
              {content.weekOfEmphasis}
            </p>

            <Button variant="primary" size="md" href={content.about.buttonHref}>
              {content.about.buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
