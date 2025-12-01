import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

const signInFields = [
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "Enter your email",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
];

export default function SignInPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <span className="text-body text-dark-700">
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/sign-up"
          className="text-body-medium text-dark-900 underline hover:no-underline"
        >
          Sign Up
        </Link>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-heading-2 text-dark-900">Welcome Back!</h1>
        <p className="text-body text-dark-700">
          Sign in to continue shopping for electronics
        </p>
      </div>

      {/* Social Providers */}
      <SocialProviders />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-light-100 text-caption text-dark-500">
            Or sign in with
          </span>
        </div>
      </div>

      {/* Form */}
      <AuthForm
        fields={signInFields}
        submitLabel="Sign In"
        termsText={
          <>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:no-underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </Link>
          </>
        }
      />

      {/* Forgot Password */}
      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-body text-dark-700 hover:text-dark-900 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
