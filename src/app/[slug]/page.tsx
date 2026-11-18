"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type PageData = {
  title: string;
  slug: string;
  subtitle?: string;
  bannerImage?: string;
  content?: string;
  buttonText?: string;
  buttonUrl?: string;
};

const configuredApi =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

const normalizedApi = configuredApi.replace(/\/+$/, "");

const API = normalizedApi.endsWith("/api/v1")
  ? normalizedApi
  : `${normalizedApi}/api/v1`;

export default function CustomPublicPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let active = true;

    setLoading(true);

    fetch(`${API}/custom-pages/public/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Page not found");
        return res.json();
      })
      .then((result) => {
        if (active) setPage(result.data || null);
      })
      .catch(() => {
        if (active) setPage(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#ef2b34]" />
          <p className="mt-5 text-sm font-medium tracking-wide text-gray-500">
            LOADING CONTENT...
          </p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6] px-5">
        <div className="max-w-md text-center">
          <span className="text-sm font-bold tracking-[0.3em] text-[#ef2b34]">
            404
          </span>
          <h1 className="mt-4 font-cormorant text-5xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-4 leading-7 text-gray-500">
            This page may have been unpublished or removed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-[#ef2b34] px-8 py-3 font-semibold text-white transition hover:bg-[#c91e27]"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isExternal = page.buttonUrl?.startsWith("http");

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#171717] px-5 py-24 sm:min-h-[520px]">
        {page.bannerImage && (
          <img
            src={page.bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span className="text-[#ef2b34]">/</span>
            <span className="text-white">{page.title}</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-6 h-[3px] w-16 bg-[#ef2b34]" />

            <h1 className="font-cormorant text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              {page.title}
            </h1>

            {page.subtitle && (
              <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-xl">
                {page.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#ef2b34]" />
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-[#faf9f6] px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
            {/* SIDE LABEL */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l-2 border-[#ef2b34] pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  Explore
                </p>

                <p className="mt-3 font-cormorant text-2xl font-semibold text-gray-900">
                  {page.title}
                </p>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Discover more about what we do and what makes us unique.
                </p>
              </div>
            </aside>

            {/* CONTENT */}
            <article className="min-w-0">
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#ef2b34]">
                  About This Page
                </span>

                <div className="mt-5 h-px w-full bg-gray-200" />
              </div>

              <div className="whitespace-pre-line break-words text-base leading-[2] text-gray-600 sm:text-lg [&_strong]:font-bold [&_strong]:text-gray-900">
                {page.content || "Content coming soon."}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      {page.buttonText && page.buttonUrl && (
        <section className="bg-white px-5 py-20 sm:py-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#171717] px-8 py-14 text-center sm:px-16 sm:py-20">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/[0.04]" />
            <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full border-[35px] border-white/[0.04]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto mb-7 h-[3px] w-14 bg-[#ef2b34]" />

              <h2 className="font-cormorant text-3xl font-bold text-white sm:text-5xl">
                Take the Next Step
              </h2>

              <p className="mt-5 text-base leading-7 text-white/60">
                Continue exploring and discover more.
              </p>

              {/* {isExternal ? (
                <a
                  href={page.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ef2b34] px-9 py-4 text-sm font-bold text-white transition hover:bg-[#c91e27] hover:shadow-xl"
                >
                  {page.buttonText}
                  <span aria-hidden="true">→</span>
                </a>
              ) : (
                <Link
                  href={page.buttonUrl}
                  className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ef2b34] px-9 py-4 text-sm font-bold text-white transition hover:bg-[#c91e27] hover:shadow-xl"
                >
                  {page.buttonText}
                  <span aria-hidden="true">→</span>
                </Link>
              )} */}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
