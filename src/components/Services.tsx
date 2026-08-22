"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "JOIN US TODAY",
    description:
      "Looking for a community? Find your place with us. Your journey starts here with us.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    link: "/announcement",
  },
  {
    title: "ATTEND A SERVICE",
    description:
      "Don't live a life less than God designed for you. Take your first step today. Join us for worship.",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
    link: "/announcement",
  },
  {
    title: "COVENANT HOUR",
    description:
      "This is a time for personal and corporate prayer, where we connect with God.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop",
    link: "/announcement",
  },
  {
    title: "FREE TRANSPORT",
    description:
      "Join our free buses to get to church, new and old members are always welcome.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    link: "/announcement",
  },
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="relative overflow-hidden group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={380}
                className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-cormorant text-[30px] font-bold uppercase leading-tight mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-200 leading-6">
                  {service.description}
                </p>

                {/* Learn More with Arrow */}
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold mt-3 transition-colors group/link"
                >
                  <span>Learn More</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      hoveredIndex === index ? "translate-x-2" : ""
                    }`}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
