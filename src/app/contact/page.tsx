"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState, FormEvent } from "react";
import Button from "@/components/common/Button";
import { MdLocationOn, MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ContactPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api/v1"}/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, subject, message }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || "Unable to send message");
      setIsSubmitted(true); setFirstName(""); setLastName(""); setEmail(""); setSubject(""); setMessage("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) { console.error(error); alert(error instanceof Error ? error.message : "Unable to send message"); }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen h-screen overflow-hidden flex items-center text-center text-white">
        <Image
          alt="Bishop David Oyedepo preaching at Winners Chapel"
          fill
          className="object-cover z-0"
          src="https://winnerschapelmaryland.com/wp-content/uploads/2024/11/david-oyedepo.jpg"
          priority
        />
        <div className="absolute inset-0 bg-black/55 z-1" />

        <motion.div
          className="relative z-2 w-full px-5 pt-[100px] pb-[60px] max-w-[1200px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-[70px] font-bold mb-2.5 [text-shadow:0_4px_20px_rgba(0,0,0,0.6)]"
          >
            Contact Us
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-normal text-[#ddd] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Winners Chapel Intl. Maryland
          </motion.h2>
        </motion.div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-[80px]">
        <div className="container">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center max-w-[750px] mx-auto mb-[50px] text-lg text-[#444]"
          >
            Thank you for visiting our website. Please use the form below to
            contact us if you have any enquiries regarding our church or any of
            our services.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Form */}
            <motion.div variants={fadeInLeft}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label
                      htmlFor="firstName"
                      className="block font-semibold text-sm mb-1.5 text-[#333]"
                    >
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full px-[18px] py-[14px] border border-[#ececec] rounded-[6px] text-[15px] bg-[#fafafa] transition-colors focus:border-primary focus:outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(239,43,52,0.1)]"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="lastName"
                      className="block font-semibold text-sm mb-1.5 text-[#333]"
                    >
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your last name"
                      className="w-full px-[18px] py-[14px] border border-[#ececec] rounded-[6px] text-[15px] bg-[#fafafa] transition-colors focus:border-primary focus:outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(239,43,52,0.1)]"
                    />
                  </div>
                </div>

                <div className="form-group mt-5">
                  <label
                    htmlFor="email"
                    className="block font-semibold text-sm mb-1.5 text-[#333]"
                  >
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-[18px] py-[14px] border border-[#ececec] rounded-[6px] text-[15px] bg-[#fafafa] transition-colors focus:border-primary focus:outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(239,43,52,0.1)]"
                  />
                </div>

                <div className="form-group mt-5">
                  <label htmlFor="subject" className="block font-semibold text-sm mb-1.5 text-[#333]">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input type="text" id="subject" name="subject" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full px-[18px] py-[14px] border border-[#ececec] rounded-[6px] text-[15px] bg-[#fafafa] transition-colors focus:border-primary focus:outline-none focus:bg-white" />
                </div>

                <div className="form-group mt-5">
                  <label
                    htmlFor="message"
                    className="block font-semibold text-sm mb-1.5 text-[#333]"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-[18px] py-[14px] border border-[#ececec] rounded-[6px] text-[15px] bg-[#fafafa] transition-colors focus:border-primary focus:outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(239,43,52,0.1)] min-h-[140px] resize-y"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-center justify-center mt-5"
                >
                  Send{" "}
                </Button>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-[6px] text-center"
                  >
                    Thank you for your message. We will get back to you soon!
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={fadeInRight}
              className="bg-[#f8f8f8] p-[40px] rounded-xl border-l-4 border-primary"
            >
              <h3 className="font-cormorant text-[28px] mb-2.5 font-bold">
                Get in Touch
              </h3>
              <p className="text-[#666] mb-[30px] text-[15px]">
                We'd love to hear from you. Reach out to us through any of the
                channels below.
              </p>

              <div className="flex gap-4 mb-5 items-start">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  <MdLocationOn />
                </div>
                <div className="text-[15px] text-[#333] leading-relaxed">
                  <strong className="block font-semibold text-[#111]">
                    Address
                  </strong>
                  Faith Dome 4825 Glenn Dale Rd, Bowie, MD 20720
                </div>
              </div>

              <div className="flex gap-4 mb-5 items-start">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  {/* <FaEmai
                   */}

                  <MdOutlineMailOutline />
                </div>
                <div className="text-[15px] text-[#333] leading-relaxed">
                  <strong className="block font-semibold text-[#111]">
                    Email
                  </strong>
                  info@winnerschapelWisconsin.org
                </div>
              </div>

              <div className="flex gap-4 mb-5 items-start">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg flex-shrink-0">
                  <FaPhoneAlt className="text-white" />
                </div>
                <div className="text-[15px] text-[#333] leading-relaxed">
                  <strong className="block font-semibold text-[#111]">
                    Phone
                  </strong>
                  301-526-3382
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full text-center justify-center mt-5"
              >
                JOIN NOW
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="pb-[60px]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <iframe
              src="https://maps.google.com/maps?q=Faith%20Dome%204825%20Glenn%20Dale%20Rd%2C%20Bowie%2C%20MD%2020720&t=m&z=16&output=embed&iwloc=near"
              title="Faith Dome 4825 Glenn Dale Rd, Bowie, MD 20720"
              allowFullScreen
              loading="lazy"
              className="w-full h-[450px] border-0 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICE TIMES ===== */}
      <motion.section
        className="bg-[#f8f8f8] py-[60px] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.h4
            variants={fadeInUp}
            className="text-[22px] mb-2 font-inter font-semibold"
          >
            Sunday Morning Worship:
          </motion.h4>
          <motion.p variants={fadeInUp} className="text-base text-[#444]">
            <strong>First Service: 8:00 am</strong> &nbsp;|&nbsp;{" "}
            <strong>Second Service: 10:30 am</strong>
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-4">
            <h4 className="text-[22px] mb-2 font-inter font-semibold">
              Communion Service:
            </h4>
            <p className="text-base text-[#444]">
              <strong>Wednesdays at 6:00 pm</strong>
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-5 pt-5 border-t-2 border-[#ececec]"
          >
            <h4 className="text-[22px] mb-2 font-inter font-semibold">
              Main Location:
            </h4>
            <p className="text-base text-[#444]">
              <strong>4825 Glenn Dale Rd, Bowie, MD 20720</strong>
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-[30px]">
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
        </div>
      </motion.section>
    </>
  );
}
