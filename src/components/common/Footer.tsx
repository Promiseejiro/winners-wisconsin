"use client";

import Link from "next/link";
import { useChurchSettings } from "@/providers/church-settings-provider";
import { useCmsPageData } from "@/hooks/useCmsPageData";
import footerJson from "@/content/footer.json";

type FooterLink = {
  label: string;
  href: string;
};

type FooterContent = {
  address: string;
  emails: string[];
  phones: string[];
  churchLinks: FooterLink[];
  ministryLinks: FooterLink[];
  social: Record<string, string>;
  copyright: string;
  backgroundImage: string;
  contactHeading: string;
  churchLinksHeading: string;
  ministryLinksHeading: string;
  socialHeading: string;
  contactLinks: FooterLink[];
};

const defaultFooterContent: FooterContent = {
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
  copyright:
    "© 2026 Winners Chapel International Milwaukee Wisconsin. All Rights Reserved.",
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

const localFooterContent: FooterContent = {
  ...defaultFooterContent,
  ...(footerJson as Partial<FooterContent>),
};

export default function Footer() {
  const { settings } = useChurchSettings();

  // Load local footer.json first, then override with published CMS content.
  const footer = useCmsPageData("footer", localFooterContent) as FooterContent;

  const emails = Array.isArray(footer.emails) ? footer.emails : [];

  const phones = Array.isArray(footer.phones) ? footer.phones : [];

  const churchLinks = Array.isArray(footer.churchLinks)
    ? footer.churchLinks
    : [];

  const ministryLinks = Array.isArray(footer.ministryLinks)
    ? footer.ministryLinks
    : [];

  const contactLinks = Array.isArray(footer.contactLinks)
    ? footer.contactLinks
    : [];

  const social =
    footer.social && typeof footer.social === "object" ? footer.social : {};

  const displayEmails = emails.length
    ? emails
    : settings.email
      ? [settings.email]
      : [];

  const displayPhones = phones.length
    ? phones
    : Array.isArray(settings.phones)
      ? settings.phones
      : [];

  const displayAddress = footer.address || settings.address || "";

  const socialLinks = Object.entries(social).filter(
    ([, href]) =>
      typeof href === "string" && href.trim() !== "" && href !== "#",
  );

  // Use church settings when no social links are configured in the CMS.
  const fallbackSocialLinks = [
    { name: "facebook", href: settings.facebook },
    { name: "instagram", href: settings.instagram },
    { name: "youtube", href: settings.youtube },
  ].filter(
    (item): item is { name: string; href: string } =>
      typeof item.href === "string" && item.href.trim() !== "",
  );

  const hasCmsSocialLinks = socialLinks.length > 0;

  const copyright =
    footer.copyright ||
    `© ${new Date().getFullYear()} ${settings.churchName || "Winners Chapel International Milwaukee Wisconsin"}. All Rights Reserved.`;

  return (
    <footer
      className="relative bg-dark text-white pt-17.5 pb-7.5 bg-cover bg-center bg-no-repeat"
      style={
        footer.backgroundImage
          ? {
              backgroundImage: `url("${footer.backgroundImage}")`,
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-black/85 z-0" />

      <div className="relative z-10 container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Contact Information */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              {footer.contactHeading || defaultFooterContent.contactHeading}
            </h4>

            <div className="space-y-2">
              {displayAddress && (
                <p className="text-white text-sm">{displayAddress}</p>
              )}

              {displayEmails.map((email) => (
                <a
                  key={email}
                  className="block text-white text-sm hover:text-primary break-all"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              ))}

              {displayPhones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="block font-semibold text-white text-base hover:text-primary"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Church Links */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              {footer.churchLinksHeading ||
                defaultFooterContent.churchLinksHeading}
            </h4>

            <ul className="space-y-2">
              {churchLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <Link
                    href={link.href || "#"}
                    className="text-white text-sm transition duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry Links */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              {footer.ministryLinksHeading ||
                defaultFooterContent.ministryLinksHeading}
            </h4>

            <ul className="space-y-2">
              {ministryLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  {link.href?.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white text-sm transition duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href || "#"}
                      className="text-white text-sm transition duration-200 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-inter font-semibold text-lg tracking-wider uppercase mb-5 text-white">
              {footer.socialHeading || defaultFooterContent.socialHeading}
            </h4>

            <ul className="space-y-2">
              {hasCmsSocialLinks
                ? socialLinks.map(([name, href]) => (
                    <li key={name}>
                      <a
                        href={String(href)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white text-sm hover:text-primary"
                      >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </a>
                    </li>
                  ))
                : fallbackSocialLinks.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white text-sm hover:text-primary"
                      >
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </a>
                    </li>
                  ))}
            </ul>
          </div>
        </div>

        {/* Copyright and Bottom Links */}
        <div className="border-t border-white/10 pt-6 mt-2.5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[#bbb] text-sm">
          <span className="text-[#bbb]">{copyright}</span>

          <div className="flex flex-wrap gap-4 sm:gap-7">
            {contactLinks.map((link, index) => (
              <Link
                key={`${link.label}-${index}`}
                href={link.href || "#"}
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
}
