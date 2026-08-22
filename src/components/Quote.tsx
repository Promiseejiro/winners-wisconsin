const Quote = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[550px]">
      <div
        className="min-h-[250px] md:min-h-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1400&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="bg-primary text-white flex items-center justify-center p-[50px] md:p-[80px]">
        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-[65px] font-bold leading-[1.2] text-center md:text-left">
          “Faith makes all things possible.”
        </h2>
      </div>
    </section>
  );
};

export default Quote;
