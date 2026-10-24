"use client";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AnnouncementPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [liveAnnouncements, setLiveAnnouncements] = useState<any[]>([]);
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api/v1"}/announcements`).then(r => r.json()).then(b => setLiveAnnouncements(b.data || [])).catch(() => {}); }, []);

  const announcementImages = [
    {
      id: 1,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-7.02.25-AM-scaled.jpeg",
      alt: "Announcement 1",
    },
    {
      id: 2,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-6.54.03-AM-scaled.jpeg",
      alt: "Announcement 2",
    },
    {
      id: 3,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/02/chop-new-scaled.jpeg",
      alt: "Announcement 3",
    },
    {
      id: 4,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-19-at-6.53.47-AM-scaled.jpeg",
      alt: "Announcement 4",
    },
    {
      id: 5,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-12-at-8.00.31-AM.jpeg",
      alt: "Announcement 5",
    },
    {
      id: 6,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-05-at-8.01.45-AM.jpeg",
      alt: "Announcement 6",
    },
    {
      id: 7,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-12-at-8.53.30-AM-1.jpeg",
      alt: "Announcement 7",
    },
    {
      id: 8,
      src: "https://www.winnerschapelmanchester.org.uk/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-28-at-7.47.02-AM-scaled.jpeg",
      alt: "Announcement 8",
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "NEXT SUNDAY AT WINNERS CHAPEL INTERNATIONAL MANCHESTER",
      content: (
        <div>
          <strong>
            Good News! Next Sunday, July 26th 2026, shall be our New Dawn
            Banquet Service (Isa. 43:18-19 …Behold I will do a new thing…).
          </strong>{" "}
          It shall be a service to be much remembered. We are all required to
          come along with our new converts, invitees, and other loved ones to
          partake of the wonders that awaits us in this service. Service times
          are as usual — <strong>8 am, 10 am and 12 pm.</strong>
        </div>
      ),
    },
    {
      id: 2,
      title: "GLORY MIDST OF THE YEAR",
      content: (
        <div>
          <strong>Praise God!</strong> In this season of Glory Midst of the Year
          blessings/Revival, All members are encouraged to actively participate
          in the followings; Join the Kingdom Advancement Prayer Squad. Monday –
          Friday (Except Wednesday), online. Time 6pm. Fellowship with the
          brethren every Saturdays at the nearest Winners Satellite fellowship
          to you. Time. 5pm. Every Engaging Winners should expect enviable and
          undeniable reward in this Midst of the Year Prophetic season in
          Jesus's name. Amen!
        </div>
      ),
    },
    {
      id: 3,
      title: "COVENANT HOUR OF PRAYER",
      content: (
        <div>
          <strong>Covenant Hour of Prayer</strong> holds{" "}
          <strong>Monday–Friday, 6:00–7:00am</strong>, and{" "}
          <strong>Saturday from 8:00am</strong>,{" "}
          <strong>on-site and online via MS Teams</strong>. Be part of the
          platform. <strong>Special Birthday Prayers &amp; Impartation</strong>{" "}
          take place{" "}
          <strong>
            in church on your exact birthday, immediately after the service
          </strong>
          . Celebrants will be called out, anointed, and prayed for at the
          altar.{" "}
          <strong>Those with Sunday birthdays should attend Saturday</strong>{" "}
          for the special prayers.
          <br />
          <br />
          <a
            href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_N2E0OGZjNmUtZGE3My00YjFkLTg3ZmUtM2E4YWY2NzFiMjg2%40thread.v2/0?context=%7b%22Tid%22%3a%22e82b49f6-c0ae-4b2c-8f1a-69a58a5b055e%22%2c%22Oid%22%3a%22ad095513-985f-4543-a425-197f46f44bcf%22%7d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-bold"
          >
            CLICK TO JOIN ON MS TEAMS
          </a>
        </div>
      ),
    },
    {
      id: 4,
      title: "MIDWEEK COMMUNION SERVICE",
      content: (
        <div>
          Good News! Our Midweek Communion Service holds this Wednesday. We
          shall be observing a fast and break with the communion.{" "}
          <strong>Time: 6pm</strong>
        </div>
      ),
    },
    {
      id: 5,
      title: "AYAC 2026",
      content: (
        <div>
          <strong>Good News</strong>!{" "}
          <strong>AYAC 2026 The Annual Youth Alive Convention</strong> for the
          year 2026 comes up from{" "}
          <strong>August 18th to 22nd August 2026</strong>. All youths are to
          prayerfully prepare and plan to attend this life transforming event.
          The theme for this convention is <strong>NEXT LEVELS</strong>. The
          venue is the Faith Tabernacle, Canaanland and across our Church
          network globally. It shall indeed be a mountain of undeniable
          encounters for all youths.
        </div>
      ),
    },
    {
      id: 6,
      title: "LONDON HOPE CRUSADE",
      content: (
        <div>
          Winners Chapel Intl in Collaboration with other churches Present
          London Hope Crusade, <strong>Theme:</strong> Hope for the Nation. – Rm
          15:13. It shall be a time of united prayer for the nation, bring Hope
          and Transforming lives, intense Worship &amp; Praise. Venue: Trafalgar
          Square, London. Date: Saturday, 19th 2026. Time: 11:30am – 2:00pm.
          Members that want to volunteer, should please scan the QR code to
          register.
        </div>
      ),
    },
    {
      id: 7,
      title: "WINNERS SATELLITE FELLOWSHIP (WSF)",
      content: (
        <div>
          <strong>
            Winners Satellite Fellowship (WSF) will hold this Saturday.
          </strong>{" "}
          Please attend with your new converts and other invitees at a centre
          nearest to your homes. <strong>Time is 5 to 6pm.</strong>
        </div>
      ),
    },
    {
      id: 8,
      title: "BELIEVERS FOUNDATION CLASS",
      content: (
        <div>
          <strong>Believers Foundation Class (BFC)</strong> holds every Sunday
          in church immediately after the 3rd service at the welcome lounge.
          Adequate transportation arrangement is in place for those who will
          require it and those with young children, they will be looked after by
          our officials.
        </div>
      ),
    },
    {
      id: 9,
      title: "INDIVIDUAL AND PARTNERSHIP OUTREACHES",
      content: (
        <div>
          <strong>INDIVIDUAL AND PARTNERSHIP OUTREACHES</strong> – this holds{" "}
          <strong>
            EVERY TUESDAY and THURSDAY here in WCI Manchester. Time is 11am to
            1pm.
          </strong>{" "}
          All who wish to be a part, only need to show up in Church.
        </div>
      ),
    },
    {
      id: 10,
      title: "BOOKS OF THE MONTH & MATERIALS FOR SPIRITUAL GROWTH",
      content: (
        <div>
          The <strong>recommended Books</strong> of the Month{" "}
          <strong>authored</strong> by <strong>Bishop David O. Oyedepo</strong>{" "}
          are:{" "}
          <strong>
            Understanding Financial Prosperity, Breaking Financial Hardship,
            Covenant Wealth, and Winning The War Against Poverty
          </strong>
          . You are encouraged to visit the Dominion Bookshop on the ground
          floor to purchase these books and materials by Bishop David O. Oyedepo
          and other ministers. The books are also available online at{" "}
          <a
            href="http://www.dphstore.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.dphstore.co.uk
          </a>
          , Amazon Store, and Apple Online Store.
        </div>
      ),
    },
    {
      id: 11,
      title: "KINGDOM CARE COVENANT (KCC)",
      content: (
        <div>
          KCC provides food to those in need on the 2nd and 4th Wednesdays each
          month. You can help by donating non-perishable food or giving through
          the Tithe.ly app.
        </div>
      ),
    },
    {
      id: 12,
      title: "FREE TRANSPORT",
      content: (
        <div>
          Contact the transport ministry to pre-book a ride.{" "}
          <a
            href="https://www.winnerschapelmanchester.org.uk/transport/"
            className="text-primary hover:underline"
          >
            Click here for details of the multiple routes in operation and
            contact details.
          </a>
        </div>
      ),
    },
    {
      id: 13,
      title: "RELATIONSHIP AND MARRIAGE GUIDANCE",
      content: (
        <div>
          All singles, singles in courtship, intending couples and those
          preparing for pre-marital counselling to be joined in holy matrimony
          are to register their details for Pastoral guidance and plan to go
          through the Courtship Foundation Classes (CFC) and Marriage
          Counselling modules to prepare them for marriage. See the Marriage
          Committee (MC) officials.
        </div>
      ),
    },
    {
      id: 14,
      title: "PASTORAL RESCUE LINE",
      content: (
        <div>
          Praise the Lord! Members are encouraged to call the{" "}
          <strong>Pastoral Rescue Lines</strong> for matters that require
          prayers and urgent attention.
          <br />
          <br />
          07955286660 | 07955286662 | 07964917804
          <br />
          07961921259 | 07828126239 | 07893951011
          <br />
          07530473193
        </div>
      ),
    },
    {
      id: 15,
      title: "COUNSELLING & PRAYERS",
      content: (
        <div>
          Holds every Sunday after each Service and, Tuesdays, Thursdays &amp;
          Friday. This is by appointment only! Interested members can book via{" "}
          <a
            href="https://goto.winnerschapelmanchester.org.uk/pastoral-appointment-bookings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://goto.winnerschapelmanchester.org.uk/pastoral-appointment-bookings
          </a>
        </div>
      ),
    },
    {
      id: 16,
      title: "SHARE YOUR TESTIMONY",
      content: (
        <div>
          Good News! No doubt God has shown himself mighty in our midst, you can
          send in your testimonies by clicking{" "}
          <a
            href="https://www.winnerschapelmanchester.org.uk/testimonies/"
            className="text-primary hover:underline font-bold"
          >
            here
          </a>{" "}
          or send an email to{" "}
          <strong>Manchester.testimony@winners-chapel.org.uk.</strong> Short
          videos and pictures can be attached where applicable. Also, we are to
          keep sharing your testimonies from the Altar in the live Services and
          WSF Meetings!
        </div>
      ),
    },
    {
      id: 17,
      title: "GIVING",
      content: (
        <div>
          We're to ensure that we redeem the payment of our Shiloh sacrifices
          and vows, offerings, tithes, transportation and welfare seeds and
          commitments using the various giving channels.{" "}
          <a
            href="https://www.winnerschapelmanchester.org.uk/give/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-bold"
          >
            CLICK TO GIVE.
          </a>
        </div>
      ),
    },
    {
      id: 18,
      title: "STAY CONNECTED",
      content: (
        <div>
          Connect with us on our latest <strong>MixLR platform</strong> and
          other social media handles – Facebook, Instagram, TikTok, others for
          our services, announcements, Prophetic blessings, sermon excerpts,
          testimonies, etc.
        </div>
      ),
    },
    {
      id: 19,
      title: "JOIN OUR MAILING LIST",
      content: (
        <div>
          Stay connected with Winners Chapel Manchester by joining our mailing
          list. Receive the latest updates on church events, services, special
          programs, and inspiring messages. Whether you're new to the church or
          a long-time member, our mailing list ensures you're always in the
          loop. Don't miss out—sign up today and be part of our vibrant
          community!{" "}
          <a
            href="https://bit.ly/WCIM_CMDU"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-bold"
          >
            CLICK TO SUBSCRIBE TO OUR MAILING LIST
          </a>
        </div>
      ),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <>
      {liveAnnouncements.length > 0 && (
      <section className="py-[70px] bg-white">
        <div className="container">
          <div className="mb-10 text-center"><p className="text-[#ef2b34] font-semibold text-sm uppercase tracking-[1px]">Live Updates</p><h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111]">Latest Church Announcements</h2></div>
          <div className="grid gap-5 md:grid-cols-2">
            {liveAnnouncements.map((item) => (
              <article key={item._id} className="rounded-xl border bg-[#fafafa] p-6">
                <h3 className="font-cormorant text-2xl font-bold text-[#111]">{item.title}</h3>
                <p className="mt-3 whitespace-pre-line text-[#555] leading-relaxed">{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}
      {/* ===== PAGE HEADER ===== */}
      <section className="relative w-full py-20 text-white">
        <div className="container text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold"
          >
            Announcement
          </motion.h1>
        </div>
      </section>

      {/* ===== IMAGE SLIDER ===== */}
      <section className="py-[70px]">
        <div className="w-full px-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-block bg-primary text-white px-4 py-1 text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
                Latest Updates
              </div>
              <h2 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#111]">
                Announcements
              </h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-[1000px] mx-auto">
              <Swiper
                modules={[Autoplay, EffectCreative, Pagination]}
                effect="creative"
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                grabCursor={true}
                loop={true}
                pagination={{
                  el: ".announcement-pagination",
                  clickable: true,
                  bulletClass: "announcement-bullet",
                  bulletActiveClass: "announcement-bullet-active",
                }}
                className="w-full"
                slidesPerView={1}
                spaceBetween={0}
              >
                {announcementImages.map((image) => (
                  <SwiperSlide
                    key={image.id}
                    className=" bg-white  flex items-center"
                  >
                    <div className=" relative  bg-white w-full h-62.5  sm:h-87 md:h-125 lg:h-150 overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full  rounded-2xl transition-transform duration-500"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="announcement-pagination flex justify-center gap-2 mt-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ANNOUNCEMENTS ACCORDION ===== */}
      <section className="py-[70px] bg-[#f8f8f8]">
        <div className="w-full px-0">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              {announcements.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-semibold text-[#111] text-base sm:text-lg">
                      {item.title}
                    </span>
                    <span className="text-primary text-2xl font-bold flex-shrink-0 ml-4">
                      {openAccordion === index ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openAccordion === index ? "max-h-[2000px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-4 border-t border-gray-100 text-[#555] text-base leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .announcement-bullet {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .announcement-bullet:hover {
          background: rgba(0, 0, 0, 0.4);
        }
        .announcement-bullet-active {
          width: 40px;
          height: 12px;
          border-radius: 6px;
          background: #ef2b34;
        }
      `}</style>
    </>
  );
}
