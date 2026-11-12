"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

const Services = () => {
  const pageContent = useCmsPageData("home", content);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = pageContent.services.items;

  return (
    <section>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden"
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

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
                <h3 className="mb-3 font-cormorant text-[30px] font-bold uppercase leading-tight">
                  {service.title}
                </h3>

                <p className="text-sm leading-6 text-gray-200">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="group/link mt-3 inline-flex items-center gap-2 font-semibold text-white/90 transition-colors hover:text-white"
                >
                  <span>{service.buttonText}</span>

                  <svg
                    className={`h-5 w-5 transition-transform duration-300 ${
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
