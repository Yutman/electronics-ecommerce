"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface AuthFormField {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete?: string;
}

type ActionResult = 
  | { success: true; data?: unknown }
  | { success: false; error: string };

interface AuthFormProps {
  fields: AuthFormField[];
  submitLabel: string;
  action: (formData: FormData) => Promise<ActionResult>;
  redirectTo?: string;
  termsText?: React.ReactNode;
}

export default function AuthForm({
  fields,
  submitLabel,
  action,
  redirectTo = "/",
  termsText,
}: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (name: string) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await action(formData);
        
        if (result.success) {
          // Small delay to ensure state updates, then redirect
          setTimeout(() => {
            window.location.href = redirectTo;
          }, 100);
        } else {
          setError(result.error);
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

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
              disabled={isPending}
              className="w-full px-4 py-3 bg-light-100 border border-light-300 rounded-lg text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {field.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-500 hover:text-dark-900 transition-colors disabled:opacity-50"
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
        disabled={isPending}
        className="w-full py-3.5 bg-dark-900 text-light-100 rounded-full text-body-medium hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          submitLabel
        )}
      </button>

      {termsText && (
        <p className="text-caption text-dark-700 text-center">{termsText}</p>
      )}
    </form>
  );
}
