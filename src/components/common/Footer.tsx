"use client";

import Link from "next/link";
import { useChurchSettings } from "@/providers/church-settings-provider";
import { useCmsPageData } from "@/hooks/useCmsPageData";

const defaultFooterContent = {
  address: "8159 W Brown Deer Rd, Milwaukee, WI 53223, United States",
  emails: ["winnerschapelwisconsin@gmail.com", "info@winnerschapelwi.org"],
  phones: ["414-368-7753", "708-769-7141", "414-255-4387"],
  churchLinks: [
    { label: "New Members", href: "/new-members" },
    { label: "WSF Resources", href: "/ministries/home-groups" },
    { label: "Teens Church", href: "/ministries/teens" },
    { label: "Children's Church", href: "/ministries/children" },
    { label: "Covenant Hour of Prayer", href: "/covenant-hour" },
  ],
  ministryLinks: [],
  social: {},
  copyright: "© 2026 Winners Chapel International Milwaukee Wisconsin. All Rights Reserved.",
  backgroundImage: "",
  contactHeading: "CONTACT",
  churchLinksHeading: "GET IN TOUCH",
  ministryLinksHeading: "LINKS",
  socialHeading: "FOLLOW US",
  contactLinks: [
    { label: "Contact Us", href: "/contact" },
    { label: "Events", href: "/announcement" },
    { label: "Downloads", href: "/sermons/archive" },
    { label: "Gallery", href: "/" },
    { label: "News", href: "/announcement" },
    { label: "Give", href: "/give" },
  ],
};

export default function Footer() {
  const { settings } = useChurchSettings();
  const footer = useCmsPageData("footer", defaultFooterContent);
  const emails = Array.isArray(footer.emails) ? footer.emails : [];
  const phones = Array.isArray(footer.phones) ? footer.phones : [];
  const churchLinks = Array.isArray(footer.churchLinks) ? footer.churchLinks : [];
  const ministryLinks = Array.isArray(footer.ministryLinks) ? footer.ministryLinks : [];
  const social = footer.social || {};

  return (
    <footer
      className="relative bg-dark text-white pt-17.5 pb-7.5 bg-cover bg-center bg-no-repeat"
      style={footer.backgroundImage ? { backgroundImage: `url("${footer.backgroundImage}")` } : undefined}
    >
      <div className="absolute inset-0 bg-black/85 z-0" />
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">{footer.contactHeading}</h4>
            <div className="space-y-2">
              <p className="text-white text-sm">{footer.address || settings.address}</p>
              {(emails.length ? emails : settings.email ? [settings.email] : []).map((email: string) => (
                <a key={email} className="block text-white text-sm hover:text-primary break-all" href={`mailto:${email}`}>{email}</a>
              ))}
              {(phones.length ? phones : settings.phones).map((phone: string) => (
                <a key={phone} href={`tel:${phone.replace(/[^+\\d]/g, "")}`} className="block font-semibold text-white text-base hover:text-primary">{phone}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">{footer.churchLinksHeading}</h4>
            <ul className="space-y-2">
              {churchLinks.map((link: any, index: number) => <li key={`${link.label}-${index}`}><Link href={link.href || "#"} className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">{footer.ministryLinksHeading}</h4>
            <ul className="space-y-2">
              {ministryLinks.map((link: any, index: number) => <li key={`${link.label}-${index}`}><a href={link.href || "#"} target={link.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">{footer.socialHeading}</h4>
            <ul className="space-y-2">
              {Object.entries(social).filter(([, href]) => typeof href === "string" && href && href !== "#").map(([name, href]) => (
                <li key={name}><a href={String(href)} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">{name.charAt(0).toUpperCase() + name.slice(1)}</a></li>
              ))}
              {!Object.keys(social).length && settings.facebook && <li><a href={settings.facebook} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">Facebook</a></li>}
              {!Object.keys(social).length && settings.instagram && <li><a href={settings.instagram} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">Instagram</a></li>}
              {!Object.keys(social).length && settings.youtube && <li><a href={settings.youtube} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">YouTube</a></li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 mt-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[#bbb] text-sm">
          <span className="text-[#bbb]">{footer.copyright || `© ${new Date().getFullYear()} ${settings.churchName}. All Rights Reserved.`}</span>
          <div className="flex flex-wrap gap-4 sm:gap-7">
            {(footer.contactLinks || []).map((link: any, index: number) => <Link key={`${link.label}-${index}`} href={link.href || "#"} className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
