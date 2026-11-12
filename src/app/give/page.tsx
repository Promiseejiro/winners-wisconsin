"use client";

import Link from "next/link";
import fallback from "@/content/give.json";
import { useCmsPageData } from "@/hooks/useCmsPageData";

function GivingCard({
  number,
  title,
  description,
  details,
  buttonText,
  buttonHref,
}: any) {
  return (
    <article className="border border-border bg-white p-6 transition duration-300 hover:border-primary/50 hover:shadow-md sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-sm font-bold text-white">
          {number}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
          <p className="mt-3 leading-7 text-gray-600">{description}</p>
        </div>
      </div>
      {Array.isArray(details) && details.length > 0 && (
        <div className="mt-6 space-y-4 border-t border-border pt-5">
          {details.map((detail: any, index: number) => (
            <div
              key={`${detail.label}-${index}`}
              className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6"
            >
              <span className="text-sm font-medium text-gray-500">
                {detail.label}
              </span>
              <span className="break-words font-semibold text-gray-900 sm:text-right">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}
      {buttonHref && (
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          {buttonText || "Give Online"} <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

export default function GivePage() {
  const content = useCmsPageData("give", fallback);
  const givingUrl = content.tithelyUrl || content.header?.buttonHref || "#";
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#111] py-20 text-white sm:py-24 lg:py-28">
        <div className="container relative mx-auto px-5">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            {content.header?.eyebrow}
          </p>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl md:text-7xl">
            {content.header?.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            {content.header?.description}
          </p>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-primary px-7 py-4 font-semibold text-white transition hover:opacity-90"
          >
            {content.header?.buttonText || "Give Online Now"}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="container mx-auto px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            {content.introduction?.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
            {content.introduction?.title}
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            {content.introduction?.description}
          </p>
        </div>
      </section>
      <section className="bg-[#f8f8f8] py-16 sm:py-20">
        <div className="container mx-auto px-5">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
              {content.methodsHeading?.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
              {content.methodsHeading?.title}
            </h2>
            <p className="mt-4 leading-8 text-gray-600">
              {content.methodsHeading?.description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {(content.methods || []).map((method: any, index: number) => (
              <GivingCard
                key={`${method.number || index}-${method.title}`}
                {...method}
                buttonHref={
                  method.buttonHref ||
                  (String(method.number) === "02" ? givingUrl : "")
                }
                buttonText={
                  method.buttonText ||
                  (String(method.number) === "02"
                    ? "Give Online with Tithe.ly"
                    : "")
                }
              />
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-gray-500">
            {content.methodsNote}
          </p>
        </div>
      </section>
      <section className="container mx-auto px-5 py-16 sm:py-20">
        <div className="bg-[#111] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            {content.closing?.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            {content.closing?.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            {content.closing?.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-4 font-semibold text-white transition hover:opacity-90"
            >
              {content.closing?.buttonText || "Give Through Tithe.ly"}{" "}
              <span aria-hidden="true">↗</span>
            </a>
            <Link
              href={content.closing?.contactHref || "/contact"}
              className="inline-flex items-center justify-center border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              {content.closing?.contactButtonText || "Contact the Church"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
