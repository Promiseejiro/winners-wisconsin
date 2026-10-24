import Image from "next/image";
import Button from "./common/Button";

const events = [
  {
    title: "Youth Conference",
    description:
      "A gathering of worship, prayer and empowerment for young believers.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Christmas Worship",
    description:
      "Celebrate the joy and hope of Christ with worship and praise.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop",
  },
];

const Events = () => {
  return (
    <section className="py-[100px] bg-[#fafafa]">
      <div className="container">
        <div className="text-center mb-[70px]">
          <span className="text-primary uppercase tracking-[2px] text-xs font-bold">
            Upcoming
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold mt-4">
            Church Events
          </h2>
        </div>

        <div className="flex flex-col gap-[25px]">
          {events.map((event) => (
            <div
              key={event.title}
              className=" border border-[#ececec] grid grid-cols-1 md:grid-cols-[260px_1fr_auto] gap-[30px] p-5 items-center rounded-lg"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={260}
                height={180}
                className="h-[180px] object-cover rounded-md w-full md:w-auto"
              />
              <div>
                <h3 className="font-cormorant text-[34px] font-bold mb-3">
                  {event.title}
                </h3>
                <p className="text-[#666] leading-relaxed">
                  {event.description}
                </p>
              </div>
              <Button variant="primary" size="md" className="md:ml-auto">
                Read More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
