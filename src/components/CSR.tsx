"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import content from "@/content/home.json";
import Button from "./common/Button";

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

const CSR = () => {
  return (
    <section className="py-[80px] bg-[#f8f8f8]">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft}>
            <div className="text-[#ef2b34] font-semibold text-sm uppercase tracking-[1px] mb-2">
              {content.csr.label}
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-6">
              {content.csr.title}
            </h2>
            <p className="text-[#555] leading-relaxed text-base mb-6">{content.csr.description}</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-[#555]">
                <svg
                  className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
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
                Skills development through education, enterprise and
                employability training
              </li>
              <li className="flex items-start gap-3 text-[#555]">
                <svg
                  className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
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
                Food Bank and Poverty Alleviation
              </li>
              <li className="flex items-start gap-3 text-[#555]">
                <svg
                  className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
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
                Tackling Homelessness
              </li>
              <li className="flex items-start gap-3 text-[#555]">
                <svg
                  className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
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
                Improving Health, Safety and the Environment
              </li>
              <li className="flex items-start gap-3 text-[#555]">
                <svg
                  className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
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
                Improving Collaboration and Partnership
              </li>
            </ul>
            <Button
              variant="primary"
              size="md"
              href="https://winnersinthecommunity.com/"
              className="rounded-full"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div variants={fadeInRight} className="flex justify-center">
            <div className="relative w-full max-w-[400px] aspect-square">
              <Image
                src="/assets/images/CSR-logo.png"
                alt="CSR Logo"
                fill
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
