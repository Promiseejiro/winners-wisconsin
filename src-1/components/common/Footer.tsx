import Image from "next/image";
import Link from "next/link";
import SocialIcons from "../SocialLinks";
import content from "@/content/footer.json";

const Footer = () => {
  const contactLinks = [
    { label: "Contact Us", href: "#" },
    { label: "Events", href: "#" },
    { label: "Downloads", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "News", href: "#" },
    { label: "Give", href: "#" },
    { label: "Egroups", href: "#" },
  ];

  const linkItems = [
    { label: "David Oyedepo", href: "#" },
    { label: "Faith Oyedepo", href: "#" },
    { label: "Covenant University", href: "#" },
    { label: "Landmark University", href: "#" },
    { label: "Online Radio", href: "#" },
  ];

  return (
    <footer className="relative bg-dark text-white pt-17.5 pb-7.5  bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/85 z-0 " />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Contact Column */}
          {/* <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2.5 flex-0 ">
              <Image
                src="https://res.cloudinary.com/dxqg5hify/image/upload/v1783712016/file_00000000e9a871f48a2e8a1984b8eeda_qorcdm.png"
                alt="Winners Chapel Logo"
                width={45}
                height={45}
                className={` h-26 w-6   duration-300 brightness-0 invert`}
                priority
              />

              <div className="lg:w-70 -ml-30 lg:-ml-8">
                {" "}
                <span
                  className={`text-sm  text-white text center tracking-[0.5px] font-bold transition-colors duration-300`}
                >
                  WINNERS' CHAPEL INTL. Wisconsin
                </span>
                <div className="mt-4">
                  {" "}
                  <SocialIcons />
                </div>
              </div>
            </Link>
          </div> */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              CONTACT
            </h4>
            <div className="space-y-1">
              <p className="text-white text-sm  ">
                {content.address}
              </p>
              <p className="text-white text-sm  ">
                {content.emails[0]}
              </p>
              Careers
              <p className="font-semibold text-white text-lg mt-1.5">
                {content.phones[0]}
              </p>
            </div>
          </div>

          {/* Get In Touch Column */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              GET IN TOUCH
            </h4>
            <ul className="space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white text-sm transition duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              LINKS
            </h4>
            <ul className="space-y-2">
              {linkItems.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white text-sm transition duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[#bbb] text-sm">
          <span className="text-[#bbb]">{content.copyright}</span>
          <div className="flex flex-wrap gap-4 sm:gap-7">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-sm transition duration-200 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
