"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PlayCircle,
  Headphones,
  Download,
  Search,
  CalendarDays,
} from "lucide-react";

type Sermon = {
  _id: string;
  title: string;
  preacher: string;
  date: string;
  category?: string;
  audioUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  thumbnail?: string;
  description?: string;
};

const API =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api/v1";

const labels: Record<string, string> = {
  teens: "Teens",
  "home-groups": "Home Groups / WSF",
  "youth-alive": "Youth Alive",
  "bible-institute": "Bible Institute",
};

export default function SermonArchive({
  category,
  title,
  description,
}: {
  category: string;
  title: string;
  description: string;
}) {
  const [items, setItems] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/sermons?category=${encodeURIComponent(category)}`)
      .then((r) => r.json())
      .then((b) => setItems(b.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(
    () =>
      items.filter((x) =>
        `${x.title} ${x.preacher}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <div className="min-h-[70vh] bg-white">
      <section className="bg-[#111] text-white py-20">
        <div className="container">
          <p className="text-primary uppercase tracking-[3px] text-xs font-bold">
            {labels[category] || "Sermons"}
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">{description}</p>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-[2px]">
              Sermon Library
            </p>
            <h2 className="text-3xl font-bold mt-2">Latest messages</h2>
          </div>
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sermons..."
              className="w-full border border-border pl-11 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">
            Loading sermons...
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-gray-300 py-16 text-center">
            <h3 className="text-xl font-semibold">No sermons yet</h3>
            <p className="text-gray-500 mt-2">
              New messages in this category will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((x) => (
              <article
                key={x._id}
                className="border border-border bg-white overflow-hidden group transition-shadow hover:shadow-lg"
              >
                {x.thumbnail ? (
                  <img
                    src={x.thumbnail}
                    alt={x.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="h-52 bg-[#f5f5f5] grid place-items-center">
                    <PlayCircle size={52} className="text-primary" />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={14} />
                    {x.date ? new Date(x.date).toLocaleDateString() : ""}
                  </div>

                  <h3 className="text-xl font-bold mt-3">{x.title}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">
                    {x.preacher}
                  </p>

                  {x.description && (
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {x.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-5">
                    {x.videoUrl && (
                      <a
                        href={x.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        <PlayCircle size={16} />
                        Watch
                      </a>
                    )}

                    {x.audioUrl && (
                      <a
                        href={x.audioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Headphones size={16} />
                        Listen
                      </a>
                    )}

                    {x.downloadUrl && (
                      <a
                        href={x.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Download size={16} />
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
