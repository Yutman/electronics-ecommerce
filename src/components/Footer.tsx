"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  about: {
    title: "About",
    links: [{ label: "About us", href: "#" }],
  },
  help: {
    title: "Help",
    links: [
      { label: "Shipping", href: "#" },
      { label: "Returns and refunds", href: "#" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "Warranty", href: "#" },
      { label: "Protection plan", href: "#" },
      { label: "Trade-in", href: "#" },
      // { label: "Sellers: Register to sell", href: "#" },
      // { label: "Seller portal", href: "#" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Tech Journal", href: "#" },
      { label: "Compare devices", href: "#" },
      // { label: "Gift ideas", href: "#" },
      // { label: "Black Friday", href: "#" },
    ],
  },
  legal: {
    title: "Law and order",
    links: [
      { label: "Terms of service", href: "#" },
      // { label: "Trade-in Terms and Conditions", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
};

const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <Image
        src="/instagram.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <Image
        src="/facebook.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
    ),
  },
  {
    name: "X",
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
];

const paymentMethods = ["Visa", "Mastercard", "PayPal"];

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
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
          </div>
        </div>
      </div>

      <div className="border-t border-light-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-caption text-dark-700 text-center">
            &copy; {new Date().getFullYear()} A2Z Electronics
          </p>
        </div>
      </div>
    </footer>
  );
}
