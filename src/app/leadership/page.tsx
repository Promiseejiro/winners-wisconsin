"use client";

import { useEffect, useState } from "react";

type Leader = { _id: string; name: string; role: string; image?: string; bio?: string };
const configuredApi = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
const normalizedApi = configuredApi.replace(/\/+$/, "");
const API = normalizedApi.endsWith("/api/v1") ? normalizedApi : `${normalizedApi}/api/v1`;
export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch(`${API}/leaders`, { cache: "no-store" })
      .then(r => { if (!r.ok) throw new Error("Unable to load leaders"); return r.json(); })
      .then(result => { if (active) setLeaders(Array.isArray(result.data) ? result.data : []); })
      .catch(() => { if (active) setLeaders([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <div className="min-h-screen bg-white pt-28">
    <section className="bg-[#111] px-5 py-20 text-center text-white"><p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#ef2b34]">Serving with purpose</p><h1 className="font-cormorant text-5xl font-bold sm:text-6xl">Our Leadership</h1><p className="mx-auto mt-5 max-w-2xl text-white/70">Meet the leaders and servants who help guide and serve our church community.</p></section>
    <section className="container py-16">
      {loading ? <p className="text-center text-gray-500">Loading leadership team...</p> : leaders.length === 0 ? <p className="text-center text-gray-500">Leadership profiles will be available soon.</p> : <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leaders.map(leader => <article key={leader._id} className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
          <div className="aspect-[4/5] bg-gray-100">{leader.image ? <img src={leader.image} alt={leader.name} className="h-full w-full object-cover"/> : <div className="grid h-full place-items-center text-5xl font-semibold text-gray-300">{leader.name.charAt(0)}</div>}</div>
          <div className="p-6"><h2 className="text-xl font-bold text-[#171717]">{leader.name}</h2><p className="mt-1 font-semibold text-[#ef2b34]">{leader.role}</p>{leader.bio && <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600">{leader.bio}</p>}</div>
        </article>)}
      </div>}
    </section>
  </div>;
}
