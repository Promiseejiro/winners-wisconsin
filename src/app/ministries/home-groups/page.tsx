"use client";
import content from "@/content/ministries/home-groups.json";
import { motion, Variants } from "framer-motion";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideInUp: Variants = {
  hidden: { opacity: 0, y: 80 },
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

export default function HomeGroupsPage() {
  const router = useRouter();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center text-center text-white">
        <Image
          alt="Bishop David Oyedepo preaching at Winners Chapel"
          fill
          className="object-cover z-0"
          src="https://winnerschapelmaryland.com/wp-content/uploads/2024/11/david-oyedepo.jpg"
          priority
        />
        <motion.div
          className="relative z-2 w-full px-5 pt-[80px] pb-[40px] max-w-[1200px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold mb-2.5 leading-tight"
          >
            Care for each other.
            <br />
            Grow together.
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-light text-white/80 max-w-[600px] mx-auto"
          >
            {content.subtitle}
          </motion.h2>
        </motion.div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-cormorant text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#111] text-center mb-4"
            >
              Winners Satellite Fellowship
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-center text-[#555] text-lg font-semibold mb-8"
            >
              <strong>Care • Feed • Teach • Lead</strong>
            </motion.p>

            <motion.h3
              variants={fadeInUp}
              className="font-inter text-2xl font-bold text-primary text-center mb-6"
            >
              Every Saturday – 5:00 pm – 6:00 pm
            </motion.h3>

            <motion.p
              variants={fadeInUp}
              className="text-[#555] leading-relaxed text-base mb-8"
            >
              The Winners' Satellite Fellowship (WSF) is the share and care
              center for the Winners family. It is the home church where all
              Winners gather for a time of spiritual refreshing outside the
              church environment. It is a Christian fellowship forum created for
              caring for every member; "Everyday they continued to meet together
              in the temple courts. They broke bread in their homes and ate
              together with glad and sincere hearts" (Acts 2:46).
            </motion.p>

            <motion.div variants={fadeInUp} className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-8"
                href="http://wsf4u.com/"
              >
                Click to find a group near you
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CALL TO ACTION ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h4
              variants={fadeInUp}
              className="font-inter text-xl font-semibold text-[#111] mb-2"
            >
              You were meant to enjoy a life free in Christ.
            </motion.h4>
            <motion.h4
              variants={fadeInUp}
              className="font-inter text-xl font-semibold text-primary mb-6"
            >
              Take your first step towards it.
            </motion.h4>
            <motion.p
              variants={fadeInUp}
              className="text-[#555] text-base max-w-2xl mx-auto mb-8"
            >
              <strong>
                We exist to bring God's freedom to everyone. We love to care for
                people who have been hurt. This is our mandate.
              </strong>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto"
            >
              <div className="bg-[#f8f8f8] p-6 rounded-lg">
                <h5 className="font-inter font-semibold text-[#111] text-base mb-3">
                  Sunday Morning Worship:
                </h5>
                <p className="text-[#555] text-sm">
                  <strong>First Service: 8:00 am</strong>
                </p>
                <p className="text-[#555] text-sm">
                  <strong>Second Service: 10:30 am</strong>
                </p>
              </div>

              <div className="bg-[#f8f8f8] p-6 rounded-lg">
                <h5 className="font-inter font-semibold text-[#111] text-base mb-3">
                  Communion Service:
                </h5>
                <p className="text-[#555] text-sm">
                  <strong>Wednesdays at 6:00 pm</strong>
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 pt-8 border-t-2 border-[#ececec]"
            >
              <h5 className="font-inter font-semibold text-[#111] text-base mb-3">
                Main Location:
              </h5>
              <p className="text-[#555] text-base mb-6">
                <strong>4825 Glenn Dale Rd, Bowie, MD 20720</strong>
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  router.push("/plan-your-visit");
                }}
              >
                Attend Service
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
