"use client";
import content from "@/content/ministries/wofbi.json";
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

export default function WofbiPage() {
  const router = useRouter();

  const bccCurriculum = [
    "Word Foundation (WFN)",
    "New Creation Fundamentals (NCF)",
    "Character Development (CDM)",
    "Principles of Answered Prayer (PAP)",
    "Principles of Faith (POF)",
    "Principles of Success (POS)",
    "Determining Divine Direction (DDD)",
    "Principles of Financial Prosperity (PFP)",
    "Family Life (FML)",
    "Principles of Divine Health (PDH)",
    "The Holy Spirit (THS)",
  ];

  const lccCurriculum = [
    "Biblical Business Strategy (BBS)",
    "Understanding the Power of Praise (UPP)",
    "Excellence in Ministry (EIM)",
    "Principles of Church Growth (PCG)",
    "Understanding the Anointing (UTA)",
    "Principles of Supernatural Supplies (PSS)",
    "Dynamics of Signs and Wonders (DSW)",
    "Dynamics of Holiness (DOH)",
    "Vision Analysis (VAN)",
    "Faith Complex (FCX)",
    "Success Concept (SCT)",
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center text-center text-white">
        {/* <div className="absolute inset-0 bg-[#111] z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-1" /> */}
        <Image
          alt="Bishop David Oyedepo preaching at Winners Chapel"
          fill
          className="object-cover z-0"
          src="https://winnerschapelmaryland.com/wp-content/uploads/2024/11/david-oyedepo.jpg"
          priority
        />{" "}
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
            It's not just learning.
            <br />
            It's transformation.
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-light text-white/80 max-w-[600px] mx-auto"
          >
            {content.subtitle}
          </motion.h2>

          {/* Apply Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="https://wcimd.ccbchurch.com/goto/forms/225/responses/new"
              >
                APPLY FOR BCC
              </Button>
            </motion.div>
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="https://wcimd.ccbchurch.com/goto/forms/224/responses/new"
              >
                APPLY FOR LCC
              </Button>
            </motion.div>
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="https://www.wcimd.com/jbs"
              >
                APPLY FOR JBS
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#111]">
                "There is no mountain anywhere; every man's ignorance is his
                mountain".
              </h2>
              <h3 className="font-inter text-xl font-semibold text-primary mt-4">
                – Dr. David Oyedepo
              </h3>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="text-[#555] leading-relaxed text-base">
                The Word of Faith Bible Institute [WOFBI] is a
                Ministry/Leadership Training Centre, which serves as the
                training arm of the Living Faith Church Worldwide. The Institute
                runs periodical three weeks specialized courses.
              </p>
              <p className="text-[#555] leading-relaxed text-base italic">
                <strong>
                  The courses are designed to motivate participants positively
                  towards distinction both in their secular as well as spiritual
                  engagement.
                </strong>
              </p>

              <div className="pt-6">
                <h4 className="font-cormorant text-3xl font-bold text-[#111] mb-4">
                  The Vision
                </h4>
                <p className="text-[#555] leading-relaxed text-base">
                  The Vision of the Institute is in line with the mandate given
                  to Dr. David Oyedepo in May 1983 when the Holy Ghost said to
                  him, "I will through THIS MINISTRY RAISE THE FOUNDATION OF
                  MANY OTHER MINISTRIES". For this reason, the Institute's
                  Curriculum is designed to teach excellence in Leadership,
                  Ministry, Social, Economic and other areas of human endeavors.
                </p>
              </div>

              <div className="pt-6">
                <h4 className="font-cormorant text-3xl font-bold text-[#111] mb-4">
                  Historical Landmarks:
                </h4>
                <p className="text-[#555] leading-relaxed text-base">
                  The Institute took off September 1, 1986 at Kaduna, Nigeria
                  and has since graduated over 50,000 from the numerous campuses
                  in Nigeria while hundreds have graduated from the Maryland
                  campus.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CURRICULUM SECTIONS ===== */}
      <section className="py-[70px] bg-[#f8f8f8]">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* BCC Curriculum */}
            <motion.div
              variants={slideInLeft}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#111] mb-4">
                Basic Certificate Course (BCC) Curriculum
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <ul className="space-y-2">
                {bccCurriculum.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInScale}
                    className="text-[#555] text-base flex items-start gap-3"
                  >
                    <span className="text-primary font-bold mt-0.5">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* LCC Curriculum */}
            <motion.div
              variants={slideInRight}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#111] mb-4">
                Leader Certificate Course (LCC) Curriculum
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <ul className="space-y-2">
                {lccCurriculum.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={fadeInScale}
                    className="text-[#555] text-base flex items-start gap-3"
                  >
                    <span className="text-primary font-bold mt-0.5">•</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
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
                Attend a Service
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
