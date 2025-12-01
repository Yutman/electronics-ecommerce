"use client";

import { useState } from "react";

interface AuthFormField {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete?: string;
}

interface AuthFormProps {
  fields: AuthFormField[];
  submitLabel: string;
  onSubmit?: (data: Record<string, string>) => void;
  termsText?: React.ReactNode;
}

export default function AuthForm({
  fields,
  submitLabel,
  onSubmit,
  termsText,
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (name: string) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-body-medium text-dark-900 mb-2"
          >
            {field.label}
          </label>
          <div className="relative">
            <input
              id={field.name}
              name={field.name}
              type={
                field.type === "password"
                  ? showPassword[field.name]
                    ? "text"
                    : "password"
                  : field.type
              }
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-4 py-3 bg-light-100 border border-light-300 rounded-lg text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all"
            />
            {field.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-500 hover:text-dark-900 transition-colors"
                aria-label={
                  showPassword[field.name] ? "Hide password" : "Show password"
                }
              >
                {showPassword[field.name] ? (
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
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-3.5 bg-dark-900 text-light-100 rounded-full text-body-medium hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2"
      >
        {submitLabel}
      </button>

      {termsText && (
        <p className="text-caption text-dark-700 text-center">{termsText}</p>
      )}
    </form>
  );
}
