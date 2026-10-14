import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthPage } from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Sign in" };
export default function SignInPage() {
  return <AuthPage title="Welcome back."><SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /></AuthPage>;
}
