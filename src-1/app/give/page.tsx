import Link from "next/link";
export default function GivePage() {
  return (
    <div className="bg-white">
      <section className="bg-[#111] text-white py-24">
        <div className="container">
          <p className="text-primary uppercase tracking-[3px] text-xs font-bold">
            Generosity
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-bold">Give</h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            Your generosity helps us advance the Gospel, serve our community and
            support the work of the church.
          </p>
        </div>
      </section>
      <section className="container py-16 grid md:grid-cols-2 gap-8">
        <div className="border border-border p-8">
          <p className="text-primary font-bold text-xs uppercase tracking-[2px]">
            Give with purpose
          </p>
          <h2 className="text-3xl font-bold mt-3">Partner with the work</h2>
          <p className="mt-5 text-gray-600 leading-8">
            Whether you are supporting church operations, missions, outreach or
            a special project, every gift makes a difference.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-7 bg-primary text-white px-6 py-3 font-semibold"
          >
            Contact Us to Give
          </Link>
        </div>
        <div className="bg-[#f8f8f8] p-8">
          <h2 className="text-2xl font-bold">Giving information</h2>
          <p className="mt-4 text-gray-600 leading-8">
            For the current giving options and instructions, please contact the
            church office so we can provide the correct and up-to-date details.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-6 border border-black px-6 py-3 font-semibold"
          >
            Contact the Church
          </Link>
        </div>
      </section>
    </div>
  );
}
