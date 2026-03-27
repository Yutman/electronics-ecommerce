"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface SpecSection {
  title: string;
  specs: { label: string; value: string }[];
}

interface SpecTableProps {
  sections: SpecSection[];
}

export default function SpecTable({ sections }: SpecTableProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.title))
  );

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.title);
        return (
          <div key={section.title} className="border border-light-300 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              aria-expanded={isExpanded}
              className="w-full flex items-center justify-between px-4 py-3 bg-light-100 hover:bg-light-200 transition-colors"
            >
              <h3 className="text-body-medium text-dark-900">{section.title}</h3>
              <ChevronDown
                className={`w-5 h-5 text-dark-700 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isExpanded && (
              <div className="px-4 pb-4">
                <table className="w-full" role="table">
                  <caption className="sr-only">{section.title}</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Specification</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.specs.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={index % 2 === 0 ? "bg-light-200" : "bg-light-100"}
                      >
                        <td className="px-3 py-2.5 text-caption text-dark-700 w-2/5">{spec.label}</td>
                        <td className="px-3 py-2.5 text-caption text-dark-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
