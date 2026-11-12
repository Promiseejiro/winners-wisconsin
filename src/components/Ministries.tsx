"use client";

import Image from "next/image";
import Link from "next/link";
import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

const Ministries = () => {
  const pageContent = useCmsPageData("home", content);
  const ministries = pageContent.ministries.items;

  return (
    <section className="bg-black py-[100px] text-white">
      <div className="container">
        <div className="mb-[70px] text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-primary">
            {pageContent.ministries.label}
          </span>

          <h2 className="mt-4 font-cormorant text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {pageContent.ministries.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry) => (
            <Link
              key={ministry.id}
              href={ministry.link}
              className="group relative overflow-hidden rounded-lg"
            >
              <Image
                src={ministry.image}
                alt={ministry.title}
                width={400}
                height={380}
                className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                <h3 className="font-cormorant text-[30px] font-bold transition-colors group-hover:text-primary">
                  {ministry.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;
