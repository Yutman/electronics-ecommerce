"use client";

import { useState } from "react";

export interface ConditionOption {
  id: string;
  label: string;
  description: string;
  priceDiff: number;
}

export interface VariantOption {
  id: string;
  label: string;
  priceDiff: number;
}

interface VariantSelectorProps {
  basePrice: number;
  originalPrice: number;
  conditions: ConditionOption[];
  cpuOptions: VariantOption[];
  storageOptions: VariantOption[];
  ramOptions: VariantOption[];
}

export default function VariantSelector({
  basePrice,
  originalPrice,
  conditions,
  cpuOptions,
  storageOptions,
  ramOptions,
}: VariantSelectorProps) {
  const [selectedCondition, setSelectedCondition] = useState(conditions[1]?.id ?? conditions[0]?.id ?? "");
  const [selectedCpu, setSelectedCpu] = useState(cpuOptions[0]?.id ?? "");
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[1]?.id ?? storageOptions[0]?.id ?? "");
  const [selectedRam, setSelectedRam] = useState(ramOptions[1]?.id ?? ramOptions[0]?.id ?? "");

  const conditionDiff = conditions.find((c) => c.id === selectedCondition)?.priceDiff ?? 0;
  const cpuDiff = cpuOptions.find((c) => c.id === selectedCpu)?.priceDiff ?? 0;
  const storageDiff = storageOptions.find((s) => s.id === selectedStorage)?.priceDiff ?? 0;
  const ramDiff = ramOptions.find((r) => r.id === selectedRam)?.priceDiff ?? 0;

  const currentPrice = basePrice + conditionDiff + cpuDiff + storageDiff + ramDiff;
  const savings = originalPrice - currentPrice;

  return (
    <div className="space-y-6">
      {/* Price Display */}
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-heading-3 font-bold text-dark-900">
            ${currentPrice.toFixed(2)}
          </span>
          {savings > 0 && (
            <span className="text-body text-dark-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {savings > 0 && (
          <span className="inline-block mt-1 px-2 py-0.5 bg-green/10 text-green text-caption rounded">
            You Save ${savings.toFixed(2)} ({Math.round((savings / originalPrice) * 100)}%)
          </span>
        )}
      </div>

      {/* CPU Selector */}
      <div>
        <h3 className="text-caption font-medium text-dark-900 mb-2">CPU</h3>
        <div className="flex flex-wrap gap-2">
          {cpuOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedCpu(option.id)}
              aria-pressed={selectedCpu === option.id}
              className={`
                px-3 py-2 text-footnote rounded-lg border transition-all
                ${
                  selectedCpu === option.id
                    ? "border-dark-900 bg-dark-900 text-light-100"
                    : "border-light-300 text-dark-900 hover:border-dark-500"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Selector */}
      <div>
        <h3 className="text-caption font-medium text-dark-900 mb-2">Condition</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {conditions.map((condition) => (
            <button
              key={condition.id}
              type="button"
              onClick={() => setSelectedCondition(condition.id)}
              aria-pressed={selectedCondition === condition.id}
              className={`
                flex flex-col items-start p-3 rounded-lg border-2 transition-all text-left
                ${
                  selectedCondition === condition.id
                    ? "border-dark-900 bg-light-200"
                    : "border-light-300 hover:border-dark-500"
                }
              `}
            >
              <span className="text-caption font-medium text-dark-900">{condition.label}</span>
              <span className="text-footnote text-dark-500 mt-0.5">{condition.description}</span>
              {condition.priceDiff !== 0 && (
                <span className={`text-footnote mt-1 ${condition.priceDiff > 0 ? "text-red" : "text-green"}`}>
                  {condition.priceDiff > 0 ? "+" : "-"}${Math.abs(condition.priceDiff).toFixed(2)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Selector */}
      <div>
        <h3 className="text-caption font-medium text-dark-900 mb-2">Storage</h3>
        <div className="flex flex-wrap gap-2">
          {storageOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedStorage(option.id)}
              aria-pressed={selectedStorage === option.id}
              className={`
                px-4 py-2 text-caption rounded-lg border transition-all
                ${
                  selectedStorage === option.id
                    ? "border-dark-900 bg-dark-900 text-light-100"
                    : "border-light-300 text-dark-900 hover:border-dark-500"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* RAM Selector */}
      <div>
        <h3 className="text-caption font-medium text-dark-900 mb-2">RAM</h3>
        <div className="flex flex-wrap gap-2">
          {ramOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedRam(option.id)}
              aria-pressed={selectedRam === option.id}
              className={`
                px-4 py-2 text-caption rounded-lg border transition-all
                ${
                  selectedRam === option.id
                    ? "border-dark-900 bg-dark-900 text-light-100"
                    : "border-light-300 text-dark-900 hover:border-dark-500"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Network info */}
      <div className="flex items-center gap-2 text-footnote text-dark-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        <span>In stock &amp; ready to ship</span>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        className="w-full py-3.5 px-6 bg-dark-900 text-light-100 text-body-medium rounded-lg hover:bg-dark-700 transition-colors"
      >
        Add to Cart
      </button>

      {/* Buy now */}
      <button
        type="button"
        className="w-full py-3.5 px-6 border-2 border-dark-900 text-dark-900 text-body-medium rounded-lg hover:bg-light-200 transition-colors"
      >
        Buy Now
      </button>
    </div>
  );
}
