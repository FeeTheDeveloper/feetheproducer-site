import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthPage } from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Sign up" };
export default function SignUpPage() {
  return <AuthPage title="Make yourself at home."><SignUp path="/sign-up" routing="path" signInUrl="/sign-in" /></AuthPage>;
}
