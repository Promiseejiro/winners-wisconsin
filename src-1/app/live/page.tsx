export default function LivePage() {
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
          Join Winners Chapel International Milwaukee Wisconsin online during
          our live services. The live stream will appear here when a service is
          being broadcast.
        </p>
        <div className="mt-10 border border-white/10 bg-white/5 p-10 max-w-4xl">
          <div className="aspect-video bg-black grid place-items-center text-center">
            <div>
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 grid place-items-center">
                <span className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Live stream</h2>
              <p className="mt-2 text-white/50">
                Please check back when our next service begins.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
