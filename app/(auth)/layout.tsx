import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/integrations/env";

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) return children;
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/account"
      signUpFallbackRedirectUrl="/account"
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#DABA7F",
          colorPrimaryForeground: "#0A0A09",
          colorBackground: "#151513",
          colorForeground: "#F2EEE5",
          colorMutedForeground: "#B7B4AB",
          colorInput: "#0A0A09",
          colorInputForeground: "#F2EEE5",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
        },
        elements: { rootBox: "auth-widget", cardBox: "auth-card" },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
