"use client";
import content from "@/content/plan-your-visit.json";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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

export default function PlanYourVisitPage() {
  // Move useRouter inside the component
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: "What to expect",
      content:
        "Our services are packaged with intense worship and inspirational teachings from the Word of God. You should expect a transformation as you attend.",
    },
    {
      title: "Parking Information",
      content:
        "Are you planning a visit to church? When you come in for the first time, drive towards the Main Lobby with your hazard lights on and a Parking Team member will be available to attend to you.",
    },
    {
      title: "Children, Teen, and Youth Services",
      content: (
        <div className="space-y-4">
          <div>
            <strong>CHILDRENS' MINISTRY</strong>
            <p className="text-[#555] mt-1">
              We have a fully equipped children's ministry with passionate
              members ready to attend to your children while you enjoy an
              uninterrupted worship experience.
            </p>
          </div>
          <div>
            <strong>TEENS MINISTRY</strong>
            <p className="text-[#555] mt-1">
              Our teens ministry is a mini church where an awesome interactive
              worship experience holds, engaging and challenging young minds.
              Your teenagers will love it here.
            </p>
          </div>
          <div>
            <strong>YOUTH MINISTRY</strong>
            <p className="text-[#555] mt-1">
              This ministry caters for millennials. It is vibrant and kingdom
              focused. Millennials love it here and have a platform to show
              their giftings and talents at 12 Noon Sunday Worship Experience.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen h-screen overflow-hidden flex items-center text-center text-white">
        <div className="absolute inset-0 bg-[#111] z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-1" />

        <motion.div
          className="relative z-2 w-full px-5 pt-20 pb-10 max-w-300 mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold mb-4 leading-tight"
          >
            We are so excited to welcome you to Winners Chapel Maryland
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-light text-white/80 max-w-[700px] mx-auto"
          >
            Here are some information on our services and events
          </motion.h2>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="#sunday"
              >
                SUNDAY SERVICES
              </Button>
            </motion.div>
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="#wednesday"
              >
                Wednesday Communion Service
              </Button>
            </motion.div>
            <motion.div variants={slideInUp}>
              <Button
                variant="primary"
                size="md"
                className="rounded-full px-8"
                href="#daily"
              >
                DAILY PRAYER
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SUNDAY SERVICES ===== */}
      <section className="py-[70px] bg-white" id="sunday">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="bg-[#f8f8f8] p-8 rounded-lg"
            >
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-2">
                Sunday Services
              </h2>
              <h3 className="font-inter text-2xl font-semibold text-primary mb-2">
                Every Sunday
              </h3>
              <h3 className="font-inter text-xl font-semibold text-[#111] mb-4">
                First Service: 8:00 am | Second Service: 10:30 am
              </h3>
              <p className="text-[#555] text-base mb-6">
                4825 Glenn Dale Rd, Bowie, MD 20720
              </p>

              <div className="border-t-2 border-[#ececec] pt-6">
                {accordionItems.map((item, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-semibold text-[#111]">
                        {item.title}
                      </span>
                      <span className="text-primary text-xl font-bold">
                        {openAccordion === index ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openAccordion === index
                          ? "max-h-[1000px] mt-2"
                          : "max-h-0"
                      }`}
                    >
                      <div className="bg-white p-4 rounded-lg text-[#555] text-base">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-[#f8f8f8] rounded-lg overflow-hidden"
            >
              <div className="h-full min-h-[300px] bg-gray-200 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1200&auto=format&fit=crop"
                  alt="Sunday Service"
                  width={600}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WEDNESDAY COMMUNION ===== */}
      <section className="py-[70px] bg-[#f8f8f8]" id="wednesday">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="bg-[#111] p-8 rounded-lg text-white min-h-[300px] flex items-center"
            >
              <div>
                <h2 className="font-cormorant text-4xl sm:text-5xl font-bold mb-2">
                  Wednesday Communion Service
                </h2>
                <h3 className="font-inter text-2xl font-semibold text-primary mb-2">
                  Every Wednesday from 6:00 pm
                </h3>
                <p className="text-[#ddd] text-base">
                  4825 Glenn Dale Rd, Bowie, MD 20720
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-[#111] rounded-lg overflow-hidden"
            >
              <div className="h-[300px] bg-gray-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop"
                  alt="Communion Service"
                  width={600}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== DAILY PRAYER ===== */}
      <section className="py-[70px] bg-white" id="daily">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="bg-[#f8f8f8] p-8 rounded-lg"
            >
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-2">
                Covenant Hour of Prayer
              </h2>
              <h3 className="font-inter text-2xl font-semibold text-primary mb-2">
                Everyday from 6:00am – 7:00am
              </h3>
              <h3 className="font-inter text-xl font-semibold text-[#111] mb-4">
                Every Saturday 9:00am – 10:00am
              </h3>
              <p className="text-[#555] text-base">
                4825 Glenn Dale Rd, Bowie, MD 20720
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-[#f8f8f8] rounded-lg overflow-hidden"
            >
              <div className="h-[300px] bg-gray-300 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop"
                  alt="Prayer"
                  width={600}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="py-[70px] bg-[#111]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-white">
                Our Main Location
              </h2>
              <p className="text-white/80 text-lg mt-2">
                4825 Glenn Dale Rd, Bowie, MD 20720
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="https://winnerschapelmaryland.com/wp-content/uploads/2020/03/MainLocationWorshipTeam.jpg"
                  alt="Main Location"
                  width={600}
                  height={400}
                  className="object-cover w-full h-[350px]"
                />
              </div>
              <div className="rounded-lg overflow-hidden bg-[#1a1a1a] h-[350px] flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-lg">View on Google Maps</p>
                  <p className="text-sm text-white/40">
                    4825 Glenn Dale Rd, Bowie, MD 20720
                  </p>
                </div>
              </div>
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
                  router.push("/contact");
                }}
              >
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
