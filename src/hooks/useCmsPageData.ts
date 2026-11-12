"use client";

import { useEffect, useState } from "react";

function apiBase() {
  const configured =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000/api/v1";
  const base = configured.replace(/\/+$/, "");
  return base.endsWith("/api/v1") ? base : `${base}/api/v1`;
}

/** Deep-merges remote CMS values over the bundled page defaults. */
function mergeCmsData<T>(fallback: T, incoming: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(incoming) ? incoming : fallback) as T;
  }

  if (fallback && typeof fallback === "object") {
    const source =
      incoming && typeof incoming === "object" && !Array.isArray(incoming)
        ? (incoming as Record<string, unknown>)
        : {};
    const result: Record<string, unknown> = {
      ...(fallback as Record<string, unknown>),
    };

    for (const [key, value] of Object.entries(source)) {
      const defaultValue = (fallback as Record<string, unknown>)[key];
      result[key] =
        defaultValue && value && typeof defaultValue === "object" && typeof value === "object"
          ? mergeCmsData(defaultValue, value)
          : value;
    }

    return result as T;
  }

  return (incoming === undefined || incoming === null ? fallback : incoming) as T;
}

/** Loads a GitHub-backed public CMS page and keeps bundled JSON as an offline fallback. */
export function useCmsPageData<T extends Record<string, any>>(
  slug: string,
  fallback: T,
): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`${apiBase()}/content/public/page?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`CMS request failed (${response.status})`);
        return response.json();
      })
      .then((result) => {
        const incoming = result?.data?.data ?? result?.data;
        if (!cancelled && incoming && typeof incoming === "object") {
          setData(mergeCmsData(fallback, incoming));
        }
      })
      .catch((error) => {
        console.warn(`Unable to load CMS page "${slug}"; using bundled content.`, error);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return data;
}
