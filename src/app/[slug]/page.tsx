"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type PageData = { title: string; slug: string; subtitle?: string; bannerImage?: string; content?: string; buttonText?: string; buttonUrl?: string };
const configuredApi = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
const normalizedApi = configuredApi.replace(/\/+$/, "");
const API = normalizedApi.endsWith("/api/v1") ? normalizedApi : `${normalizedApi}/api/v1`;
export default function CustomPublicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) return;
    let active = true;
    fetch(`${API}/custom-pages/public/${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error("Page not found"); return r.json(); })
      .then(result => { if (active) setPage(result.data || null); })
      .catch(() => { if (active) setPage(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);
  if (loading) return <div className="min-h-screen pt-40 text-center text-gray-500">Loading page...</div>;
  if (!page) return <div className="min-h-screen px-5 pt-40 text-center"><h1 className="text-3xl font-bold">Page not found</h1><p className="mt-3 text-gray-500">This page may have been unpublished or removed.</p></div>;
  return <article className="min-h-screen bg-white pt-24">
    <header className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#111] px-5 py-20 text-center text-white">
      {page.bannerImage && <><img src={page.bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-black/60"/></>}
      <div className="relative z-10 max-w-4xl"><h1 className="font-cormorant text-4xl font-bold sm:text-6xl">{page.title}</h1>{page.subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{page.subtitle}</p>}</div>
    </header>
    <section className="container max-w-4xl py-16">
      <div className="whitespace-pre-line text-base leading-8 text-gray-700">{page.content || ""}</div>
      {page.buttonText && page.buttonUrl && <a href={page.buttonUrl} className="mt-10 inline-flex rounded-full bg-[#ef2b34] px-7 py-3 font-semibold text-white transition hover:bg-[#c91e27]" target={page.buttonUrl.startsWith("http") ? "_blank" : undefined} rel={page.buttonUrl.startsWith("http") ? "noreferrer" : undefined}>{page.buttonText}</a>}
    </section>
  </article>;
}
