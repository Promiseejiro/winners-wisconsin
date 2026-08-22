"use client";
import content from "@/content/ministries/youth-alive";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Button from "@/components/common/Button";
import { useState } from "react";
import Input from "@/components/common/input";
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

export default function YouthAlivePage() {
  const router = useRouter();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const focusAreas = [
    {
      icon: "🔒",
      title: "Secure their future",
    },
    {
      icon: "📖",
      title: "Impart Godly values",
    },
    {
      icon: "🎯",
      title: "Help them find their purpose",
    },
  ];

  const leaders = [
    {
      name: "Olajire Tayo",
      role: "Youth Pastor",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/te3.jpg",
    },
    {
      name: "James Onayiga",
      role: "YAF Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/onayiga-james-1.jpg",
    },
    {
      name: "Tracy Magino",
      role: "Assistant YAF Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/Tracy-Magino-1.jpg",
    },
    {
      name: "Oreoluwa Toluwani",
      role: "YAF Secretary",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/ore-1.jpg",
    },
    {
      name: "Segun Bolufemi",
      role: "YAF Program Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/eimage.jpg",
    },
    {
      name: "Jennifer Zoro",
      role: "YAF Special Duties Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/jen-z.jpg",
    },
    {
      name: "Loveth Igineweka",
      role: "YAF Choir Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-01-13-at-3.57.03-PM.jpg",
    },
    {
      name: "Ifeanyi Nwafor",
      role: "YAF Prayer Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/NWAFOR-I.jpg",
    },
    {
      name: "Temitope Munjoh",
      role: "YAF Usher & Hospitality Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/munjoh-t-1.jpg",
    },
    {
      name: "Claudia Nwafor",
      role: "YAF Evangelism Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/NWAFOR-C.jpg",
    },
    {
      name: "Emillienne Swiri",
      role: "YAF Sanctuary Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/SWIRRI-E.jpg",
    },
    {
      name: "Toluwa Soniregum",
      role: "YAF Utility Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/SONURI-T.jpg",
    },
    {
      name: "Johnson Ayuk",
      role: "YAF Sports Coordinator",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/JOHNSON-AYUK.jpg",
    },
    {
      name: "Clement Etuk",
      role: "Drama Coordinator (Mighty Acts)",
      image:
        "https://winnerschapelmaryland.com/wp-content/uploads/2024/08/ETUK-C-scaled-1.jpg",
    },
  ];

  const teamOptions = [
    "Choir",
    "Prayer Squad",
    "Evangelism & Outreach",
    "Hospitality & Follow up",
    "Social Media",
    "Technical",
    "Mighty Acts",
  ];

  const handleServiceUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

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
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold mb-2.5"
          >
            {content.title}
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-lg sm:text-xl md:text-2xl font-light text-white/80 max-w-[600px] mx-auto"
          >
            The ministry of Winners Chapel to young adults
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

      {/* ===== ABOUT US ===== */}
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
              className="bg-[#f8f8f8] p-8 md:p-10 rounded-lg"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111] mb-6">
                About Us
              </h2>
              <p className="text-[#555] leading-relaxed mb-4 text-base">
                The Youth Alive Fellowship (Y.A.F.) is the Young Adult arm of
                the Winners Chapel International Church Worldwide. We are driven
                to Raise a Generation Alive in Spirit, Soul and Body through
                Spiritual, Social and total development of our young adults,
                empowering and equipping them to impact the World.
              </p>
              <div className="mt-6">
                <p className="text-[#555] leading-relaxed mb-3 text-base font-semibold">
                  Our Core Values are:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li className="text-[#555] text-base">Spirituality</li>
                  <li className="text-[#555] text-base">Purpose</li>
                  <li className="text-[#555] text-base">Leadership</li>
                  <li className="text-[#555] text-base">Service</li>
                  <li className="text-[#555] text-base">Responsibility</li>
                  <li className="text-[#555] text-base">
                    Integrity & Discipline
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="relative h-[300px] md:h-[400px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                alt="Youth Alive"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="py-[70px] bg-[#111]">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={slideInLeft}
              className="bg-[#1a1a1a] p-8 rounded-lg text-center"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl text-white mb-4">
                Our Vision
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-[#ddd] text-lg leading-relaxed">
                Raising a Generation Alive in Spirit, Soul & Body.
              </p>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="bg-[#1a1a1a] p-8 rounded-lg text-center"
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl text-white mb-4">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-[#ddd] text-lg leading-relaxed">
                Upgrade and Update our Youth on Total Development in the Spirit,
                Soul, and Body.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== LEADERS ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-3">
              Our Leaders
            </h3>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {leaders.map((leader, index) => (
              <motion.div
                key={index}
                variants={fadeInScale}
                className="bg-[#f8f8f8] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center bg-[#1a1a1a]">
                  <h4 className="font-inter font-semibold text-white text-base">
                    {leader.name}
                  </h4>
                  <p className="text-[#aaa] text-sm">{leader.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== EVENT CALENDAR ===== */}
      <section className="py-[70px] bg-[#f8f8f8]">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h4 className="font-inter text-2xl font-semibold text-[#111] mb-3">
              Event Calendar
            </h4>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-[#555] text-lg mb-6">
                Join a generation of young adults on fire for God. Take your
                first step towards it.
              </p>
              <Button variant="primary" size="lg" className="rounded-full">
                Join Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SIGN UP FOR YAF SERVICE UNIT ===== */}
      <section className="py-[70px] bg-white">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-3">
                Sign up for YAF Service Unit
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[#555] text-center mb-8"
            >
              Kingdom stewardship is one of our covenant responsibilities to
              access divine blessings, favor, and rewards. It is God's wisdom
              for connecting the redeemed to their rewards. It is a great way to
              build your skills, self-confidence and achieve great joy.
              <br />
              <br />
              We urge you to pray about where God wants you to serve and plug
              in.
            </motion.p>

            <motion.div variants={fadeInUp}>
              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-xl font-semibold text-green-700 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-600">
                    Your submission has been received. We will contact you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleServiceUnitSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      required
                    />
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    <Input
                      id="phone"
                      label="Phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="input-label">
                      What Team are you interested in?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                      {teamOptions.map((team) => (
                        <label
                          key={team}
                          className="flex items-center gap-2 text-sm text-[#555] cursor-pointer hover:text-primary transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-primary cursor-pointer"
                          />
                          {team}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Input
                    id="message"
                    label="Your Message"
                    type="textarea"
                    placeholder="Tell us why you'd like to join this team..."
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Send
                  </Button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-[70px] bg-[#f8f8f8]">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-3">
                Contact Us
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[#555] text-center mb-8"
            >
              For inquiries, contact 301-526-3382
              <br />
              Are you in need of prayers, contact our Prayer Squad on
              301-526-3382
            </motion.p>

            <motion.div variants={fadeInUp}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="contactFirstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                  />
                  <Input
                    id="contactLastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="contactEmail"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                  <Input
                    id="contactPhone"
                    label="Phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject"
                  placeholder="Enter subject"
                  required
                />

                <Input
                  id="contactMessage"
                  label="Your Message"
                  type="textarea"
                  placeholder="Write your message here..."
                  rows={4}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Send
                </Button>
              </form>
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
