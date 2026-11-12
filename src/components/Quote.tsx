"use client";

import content from "@/content/home.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

const Quote = () => {
  const pageContent = useCmsPageData("home", content);
  return (
    <section className="grid min-h-[550px] grid-cols-1 md:grid-cols-2">
      <div
        className="min-h-[250px] md:min-h-full"
        style={{
          backgroundImage: `url('${pageContent.quote.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="flex items-center justify-center bg-primary p-[50px] text-white md:p-[80px]">
        <h2 className="text-center font-cormorant text-4xl font-bold leading-[1.2] sm:text-5xl md:text-left lg:text-[65px]">
          “{pageContent.quote.text}”
        </h2>
      </div>
    </section>
  );
};

export default Quote;
