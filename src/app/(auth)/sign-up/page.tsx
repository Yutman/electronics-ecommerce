import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

const signUpFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text" as const,
    placeholder: "Enter your full name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "johndoe@gmail.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password" as const,
    placeholder: "minimum 8 characters",
    autoComplete: "new-password",
  },
];

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-right">
        <span className="text-body text-dark-700">
          Already have an account?{" "}
        </span>
        <Link
          href="/sign-in"
          className="text-body-medium text-dark-900 underline hover:no-underline"
        >
          Sign In
        </Link>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-heading-2 text-dark-900">Join A2Z Today!</h1>
        <p className="text-body text-dark-700">
          Create your account to start your electronics journey
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
            Or sign up with
          </span>
        </div>
      </div>

      {/* Form */}
      <AuthForm
        fields={signUpFields}
        submitLabel="Sign Up"
        termsText={
          <>
            By signing up, you agree to our{" "}
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
    </div>
  );
}
