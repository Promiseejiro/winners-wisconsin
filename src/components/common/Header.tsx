"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Ministries",
      children: [
        {
          label: "Children's Ministry",
          href: "/ministries/children",
        },
        {
          label: "Teens Ministry",
          href: "/ministries/teens",
        },
        {
          label: "Youth Alive",
          href: "/ministries/youth-alive",
        },
        {
          label: "Home Groups",
          href: "/ministries/home-groups",
        },
        {
          label: "Bible Institute",
          href: "/ministries/wofbi",
        },
      ],
    },
    {
      label: "Get Involved",
      href: "/get-involved",
    },
    {
      label: "Media Resources",
      children: [
        {
          label: "Announcement",
          href: "/announcement",
        },
        {
          label: "Watch Live",
          href: "/live",
        },
        {
          label: "Archives",
          href: "/sermons/archive",
        },
      ],
    },
    {
      label: "Give",
      href: "/give",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest("header") &&
        !target.closest(".sidebar-overlay")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const shouldBeWhite =
    pathname !== "/announcement" && (isMobile || isScrolled);
  return (
    <>
      <header
        className={`fixed max-h-screen overflow-y-scroll md:overflow-y-visible top-0 left-0 w-full z-[999] transition-all duration-300 py-4 ${
          shouldBeWhite ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-5 max-w-[1400px] mx-auto h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Winner's Chapel"
              width={32}
              height={32}
              className="h-26 w-26"
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 uppercase text-sm font-semibold transition text-white hover:text-red-600`}
                  >
                    {link.label}

                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className="
                    absolute
                    left-0
                    top-full
                    mt-2
                    w-64
                    bg-[#2a2a2a]
                    rounded
                    shadow-xl
                    py-2
                    opacity-0
                    invisible
                    translate-y-2
                    transition-all
                    duration-300
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0
                    z-50
                  "
                  >
                    {link.children.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-sm block px-8 py-4 text-white hover:bg-red-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className={`uppercase text-sm font-semibold transition text-white hover:text-red-600`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-5 flex-shrink-0">
            {/* Toggle Button - Opens Sidebar */}
            <button
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.3)] text-white font-semibold uppercase tracking-wider rounded-full hover:bg-[#c81d26] transition-colors text-sm "
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Mobile Menu Toggle - Three bars */}
            <button
              className="flex lg:hidden flex-col gap-1.5 p-1 z-[1001] relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-7 h-[2.5px] rounded-full transition-all duration-300 bg-white ${
                  isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-7 h-[2.5px] rounded-full transition-all duration-300 bg-white ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-7 h-[2.5px] rounded-full transition-all duration-300 bg-white ${
                  isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] max-w-[85vw] bg-[#1a1a1a] z-[1001] transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/assets/images/logo.png"
                alt="Winner's Chapel"
                width={40}
                height={40}
                className="h-10 w-10"
                unoptimized
                priority
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation Links */}
          <nav className="block lg:hidden flex-1 px-6 py-4">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="border-b border-white/5 last:border-0"
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className="block py-4 text-white/80 hover:text-white font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <div>
                    <p className="py-4 text-white font-semibold">
                      {link.label}
                    </p>
                    <div className="pl-4 space-y-1 pb-2">
                      {link.children?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-2.5 text-white/60 hover:text-white text-sm transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer - Contact Info */}
          <div className="p-6 border-t border-white/10">
            {/* "You can contact/visit us using the information below..." */}
            <p className="text-white/50 text-xs mb-4">
              You can contact/visit us using the information below...
            </p>

            {/* CONTACT INFO Heading */}
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              CONTACT INFO
            </h4>

            <div className="space-y-4 text-white/60 text-sm">
              {/* Address - 81-83 Broughton Lane, Salford M8 9UE */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <span className="block">81-83 Broughton Lane,</span>
                  <span className="block">Salford M8 9UE</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all">
                  admin.manchester@winners-chapel.org.uk
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Sun to Fri: 09.00 to 17.00</span>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>Contact Us: 01618326020</span>
              </div>
            </div>

            {/* Attend Service Button in Sidebar */}
            <Button
              variant="primary"
              size="sm"
              className="w-full mt-6 rounded-full"
              onClick={() => {
                router.push("/plan-your-visit");
                setIsMenuOpen(false);
              }}
            >
              Attend Service
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
