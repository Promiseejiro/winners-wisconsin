import Image from "next/image";

const ministries = [
  {
    title: "Kids Ministry",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Women Ministry",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Teen Ministry",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Prayer Ministry",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop",
  },
];

const Ministries = () => {
  return (
    <section className="py-[100px] bg-black text-white">
      <div className="container">
        <div className="text-center mb-[70px]">
          <span className="text-primary uppercase tracking-[2px] text-xs font-bold">
            Departments
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-white">
            Our Ministries
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
          {ministries.map((ministry) => (
            <div
              key={ministry.title}
              className="relative overflow-hidden rounded-lg group"
            >
              <Image
                src={ministry.image}
                alt={ministry.title}
                width={400}
                height={380}
                className="h-[380px] object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6 text-white">
                <h3 className="font-cormorant text-[30px] font-bold">
                  {ministry.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;
