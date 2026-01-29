"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  parseQueryParams,
  stringifyFilters,
  toggleArrayFilter,
  updatePriceRange,
  clearAllFilters,
  getActiveFilterCount,
  type ProductFilters,
} from "@/lib/utils/query";
import {
  BRANDS,
  CONDITIONS,
  CPUS,
  RAMS,
  STORAGES,
  SCREEN_SIZES,
  SIM_SLOTS,
  CONNECTIVITIES,
  BAND_SIZES,
  BAND_TYPES,
  FACE_SIZES,
  SERIES,
} from "@/lib/data/products";

interface FilterGroupProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterGroup({ title, isOpen, onToggle, children }: FilterGroupProps) {
  return (
    <div className="border-b border-light-300 py-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-body-medium text-dark-900 hover:text-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2 rounded"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          width="20"
          height="20"
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
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function CheckboxFilter({ label, checked, onChange }: CheckboxFilterProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-light-400 text-dark-900 focus:ring-dark-900 focus:ring-offset-0 cursor-pointer"
      />
      <span className="text-body text-dark-700 group-hover:text-dark-900">
        {label}
      </span>
    </label>
  );
}

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin?: number;
  currentMax?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

function PriceRangeFilter({
  minPrice,
  maxPrice,
  currentMin,
  currentMax,
  onChange,
}: PriceRangeFilterProps) {
  const minValue = currentMin?.toString() ?? "";
  const maxValue = currentMax?.toString() ?? "";
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);

  if (localMin !== minValue && minValue !== "" && localMin === "") {
    setLocalMin(minValue);
  }
  if (localMax !== maxValue && maxValue !== "" && localMax === "") {
    setLocalMax(maxValue);
  }

  const handleApply = () => {
    const min = localMin ? parseInt(localMin, 10) : undefined;
    const max = localMax ? parseInt(localMax, 10) : undefined;
    onChange(min, max);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label htmlFor="price-min" className="sr-only">
            Minimum price
          </label>
          <input
            id="price-min"
            type="number"
            placeholder={`$${minPrice}`}
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className="w-full px-3 py-2 border border-light-400 rounded-lg text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent"
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <span className="text-dark-500">-</span>
        <div className="flex-1">
          <label htmlFor="price-max" className="sr-only">
            Maximum price
          </label>
          <input
            id="price-max"
            type="number"
            placeholder={`$${maxPrice}`}
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className="w-full px-3 py-2 border border-light-400 rounded-lg text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent"
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleApply}
        className="w-full py-2 px-4 bg-dark-900 text-light-100 rounded-lg text-body-medium hover:bg-dark-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2"
      >
        Apply
      </button>
    </div>
  );
}

interface FiltersProps {
  category?: string;
}

const CATEGORY_FILTERS: Record<string, string[]> = {
  laptops: ["price", "brands", "conditions", "cpus", "rams", "screenSizes", "storages"],
  smartphones: ["price", "brands", "conditions", "rams", "simSlots", "storages"],
  smartwatches: ["price", "brands", "storages", "connectivities", "bandSizes", "bandTypes", "faceSizes"],
  desktops: ["price", "brands", "series", "screenSizes", "cpus", "rams"],
  "computer-accessories": ["price", "brands"],
  powerbanks: ["price", "brands"],
  audio: ["price", "brands", "connectivities"],
};

const DEFAULT_FILTERS = ["price", "brands", "conditions"];

export default function Filters({ category }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    price: true,
    brands: true,
    conditions: true,
  });

  const currentFilters = parseQueryParams(
    Object.fromEntries(searchParams.entries())
  );

  const activeFilterCount = getActiveFilterCount(currentFilters);

  const updateUrl = useCallback(
    (newFilters: ProductFilters) => {
      const queryStr = stringifyFilters(newFilters);
      const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname]
  );

  const handleToggleFilter = useCallback(
    (key: keyof ProductFilters, value: string) => {
      const newFilters = toggleArrayFilter(currentFilters, key, value);
      updateUrl(newFilters);
    },
    [currentFilters, updateUrl]
  );

  const handlePriceChange = useCallback(
    (min: number | undefined, max: number | undefined) => {
      const newFilters = updatePriceRange(currentFilters, min, max);
      updateUrl(newFilters);
    },
    [currentFilters, updateUrl]
  );

  const handleClearAll = useCallback(() => {
    const newFilters = clearAllFilters(currentFilters);
    updateUrl(newFilters);
    setIsMobileOpen(false);
  }, [currentFilters, updateUrl]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const activeCategory = category || currentFilters.category;
  const availableFilters = activeCategory
    ? CATEGORY_FILTERS[activeCategory] || DEFAULT_FILTERS
    : DEFAULT_FILTERS;

  const filterContent = (
    <div className="space-y-0">
      <div className="flex items-center justify-between pb-4 border-b border-light-300">
        <h2 className="text-heading-3 text-dark-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-caption text-dark-700 hover:text-dark-900 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 rounded"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {availableFilters.includes("price") && (
        <FilterGroup
          title="Price Range"
          isOpen={openGroups.price ?? false}
          onToggle={() => toggleGroup("price")}
        >
          <PriceRangeFilter
            minPrice={0}
            maxPrice={2000}
            currentMin={currentFilters.priceMin}
            currentMax={currentFilters.priceMax}
            onChange={handlePriceChange}
          />
        </FilterGroup>
      )}

      {availableFilters.includes("brands") && (
        <FilterGroup
          title="Brand"
          isOpen={openGroups.brands ?? false}
          onToggle={() => toggleGroup("brands")}
        >
          {BRANDS.map((brand) => (
            <CheckboxFilter
              key={brand.slug}
              label={brand.name}
              checked={currentFilters.brands?.includes(brand.slug) ?? false}
              onChange={() => handleToggleFilter("brands", brand.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("conditions") && (
        <FilterGroup
          title="Condition"
          isOpen={openGroups.conditions ?? false}
          onToggle={() => toggleGroup("conditions")}
        >
          {CONDITIONS.map((condition) => (
            <CheckboxFilter
              key={condition.slug}
              label={condition.label}
              checked={currentFilters.conditions?.includes(condition.slug) ?? false}
              onChange={() => handleToggleFilter("conditions", condition.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("cpus") && (
        <FilterGroup
          title="Processor"
          isOpen={openGroups.cpus ?? false}
          onToggle={() => toggleGroup("cpus")}
        >
          {CPUS.map((cpu) => (
            <CheckboxFilter
              key={cpu.slug}
              label={cpu.name}
              checked={currentFilters.cpus?.includes(cpu.slug) ?? false}
              onChange={() => handleToggleFilter("cpus", cpu.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("rams") && (
        <FilterGroup
          title="Memory (RAM)"
          isOpen={openGroups.rams ?? false}
          onToggle={() => toggleGroup("rams")}
        >
          {RAMS.map((ram) => (
            <CheckboxFilter
              key={ram.slug}
              label={ram.size}
              checked={currentFilters.rams?.includes(ram.slug) ?? false}
              onChange={() => handleToggleFilter("rams", ram.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("storages") && (
        <FilterGroup
          title="Storage"
          isOpen={openGroups.storages ?? false}
          onToggle={() => toggleGroup("storages")}
        >
          {STORAGES.map((storage) => (
            <CheckboxFilter
              key={storage.slug}
              label={storage.capacity}
              checked={currentFilters.storages?.includes(storage.slug) ?? false}
              onChange={() => handleToggleFilter("storages", storage.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("screenSizes") && (
        <FilterGroup
          title="Screen Size"
          isOpen={openGroups.screenSizes ?? false}
          onToggle={() => toggleGroup("screenSizes")}
        >
          {SCREEN_SIZES.map((size) => (
            <CheckboxFilter
              key={size.slug}
              label={size.size}
              checked={currentFilters.screenSizes?.includes(size.slug) ?? false}
              onChange={() => handleToggleFilter("screenSizes", size.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("simSlots") && (
        <FilterGroup
          title="SIM Type"
          isOpen={openGroups.simSlots ?? false}
          onToggle={() => toggleGroup("simSlots")}
        >
          {SIM_SLOTS.map((sim) => (
            <CheckboxFilter
              key={sim.slug}
              label={sim.type}
              checked={currentFilters.simSlots?.includes(sim.slug) ?? false}
              onChange={() => handleToggleFilter("simSlots", sim.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("connectivities") && (
        <FilterGroup
          title="Connectivity"
          isOpen={openGroups.connectivities ?? false}
          onToggle={() => toggleGroup("connectivities")}
        >
          {CONNECTIVITIES.map((conn) => (
            <CheckboxFilter
              key={conn.slug}
              label={conn.type}
              checked={currentFilters.connectivities?.includes(conn.slug) ?? false}
              onChange={() => handleToggleFilter("connectivities", conn.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("bandSizes") && (
        <FilterGroup
          title="Band Size"
          isOpen={openGroups.bandSizes ?? false}
          onToggle={() => toggleGroup("bandSizes")}
        >
          {BAND_SIZES.map((size) => (
            <CheckboxFilter
              key={size.slug}
              label={size.size}
              checked={currentFilters.bandSizes?.includes(size.slug) ?? false}
              onChange={() => handleToggleFilter("bandSizes", size.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("bandTypes") && (
        <FilterGroup
          title="Band Type"
          isOpen={openGroups.bandTypes ?? false}
          onToggle={() => toggleGroup("bandTypes")}
        >
          {BAND_TYPES.map((type) => (
            <CheckboxFilter
              key={type.slug}
              label={type.material}
              checked={currentFilters.bandTypes?.includes(type.slug) ?? false}
              onChange={() => handleToggleFilter("bandTypes", type.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("faceSizes") && (
        <FilterGroup
          title="Face Size"
          isOpen={openGroups.faceSizes ?? false}
          onToggle={() => toggleGroup("faceSizes")}
        >
          {FACE_SIZES.map((size) => (
            <CheckboxFilter
              key={size.slug}
              label={size.size}
              checked={currentFilters.faceSizes?.includes(size.slug) ?? false}
              onChange={() => handleToggleFilter("faceSizes", size.slug)}
            />
          ))}
        </FilterGroup>
      )}

      {availableFilters.includes("series") && (
        <FilterGroup
          title="Series"
          isOpen={openGroups.series ?? false}
          onToggle={() => toggleGroup("series")}
        >
          {SERIES.map((s) => (
            <CheckboxFilter
              key={s.slug}
              label={s.name}
              checked={currentFilters.series?.includes(s.slug) ?? false}
              onChange={() => handleToggleFilter("series", s.slug)}
            />
          ))}
        </FilterGroup>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-light-400 rounded-full text-body-medium text-dark-900 hover:bg-light-200 transition-colors"
        aria-label="Open filters"
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
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        <span>Filter</span>
        {activeFilterCount > 0 && (
          <span className="bg-dark-900 text-light-100 text-footnote px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
      </button>

      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4">{filterContent}</div>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-dark-900/50"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-light-100 shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-light-100 border-b border-light-300 px-4 py-3 flex items-center justify-between z-10">
              <h2 className="text-heading-3 text-dark-900">Filters</h2>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-dark-900 hover:bg-light-200 rounded-lg"
                aria-label="Close filters"
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
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">{filterContent}</div>
            <div className="sticky bottom-0 bg-light-100 border-t border-light-300 p-4">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 px-4 bg-dark-900 text-light-100 rounded-lg text-body-medium hover:bg-dark-700 transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
