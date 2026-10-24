"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Button from "./common/Button";
import { useEffect, useState } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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

const LatestSermon = () => {
  const [sermon, setSermon] = useState<any>(null);
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api/v1"}/sermons`).then(r=>r.json()).then(b=>setSermon(b.data?.[0] || null)).catch(()=>{}); }, []);
  return (
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
              latest sermon
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111]">
              Did you miss last Sunday's service?
            </h2>
            <p className="text-[#555] max-w-2xl mx-auto mt-4">
              If you would like to listen to a recorded version of the Sunday
              service sermon, Please play/download any sermon and enjoy.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-2xl mx-auto bg-[#f8f8f8] rounded-lg p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src="/assets/images/CSR-logo.png"
                  alt="Sermon"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-[#111] text-lg mb-1">
                  {sermon?.title || "COVENANT DAY OF FAVOUR"}
                </h3>
                <p className="text-[#ef2b34] font-medium text-sm">
                  {sermon?.date ? new Date(sermon.date).toLocaleDateString() : "19th JULY 2026"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-[#ef2b34] text-white text-xs rounded-full">
                    {sermon?.title || "GATEWAYS TO FINANCIAL FORTUNE 3A"}
                  </span>
                  <span className="px-3 py-1 bg-gray-200 text-[#555] text-xs rounded-full">
                    {sermon?.preacher || "PST. AYODEJI AJIBULU"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button variant="primary" size="sm" className="rounded-full">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Play Sermon
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mt-8">
            <Button
              variant="primary"
              size="md"
              href="/sermons"
              className="rounded-full"
            >
              Find More Sermons
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestSermon;
