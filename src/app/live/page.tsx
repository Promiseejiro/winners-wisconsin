"use client";

import fallback from "@/content/live.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

export default function LivePage() {
  const content = useCmsPageData("live", fallback);
  return (
    <div className="min-h-[75vh] bg-[#111] text-white">
      <section className="container py-24">
        <p className="text-primary uppercase tracking-[3px] text-xs font-bold">{content.eyebrow}</p>
        <h1 className="mt-4 text-5xl md:text-7xl font-bold max-w-4xl">{content.title}</h1>
        <p className="mt-6 max-w-2xl text-white/70 text-lg">{content.description}</p>
        <div className="mt-10 border border-white/10 bg-white/5 p-4 md:p-10 max-w-4xl">
          <div className="aspect-video bg-black overflow-hidden">
            <iframe src={content.streamUrl} title={content.streamTitle || "Winners Chapel International Milwaukee Wisconsin Live Service"} className="h-full w-full border-0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">{content.onlineTitle}</h2>
            <p className="mt-3 max-w-2xl text-white/70">{content.onlineDescription}</p>
            {content.streamUrl && <a href="/contact" target="_blank" rel="noreferrer" className="mt-6 inline-flex bg-primary px-6 py-3 font-semibold text-white">{content.buttonText || "Watch Live"}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
