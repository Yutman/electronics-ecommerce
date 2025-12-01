import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900 text-light-100 flex-col justify-between p-12 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="A2Z Electronics Home">
          <div className="bg-light-100 p-2 rounded">
            <Image
              src="/logo.svg"
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 invert"
              aria-hidden="true"
            />
          </div>
        </Link>

        {/* Tagline */}
        <div className="max-w-md">
          <h1 className="text-heading-2 mb-4">
            Tech Made Simple
          </h1>
          <p className="text-lead text-dark-500">
            Join thousands of tech enthusiasts who trust A2Z Electronics for their electronic needs.
          </p>
          {/* Dots indicator */}
          <div className="flex gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-light-100" aria-hidden="true"></span>
            <span className="w-2 h-2 rounded-full bg-dark-700" aria-hidden="true"></span>
            <span className="w-2 h-2 rounded-full bg-dark-700" aria-hidden="true"></span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-footnote text-dark-700">
          &copy; {new Date().getFullYear()} A2Z Electronics. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-light-300">
          <Link href="/" className="flex items-center gap-2" aria-label="A2Z Electronics Home">
            <div className="bg-dark-900 p-1.5 rounded">
              <Image
                src="/logo.svg"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
                aria-hidden="true"
              />
            </div>
            <span className="text-heading-3 text-dark-900">A2Z Electronics</span>
          </Link>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-light-100">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
