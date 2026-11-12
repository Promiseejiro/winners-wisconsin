import Link from "next/link";

const TITHELY_FORM_URL =
  "https://give.tithe.ly/?formId=6baf686c-6865-11ee-90fc-1260ab546d11";

const givingMethods = [
  {
    number: "01",
    title: "Give through Zelle",
    description:
      "Use your banking app to make a Zelle payment to the church using the details below.",
    details: [
      {
        label: "Zelle email",
        value: "Tithes-offerings@winnerschapelwi.org",
      },
      {
        label: "Recipient",
        value: "WMA Winners Chapel International Wisconsin",
      },
    ],
  },
  {
    number: "02",
    title: "Give through Tithe.ly",
    description:
      "Give online through our Tithe.ly giving form, or download the Tithe.ly app and select Winners Chapel International, Wisconsin.",
    details: [],
  },
  {
    number: "03",
    title: "Give by cheque",
    description:
      "Make your cheque payable to the church using the official name below.",
    details: [
      {
        label: "Payable to",
        value: "Winners Chapel International, Wisconsin",
      },
    ],
  },
  {
    number: "04",
    title: "Give by cash",
    description:
      "If you would like to give by cash during a church service, please obtain a giving envelope from one of the ushers.",
    details: [],
  },
  {
    number: "05",
    title: "Shiloh Sacrifice",
    description:
      "For Shiloh Sacrifice giving, the bank details provided by the church are listed below.",
    details: [
      {
        label: "Bank",
        value: "BMO Bank",
      },
      {
        label: "Account number",
        value: "4850295657",
      },
      {
        label: "Routing number",
        value: "071025661",
      },
    ],
  },
];

function GivingCard({
  number,
  title,
  description,
  details,
}: {
  number: string;
  title: string;
  description: string;
  details: { label: string; value: string }[];
}) {
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

      {details.length > 0 && (
        <div className="mt-6 space-y-4 border-t border-border pt-5">
          {details.map((detail) => (
            <div
              key={detail.label}
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

      {number === "02" && (
        <a
          href={TITHELY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Give Online with Tithe.ly
          <span aria-hidden="true">↗</span>
        </a>
      )}
    </article>
  );
}

export default function GivePage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#111] py-20 text-white sm:py-24 lg:py-28">
        <div className="container relative mx-auto px-5">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            Generosity
          </p>

          <h1 className="mt-4 text-5xl font-bold sm:text-6xl md:text-7xl">
            Give
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Your generosity helps us advance the Gospel, serve our community,
            support missions, and strengthen the work of Winners Chapel
            International Wisconsin.
          </p>

          <a
            href={TITHELY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-primary px-7 py-4 font-semibold text-white transition hover:opacity-90"
          >
            Give Online Now
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      {/* Introduction */}
      <section className="container mx-auto px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            Giving with purpose
          </p>

          <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
            Give your kingdom seeds
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Thank you for your generosity and commitment to the work of God.
            Choose the giving method that is most convenient for you using the
            instructions provided below.
          </p>
        </div>
      </section>

      {/* All giving methods */}
      <section className="bg-[#f8f8f8] py-16 sm:py-20">
        <div className="container mx-auto px-5">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
              Other giving methods
            </p>

            <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
              Choose how you would like to give
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              In addition to online giving, you can support the church through
              Zelle, cheques, cash, or the designated Shiloh Sacrifice account.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {givingMethods.map((method) => (
              <GivingCard key={method.number} {...method} />
            ))}
          </div>

          <p className="mt-8 text-sm leading-7 text-gray-500">
            Please verify bank details and payment instructions with the church
            if you have any questions before making a transfer.
          </p>
        </div>
      </section>

      {/* Closing section */}
      <section className="container mx-auto px-5 py-16 sm:py-20">
        <div className="bg-[#111] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
            Thank you for giving
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            Thank you for partnering with the work of God.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/70">
            Every gift supports the mission of the church and helps us serve our
            community. We are grateful for your generosity.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={TITHELY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary px-7 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Give Through Tithe.ly
              <span aria-hidden="true">↗</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Contact the Church
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
