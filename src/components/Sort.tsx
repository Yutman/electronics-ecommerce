"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  parseQueryParams,
  stringifyFilters,
  updateFilter,
  type ProductFilters,
  type SortOption,
} from "@/lib/utils/query";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function Sort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentFilters = parseQueryParams(
    Object.fromEntries(searchParams.entries())
  );
  const currentSort = currentFilters.sort || "featured";

  const currentLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "Featured";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const updateUrl = useCallback(
    (newFilters: ProductFilters) => {
      const queryStr = stringifyFilters(newFilters);
      const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname]
  );

  const handleSortChange = (sortValue: SortOption) => {
    const newFilters = updateFilter(
      currentFilters,
      "sort",
      sortValue === "featured" ? undefined : sortValue
    );
    updateUrl(newFilters);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-light-400 rounded-full text-body-medium text-dark-900 hover:bg-light-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sort by: ${currentLabel}`}
      >
        <span className="hidden sm:inline">Sort:</span>
        <span>{currentLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-light-100 border border-light-300 rounded-lg shadow-lg z-50 overflow-hidden"
          role="listbox"
          aria-label="Sort options"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSortChange(option.value)}
              className={`w-full px-4 py-3 text-left text-body hover:bg-light-200 transition-colors focus:outline-none focus-visible:bg-light-200 ${
                currentSort === option.value
                  ? "bg-light-200 text-dark-900 font-medium"
                  : "text-dark-700"
              }`}
              role="option"
              aria-selected={currentSort === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
