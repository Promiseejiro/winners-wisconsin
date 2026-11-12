"use client";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";

const SocialIcons = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5" />,
      href: "https://facebook.com",
    },
    {
      name: "X",
      icon: <FaXTwitter className="w-5 h-5" />,
      href: "https://twitter.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://play.google.com",
    },
    {
      name: "Youtube",
      icon: <FaYoutube className="w-5 h-5" />,
      href: "https://google.com",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primary transition-colors duration-300"
          aria-label={social.name}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;
