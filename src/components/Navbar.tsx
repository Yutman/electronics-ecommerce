"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const topLinks = [
  { label: "Repair & Care", href: "#" },
  { label: "Tech Journal", href: "#" },
];

const categories: { label: string; href: string; icon?: boolean }[] = [
  { label: "Laptops", href: "#" },
  { label: "Computer Accessories", href: "#" },
  { label: "Smartphones", href: "#" },
  { label: "Phone Accessories", href: "#" },
  { label: "Desktops", href: "#" },
  { label: "Smartwatches", href: "#" },
  { label: "Audio", href: "#" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full bg-light-100 border-b border-light-300">
      {/* Top Bar */}
      <div className="hidden md:block border-b border-light-300">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <nav
            className="flex items-center gap-6"
            aria-label="Secondary navigation"
          >
            <div className="flex items-center gap-1 text-caption text-dark-900"></div>
            {topLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-caption text-dark-900 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-caption text-dark-900">
            <Image
              src="/globe.svg"
              alt=""
              width={20}
              height={14}
              className="rounded-sm"
              aria-hidden="true"
            />
            <span>KE</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-dark-900 hover:bg-light-200 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="A2Z Electronics Home">
            <div className="flex items-center gap-1">
              <div className="bg-dark-900 p-1 rounded">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </div>
              <span className="text-heading-3 font-medium text-dark-900 hidden sm:block">
                A2Z Electronics
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <label htmlFor="search-input" className="sr-only">
                Search products
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                id="search-input"
                type="search"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-light-200 border border-light-300 rounded-full text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Trade-in Button */}
            {/* <Link
              href="#"
              className="hidden lg:flex items-center gap-2 px-4 py-2 border border-light-400 rounded-full text-body-medium text-dark-900 hover:bg-light-200 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M7 12h10M12 7v10" />
              </svg>
              <span>Trade-in</span>
            </Link> */}

            {/* Need Help */}
            <Link
              href="#"
              className="hidden lg:block text-body-medium text-dark-900 hover:underline"
            >
              Need help?
            </Link>

            {/* User Account */}
            <button
              type="button"
              className="p-2 text-dark-900 hover:bg-light-200 rounded-lg"
              aria-label="User account"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button
              type="button"
              className="p-2 text-dark-900 hover:bg-light-200 rounded-lg relative"
              aria-label="Shopping cart"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <label htmlFor="mobile-search-input" className="sr-only">
              Search products
            </label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              id="mobile-search-input"
              type="search"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-light-200 border border-light-300 rounded-full text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav
        className="hidden md:block border-t border-light-300"
        aria-label="Product categories"
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 py-3 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.label}>
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-body text-dark-900 hover:underline whitespace-nowrap"
                >
                  {category.icon && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  )}
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-light-300 bg-light-100"
        >
          <nav className="px-4 py-4" aria-label="Mobile navigation">
            {/* Top Links */}
            <div className="mb-4 pb-4 border-b border-light-300">
              {topLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-body text-dark-900 hover:bg-light-200 rounded px-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Categories */}
            <div className="mb-4 pb-4 border-b border-light-300">
              <h3 className="text-body-medium text-dark-700 mb-2 px-2">
                Categories
              </h3>
              {categories.map((category) => (
                <Link
                  key={category.label}
                  href={category.href}
                  className="flex items-center gap-2 py-2 text-body text-dark-900 hover:bg-light-200 rounded px-2"
                >
                  {category.icon && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  )}
                  {category.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="#"
                className="flex items-center gap-2 py-2 text-body text-dark-900 hover:bg-light-200 rounded px-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M7 12h10M12 7v10" />
                </svg>
                Trade-in
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 py-2 text-body text-dark-900 hover:bg-light-200 rounded px-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Need help?
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
