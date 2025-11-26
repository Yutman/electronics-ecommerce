"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  about: {
    title: "About",
    links: [
      { label: "About us", href: "#" },
      { label: "Press", href: "#" },
      { label: "Our impact", href: "#" },
      { label: "Our NYC store", href: "#" },
      { label: "Accessibility statement", href: "#" },
      { label: "We're hiring!", href: "#" },
      { label: "Trustpilot", href: "#" },
    ],
  },
  help: {
    title: "Help",
    links: [
      { label: "Contact us", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Returns and refunds", href: "#" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "1-year warranty", href: "#" },
      { label: "Protection plan", href: "#" },
      { label: "Trade-in", href: "#" },
      { label: "Student and educator program", href: "#" },
      { label: "Military program", href: "#" },
      { label: "Sellers: Register to sell", href: "#" },
      { label: "Seller portal", href: "#" },
      { label: "Back Market for Business", href: "#" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Tech Journal", href: "#" },
      { label: "Compare devices", href: "#" },
      { label: "Gift ideas", href: "#" },
      { label: "Black Friday", href: "#" },
    ],
  },
  legal: {
    title: "Law and order",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Trade-in Terms and Conditions", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Don't sell or share my personal information", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Report illicit content", href: "#" },
    ],
  },
};

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <Image src="/facebook.svg" alt="" width={24} height={24} aria-hidden="true" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <Image src="/instagram.svg" alt="" width={24} height={24} aria-hidden="true" />
    ),
  },
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "Discover",
  "American Express",
  "Affirm",
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Klarna",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-light-100 border-t border-light-300">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
          <div className="max-w-md">
            <h2 className="text-heading-3 text-dark-900 mb-2">
              Stay in the loop with hot drops
            </h2>
            <p className="text-body text-dark-700">
              Be the first to know about new arrivals, exclusive deals, and tech
              news that matters.
            </p>
          </div>
          <div className="flex-1 max-w-lg">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-light-400 rounded-lg text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dark-500"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-dark-900 text-light-100 text-body-medium rounded-lg hover:bg-dark-700 transition-colors"
              >
                Sign up
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 mt-3 text-caption text-dark-700 hover:text-dark-900"
              aria-expanded={isExpanded}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Learn more
            </button>
            {isExpanded && (
              <p className="mt-2 text-footnote text-dark-500">
                By signing up, you agree to receive marketing emails from A2Z
                Electronics. You can unsubscribe at any time.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="border-t border-light-300">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* About Column */}
            <div>
              <h3 className="text-body-medium text-dark-900 mb-4">
                {footerLinks.about.title}
              </h3>
              <ul className="space-y-2">
                {footerLinks.about.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-dark-700 hover:text-dark-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-light-300 text-dark-700 hover:bg-dark-900 hover:text-light-100 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-body-medium text-dark-900 mb-4">
                {footerLinks.help.title}
              </h3>
              <ul className="space-y-2">
                {footerLinks.help.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-dark-700 hover:text-dark-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-body-medium text-dark-900 mb-4">
                {footerLinks.services.title}
              </h3>
              <ul className="space-y-2">
                {footerLinks.services.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-dark-700 hover:text-dark-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Payment Methods */}
              <div className="mt-6">
                <p className="text-caption text-dark-700 mb-2">
                  Payments 100% secured
                </p>
                <div className="flex flex-wrap gap-1">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="w-10 h-6 bg-light-200 border border-light-300 rounded flex items-center justify-center"
                      title={method}
                    >
                      <span className="text-[8px] text-dark-500 font-medium">
                        {method.slice(0, 4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-body-medium text-dark-900 mb-4">
                {footerLinks.resources.title}
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-dark-700 hover:text-dark-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-body-medium text-dark-900 mb-4">
                {footerLinks.legal.title}
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-dark-700 hover:text-dark-900 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-start gap-4">
                {/* B Corporation Badge */}
                <div className="w-12 h-16 bg-light-200 border border-light-300 rounded flex flex-col items-center justify-center p-1">
                  <span className="text-[10px] text-dark-700 font-medium text-center">
                    Certified
                  </span>
                  <span className="text-lg font-bold text-dark-900">B</span>
                  <span className="text-[8px] text-dark-500">Corporation</span>
                </div>
                {/* BBB Badge */}
                <div className="w-12 h-16 bg-light-200 border border-light-300 rounded flex flex-col items-center justify-center p-1">
                  <span className="text-lg font-bold text-dark-900">BBB</span>
                  <span className="text-[8px] text-dark-500 text-center">
                    Accredited
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-caption text-dark-700">
              &copy; {new Date().getFullYear()} A2Z Electronics
            </p>
            <div className="flex items-center gap-3">
              {/* Google Play Badge */}
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-light-100 rounded-lg hover:bg-dark-700 transition-colors"
                aria-label="Get it on Google Play"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[8px] leading-none">GET IT ON</span>
                  <span className="text-caption font-medium leading-tight">
                    Google Play
                  </span>
                </div>
              </Link>
              {/* App Store Badge */}
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-dark-900 text-light-100 rounded-lg hover:bg-dark-700 transition-colors"
                aria-label="Download on the App Store"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[8px] leading-none">Download on the</span>
                  <span className="text-caption font-medium leading-tight">
                    App Store
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
