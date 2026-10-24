"use client";
import { useRouter } from "next/navigation";
import Button from "./common/Button";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative w-full min-h-screen h-screen overflow-hidden flex items-center text-left text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/video/WebIntro_wcimd_23_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-1" />

      {/* Content */}
      <div className="relative z-2 w-full px-5 pt-[100px] pb-[60px] max-w-[1200px] mx-auto">
        <div className="inline-block bg-primary text-white px-[18px] py-1.5 text-xs font-semibold uppercase tracking-wider rounded-[30px] mb-5">
          Wisconsin
        </div>
        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-[700px]">
          Building Lives <br />
          <span className="text-primary">Through Faith</span>
        </h1>
        <p className="max-w-137.5 text-white text-base md:text-lg text-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mb-[35px] leading-relaxed">
          Join us as we grow together in Christ through worship, prayer, and
          community.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              router.push("/plan-your-visit");
            }}
          >
            Attend Service
          </Button>
          {/* <Button variant="outline" size="lg">
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
