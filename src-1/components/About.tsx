"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Button from "./common/Button";
import content from "@/content/home.json";

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

const About = () => {
  const serviceTimes = content.serviceTimes;

  return (
    <section className="py-[80px] bg-white">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Image */}
          <motion.div variants={fadeInLeft}>
            <Image
              src={content.about.image}
              alt="Winners Chapel Manchester"
              width={600}
              height={550}
              className="h-[300px] lg:h-[550px] object-cover rounded-xl shadow-lg"
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInRight}>
            {/* Subtitle */}
            <div className="text-[#ef2b34] font-semibold text-sm uppercase tracking-[1px] mb-2">
              {content.about.eyebrow}
            </div>

            {/* Title */}
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111] mb-6">
              {content.about.title}
            </h2>

            {/* Description */}
            <p className="text-[#555] leading-relaxed mb-6">
              {content.about.description}
            </p>

            {/* Service Times */}
            <div className="mb-6">
              <h3 className="font-inter font-semibold text-lg text-[#111] mb-3">
                Our Service Times
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceTimes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[#555] text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#ef2b34] flex-shrink-0"
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

            {/* Week of Emphasis */}
            <p className="text-[#555] text-sm mb-6">
              <strong className="text-[#111]">Week of Emphasis:</strong> {content.weekOfEmphasis}
            </p>

            {/* Button */}
            <Button variant="primary" size="md" href="/about-us">
              {content.about.buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
