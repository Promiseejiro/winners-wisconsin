"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import content from "@/content/home.json";

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

const tabs = [
  {
    id: "prayer",
    label: "Covenant Hour of Prayer",
    title: "Covenant Hour of Prayer",
    description:
      "We gather every Monday to Saturday at 6:00 AM for the Covenant Hour of Prayer. This is a time for personal and corporate prayer, where we connect with God for spiritual empowerment, direction, and breakthroughs. We encourage all members to start their day in prayer and receive strength for the day ahead.",
    details: [
      "Time: Monday - Saturday, 6:00 AM",
      "Location: Church Sanctuary/Online (if applicable)",
    ],
    image: "/assets/images/eveangelism.jpg",
  },
  {
    id: "wsf",
    label: "Winners Satellite Fellowship (WSF)",
    title: "Winners Satellite Fellowship (WSF)",
    description:
      "We gather in homes across the city for our Winners Satellite Fellowship (WSF). This is a time for intimate fellowship, Bible study, and prayer. It's an opportunity to connect with other believers and grow together in faith.",
    details: [
      "Time: Every Saturday at 5:00 PM",
      "Location: Various Locations (Check our WSF Page)",
    ],

    image: "/assets/images/eveangelism.jpg",
  },
  {
    id: "andrew",
    label: "Operation Andrew",
    title: "Operation Andrew",
    description:
      "We believe in the power of personal evangelism, which is why Operation Andrew is held every third Saturday of every month. It is a time when members invite their friends, family, and neighbors to experience the power of the Gospel in an inviting atmosphere.",
    details: ["Next Date: [Third Saturday of This Month]"],
    image: "/assets/images/eveangelism.jpg",
  },
  {
    id: "bfc",
    label: "Believers Foundation Class (BFS)",
    title: "Believer's Foundation Class",
    description:
      "At Winners Chapel Manchester, we are committed to nurturing and growing new believers in Christ. Our Believer's Foundation Class is designed to equip individuals with the foundational knowledge they need to live a victorious Christian life.",
    details: [
      "Word Foundation",
      "Effective Prayer Life",
      "Kingdom Stewardship",
      "Holy Ghost Baptist (Practical Ministration)",
    ],
    image: "/assets/images/eveangelism.jpg",
  },
  {
    id: "wofbi",
    label: "Word Of Faith Bible Institute",
    title: "Word of Faith Bible Institute (WOFBI)",
    description:
      "This is a life-changing training centre where we equip believers with the knowledge of God's Word. Through WOFBI, we train future leaders, ministers, and believers who desire to deepen their knowledge of Scripture and live out the Word of God in their daily lives.",
    details: [
      "Basic Certificate Course (BCC)",
      "Leadership Certificate Course (LCC)",
      "Leadership Diploma Course (LDC)",
      "Summer Junior Bible School (SJBS)",
    ],
    image: "/assets/images/eveangelism.jpg",
  },
];

const ChurchUpdates = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-[80px] bg-[#f8f8f8] relative">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <div className="text-[#ef2b34] font-semibold text-sm uppercase tracking-[1px] mb-2">
              {content.churchUpdates.label}
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111]">
              {content.churchUpdates.title}
            </h2>
            <p className="text-[#555] max-w-2xl mx-auto mt-4">
              {content.churchUpdates.description}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    activeTab === index
                      ? "bg-[#ef2b34] text-white "
                      : "bg-white text-[#111] hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg  overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-10">
                  <h3 className="font-cormorant text-3xl font-bold text-[#111] mb-4">
                    {tabs[activeTab].title}
                  </h3>
                  <p className="text-[#555] leading-relaxed mb-6">
                    {tabs[activeTab].description}
                  </p>
                  <ul className="space-y-2">
                    {tabs[activeTab].details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#ef2b34] mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-[#555]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChurchUpdates;
