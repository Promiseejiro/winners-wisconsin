"use client";

import Link from "next/link";
import { useChurchSettings } from "@/providers/church-settings-provider";
import footerContent from "@/content/footer.json";

const contactLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Events", href: "/announcement" },
  { label: "Downloads", href: "/sermons/archive" },
  { label: "Gallery", href: "/" },
  { label: "News", href: "/announcement" },
  { label: "Give", href: "/give" },
];

const churchLinks = footerContent.churchLinks || [];
const ministryLinks = footerContent.ministryLinks || [];

export default function Footer() {
  const { settings } = useChurchSettings();

  return (
    <footer className="relative bg-dark text-white pt-17.5 pb-7.5 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/85 z-0" />
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">CONTACT</h4>
            <div className="space-y-2">
              <p className="text-white text-sm">{settings.address}</p>
              <a className="block text-white text-sm hover:text-primary break-all" href={`mailto:${settings.email}`}>{settings.email}</a>
              {settings.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="block font-semibold text-white text-base hover:text-primary">{phone}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">GET IN TOUCH</h4>
            <ul className="space-y-2">
              {churchLinks.map((link) => <li key={link.label}><Link href={link.href} className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">LINKS</h4>
            <ul className="space-y-2">
              {ministryLinks.map((link) => <li key={link.label}><a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">FOLLOW US</h4>
            <ul className="space-y-2">
              {settings.facebook && <li><a href={settings.facebook} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">Facebook</a></li>}
              {settings.instagram && <li><a href={settings.instagram} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">Instagram</a></li>}
              {settings.youtube && <li><a href={settings.youtube} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-primary">YouTube</a></li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 mt-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[#bbb] text-sm">
          <span className="text-[#bbb]">© {new Date().getFullYear()} {settings.churchName}. All Rights Reserved.</span>
          <div className="flex flex-wrap gap-4 sm:gap-7">
            {contactLinks.map((link) => <Link key={link.label} href={link.href} className="text-white text-sm transition duration-200 hover:text-primary">{link.label}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
