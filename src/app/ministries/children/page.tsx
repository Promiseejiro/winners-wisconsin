"use client";
import content from "@/content/ministries/children.json";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

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

export default function TeensMinistryPage() {
  const router = useRouter();

  const focusAreas = [
    {
      title: "Secure their future",
    },
    {
      title: "Impart Godly values",
    },
    {
      title: "Help them find their purpose",
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen  overflow-hidden flex items-center text-center text-white">
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
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold mb-2.5"
          >
            Teens Ministry
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-light text-white/80 max-w-[600px] mx-auto"
          >
            The youth ministry of Winners Chapel Maryland
          </motion.h2>

          {/* Focus Areas Icons Row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-6 lg:gap-0 lg:flex-row flex-wrap justify-start lg:justify-center mt-20 "
          >
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                variants={slideInUp}
                className={`flex flex-col lg:items-center gap-2 text-start  lg:text-center border-l-3 border-primary px-4 md:px-12 ${index == focusAreas.length - 1 ? "border-l-0 border-r-3  lg:border-r-3 " : "border-r-3 lg:border-r-0"}`}
              >
                <span className="text-white/90 text-xl md:text-3xl font-bold max-w-full lg:min-w-[250px] lg:max-w-[140px] lg:text-center leading-tight">
                  {area.title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FOCUS AREAS SECTION ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          ></motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="bg-[#f8f8f8] p-10 rounded-lg"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111] mb-6">
                Today's youth face new challenges.
                <br />
                <span className="text-primary">
                  We believe God's eternal truths solve them.
                </span>
              </h2>
              <p className="text-[#555] leading-relaxed mb-4 text-base">
                Our youth should experience God's freedom – both spiritually and
                physically. That's why we are committed to bring the truth of
                the Word of God to this generation in ways that apply to them.
                Armed with the powerful truths of God's promises, our next
                generation can rise to the challenge and conquer their world for
                Christ.
              </p>
              <p className="text-[#555] leading-relaxed text-base">
                Our mission is to raise responsible citizens and visionary
                leaders that contribute to society and change their world for
                Christ.
              </p>
            </motion.div>

            <motion.div variants={slideInRight} className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                alt="Teens Ministry"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MEETING TIMES ===== */}
      <section className="py-[70px] bg-[#111]">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="relative h-[350px] lg:h-[400px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop"
                alt="Teens worshipping"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>

            <motion.div variants={slideInRight} className="text-white">
              <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-[44px] text-white mb-6">
                Meeting every Sunday and Wednesday.
              </h2>
              <p className="text-[#ddd] text-[17px] leading-relaxed">
                This is a camp for raising giants. A group of vibrant teenagers
                who let the fear of the Lord be their guide and are not afraid
                to talk about Jesus everywhere they go. Using media and latest
                technologies, they are better exposed and positioned to affect
                their world and bring many to Christ. Guiding our teens is such
                a great privilege.
              </p>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto"
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
