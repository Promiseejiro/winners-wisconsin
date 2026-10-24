"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/input";

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

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    teams: [] as string[],
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const teamOptions = [
    "Children's Ministry",
    "Choir",
    "Decoration",
    "Drama Team",
    "Hospitality",
    "Sanctuary Keepers",
    "Security",
    "Media Team",
    "Medical Team",
    "Protocol Team",
    "Transportation Team",
    "Usher Team",
    "Follow-up Team",
    "Parking Team",
  ];

  const handleCheckboxChange = (team: string) => {
    setFormData((prev) => {
      const newTeams = prev.teams.includes(team)
        ? prev.teams.filter((t) => t !== team)
        : [...prev.teams, team];
      return { ...prev, teams: newTeams };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const ministryCards = [
    {
      title: "Children's Ministry",
      image: "/images/g1.jpg",
      description:
        "It is not just a service group but also a ministry of its own: a colorful, energetic, entertaining and dynamic ministry focused on teaching the word of faith to children from age one month to 12 years.",
    },
    {
      title: "Choir",
      image: "/images/g2.jpg",
      description:
        "The Music Ministry is made up of God-fearing men and women, who are talented music ministers and are committed to the work of God in music.",
    },
    {
      title: "Decoration",
      image: "/images/g3.jpg",
      description:
        "The Decoration Ministry is made up of creative individuals who beautify the church environment for services and special events.",
    },
    {
      title: "Drama Team",
      image: "/images/g6.jpg",
      description:
        "The mission of this team is to use theater as a ministry to encourage, instruct, and uplift the body of Christ.",
    },
    {
      title: "Hospitality",
      image: "/images/g9.jpg",
      description:
        "This team loves to create a friendly and welcoming atmosphere in and around our church services.",
    },
    {
      title: "Sanctuary Keepers",
      image: "/images/g8.jpg",
      description:
        "We have a team of committed men and women, devoted to making sure that the house of God is clean and tidy.",
    },
    {
      title: "Security",
      image: "/images/g11.jpg",
      description:
        "The security, health and safety of all is the priority of this team.",
    },
    {
      title: "Media Team",
      image: "/images/g12.jpg",
      description:
        "This team maintains and sets up musical instruments and microphones for all our services.",
    },
    {
      title: "Medical Team (The Gilead Squad)",
      image: "/images/healthfair.jpg",
      description:
        "Our worship services are undeniably safe at all times, and by God's grace, we have had no incidence since inception.",
    },
    {
      title: "Protocol Team",
      image: "/images/g5.jpg",
      description:
        "This team performs protocol duties during services, such as manning the church entrance, main sanctuary, and Pastor's office.",
    },
    {
      title: "Transportation Team",
      image: "/images/g11.jpg",
      description:
        "The objective of this ministry is to provide transportation services and relieve our members who have no alternatives.",
    },
    {
      title: "Usher Team",
      image: "/images/g13.jpg",
      description:
        "Members of this team create a friendly and welcoming atmosphere in the church services.",
    },
    {
      title: "Follow-up Team",
      image: "/images/g7.jpg",
      description:
        "This team dedicates itself to connecting first time guests and new converts to the church.",
    },
    {
      title: "Parking Team",
      image: "/images/g4.jpg",
      description:
        "This team ensures safety from the moment guests pull onto our property.",
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-screen h-screen overflow-hidden flex items-center text-left text-white">
        <div className="absolute inset-0 bg-[#111] z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-1" />

        <motion.div
          className="relative z-2 w-full px-5 pt-[100px] pb-[60px] max-w-[1200px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            Get <span className="text-primary">Involved.</span>
          </motion.h1>
          <motion.h2
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl font-light text-white/80 max-w-2xl"
          >
            Ministry Opportunities at Winners Chapel
          </motion.h2>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-[60px] bg-white">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { number: "4", label: "Worship and Creative Arts" },
              { number: "4", label: "Children and Care Services" },
              { number: "3", label: "Logistics and Support" },
              { number: "2", label: "Facilities and Operations" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInScale}
                className="bg-[#f8f8f8] p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-5xl font-bold text-primary font-cormorant">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-[#111] mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== INTRODUCTION ===== */}
      <section className="py-[60px] bg-[#f8f8f8]">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
              A help to those who need it.
            </p>
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#111]">
              Help Change a Life Ministry Opportunities at WCIMD
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ===== MINISTRY CARDS ===== */}
      <section className="py-[60px] bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="bg-[#f8f8f8] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-2xl font-bold text-[#111] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VOLUNTEER FORM ===== */}
      <section className="py-[80px] bg-[#f8f8f8]" id="volunteer">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111] mb-4">
                JOIN A GROUP
              </h2>
              <p className="text-[#555] max-w-2xl mx-auto">
                Thank you for your interest to join one of our amazing teams.
                Please fill out the form below and we will be in contact with
                you with your next step.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-[#111] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#555]">
                    Your submission has been received. We will contact you soon!
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    className="mt-6"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Response
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <Input
                      id="phone"
                      label="Phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >,
                      ) => setFormData({ ...formData, phone: e.target.value })}
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
                            checked={formData.teams.includes(team)}
                            onChange={() => handleCheckboxChange(team)}
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
                    value={formData.message}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >,
                    ) => setFormData({ ...formData, message: e.target.value })}
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
    </>
  );
}
