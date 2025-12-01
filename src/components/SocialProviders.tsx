"use client";

import Image from "next/image";

interface SocialProvider {
  name: string;
  icon: string;
  onClick?: () => void;
}

const providers: SocialProvider[] = [
  {
    name: "Google",
    icon: "/google.svg",
  },
  {
    name: "Apple",
    icon: "/apple.svg",
  },
];

interface SocialProvidersProps {
  onProviderClick?: (provider: string) => void;
}

export default function SocialProviders({ onProviderClick }: SocialProvidersProps) {
  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={() => onProviderClick?.(provider.name)}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-light-100 border border-light-300 rounded-full text-body-medium text-dark-900 hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2"
        >
          <Image
            src={provider.icon}
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
          <span>Continue with {provider.name}</span>
        </button>
      ))}
    </div>
  );
}
