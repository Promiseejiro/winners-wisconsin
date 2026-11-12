export default function LivePage() {
  const liveStreamUrl = "https://shorturl.at/9SK2G";

  return (
    <div className="min-h-[75vh] bg-[#111] text-white">
      <section className="container py-24">
        <p className="text-primary uppercase tracking-[3px] text-xs font-bold">
          Worship with us
        </p>

        <h1 className="mt-4 text-5xl md:text-7xl font-bold max-w-4xl">
          Live Service
        </h1>

        <p className="mt-6 max-w-2xl text-white/70 text-lg">
          Can't make it to church today, or you're driving and would still like
          to follow the service? Join us live online and worship with us from
          wherever you are.
        </p>

        <div className="mt-10 border border-white/10 bg-white/5 p-4 md:p-10 max-w-4xl">
          <div className="aspect-video bg-black overflow-hidden">
            <iframe
              src={liveStreamUrl}
              title="Winners Chapel International Milwaukee Wisconsin Live Service"
              className="h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Worship With Us Online</h2>

            <p className="mt-3 max-w-2xl text-white/70">
              Join us live online and worship with us from wherever you are. We
              look forward to having you with us—onsite or online. God bless
              you!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
