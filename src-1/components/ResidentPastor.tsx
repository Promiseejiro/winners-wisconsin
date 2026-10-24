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

const ResidentPastor = () => {
  return (
    <section className="py-[80px] bg-primary">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft} className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/assets/images/pst-AYO.webp"
                alt={content.pastor.name}
                width={600}
                height={700}
                className="object-cover w-full h-[500px]"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <div className=" dark font-semibold text-sm uppercase tracking-[1px] mb-2">
              {content.pastor.label}
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-white mb-6">
              {content.pastor.name}
            </h2>
            <p className="text-white leading-relaxed text-base mb-6">{content.pastor.description}</p>
            <Button
              variant="outline"
              size="md"
              href="https://goto.winnerschapelmanchester.org.uk/pastoral-appointment-bookings"
              className="rounded-full"
            >
              {content.pastor.buttonText}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResidentPastor;
