import type { Metadata } from "next";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "@/lib/integrations/env";
import { AuthPage } from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Your account" };
export default async function AccountPage() {
  if (isClerkConfigured()) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  }
  return (
    <AuthPage title="Your account.">
      <UserProfile path="/account" routing="path" />
      <SignOutButton><button className="button button-outline auth-sign-out">Sign out</button></SignOutButton>
    </AuthPage>
  );
}
