"use client";

import Link from "next/link";
import { Code2, Briefcase, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Buy Property", href: "/buy" },
  { label: "Rent Property", href: "/rent" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const propertyLinks = [
  { label: "Featured Listings", href: "/buy" },
  { label: "Verified Properties", href: "/buy" },
  { label: "Dubai Properties", href: "/buy" },
  { label: "Abu Dhabi Properties", href: "/buy" },
  { label: "Rental Listings", href: "/rent" },
];

const socialLinks = [
  {
    href: "https://github.com/engraya/Propellio-AI",
    label: "GitHub",
    Icon: Code2,
  },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Briefcase },
  { href: "https://twitter.com", label: "X / Twitter", Icon: X },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative z-10 bg-gray-light pt-16 dark:bg-gray-dark md:pt-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          {/* Col 1 — Brand */}
          <div className="w-full px-4 md:w-1/2 lg:w-5/12 xl:w-4/12">
            <div className="mb-12 lg:mb-16">
              <Link href="/" className="mb-6 inline-block">
                <Logo iconSize={28} textClassName="text-base" />
              </Link>
              <p className="mb-8 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Your trusted platform for discovering and securing premium properties across Dubai and Abu Dhabi. Verified listings, transparent pricing.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke-stroke text-body-color transition-colors hover:border-primary hover:text-primary dark:border-stroke-dark dark:text-body-color-dark dark:hover:border-primary dark:hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="w-full px-4 sm:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-dark dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3 — Properties */}
          <div className="w-full px-4 sm:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-dark dark:text-white">
                Properties
              </h3>
              <ul className="space-y-3">
                {propertyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-4/12">
            <div className="mb-12 lg:mb-16">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-dark dark:text-white">
                Stay Updated
              </h3>
              <p className="mb-4 text-sm text-body-color dark:text-body-color-dark">
                Get the latest listings and market insights delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="primary" size="md" className="shrink-0 px-4">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stroke-stroke py-8 dark:border-stroke-dark">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-body-color dark:text-body-color-dark">
              &copy; {new Date().getFullYear()} Shelterium AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/"
                className="text-sm text-body-color transition-colors hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
