"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Button from "./common/Button";

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

const cards = [
  {
    title: "Join Us Today",
    description:
      "Looking for a community? Find your place with us. Your journey starts here with us.",
    link: "/new-members",
    buttonText: "LEARN MORE",
  },
  {
    title: "Attend A Service",
    description:
      "Don't live a life less than God designed for you. Take your first step today. Join us for worship.",
    link: "/announcement",
    buttonText: "LEARN MORE",
  },
  {
    title: "Covenant Hour",
    description:
      "This is a time for personal and corporate prayer, where we connect with God.",
    link: "/covenant-hour-of-prayer",
    buttonText: "LEARN MORE",
  },
  {
    title: "Free Transport",
    description:
      "Join our free buses to get to church, new and old members are always welcome.",
    link: "/transport",
    buttonText: "LEARN MORE",
  },
];

const HomeCards = () => {
  return (
    <section className="py-[60px] bg-[#f8f8f8]">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <h2 className="font-cormorant text-3xl font-bold text-[#111] mb-3">
                {card.title}
              </h2>
              <p className="text-[#555] text-sm leading-relaxed mb-6">
                {card.description}
              </p>
              <Link
                href={card.link}
                className="inline-flex items-center gap-2 text-[#ef2b34] font-semibold hover:text-[#c81d26] transition-colors"
              >
                {card.buttonText}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCards;
