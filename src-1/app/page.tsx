import About from "@/components/About";
import Contact from "@/components/Contact";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import HeroSlider from "@/components/HeroSlider";
import Ministries from "@/components/Ministries";
import Quote from "@/components/Quote";
import Services from "@/components/Services";
import HomeCards from "@/components/HomeCards";
 
import ResidentPastor from "@/components/ResidentPastor";
import ChurchUpdates from "@/components/ChurchUpdates";
import LatestSermon from "@/components/LatestSermon";
import CSR from "@/components/CSR";

export default function Home() {
  return (
    <>
      <HeroSlider />
      {/* <HomeCards /> */}
      <Services />
      <About />

      <ResidentPastor />
      <ChurchUpdates />
      <LatestSermon />
      <CSR />
      {/* <InstagramFeed /> */}
      {/* <Events /> */}
      <Ministries />
      <Quote />
      <Contact />
      <Gallery />
    </>
  );
}
