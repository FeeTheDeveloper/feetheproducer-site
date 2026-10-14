import Link from "next/link";
import { ClerkFailed, ClerkLoading } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/integrations/env";

export function AuthPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="container-page auth-page">
      <div className="auth-intro">
        <p className="eyebrow">FEE THE PRODUCER / YOUR ACCOUNT</p>
        <h1>{title}</h1>
        <p>Your place in the studio.</p>
        <Link href="/" className="text-link">Back to the music ↗</Link>
      </div>
      <div className="auth-panel">
        {isClerkConfigured() ? <>
          <ClerkLoading><p role="status">Loading secure sign-in…</p></ClerkLoading>
          <ClerkFailed><p role="alert">Sign-in could not load. Please refresh the page or <Link href="/contact">contact the studio</Link>.</p></ClerkFailed>
          {children}
        </> : (
          <div className="auth-unavailable" role="status">
            <h2>Accounts are coming soon.</h2>
            <p>Sign-up is temporarily unavailable. You can still explore the music or get in touch.</p>
            <Link href="/contact" className="text-link">Contact the studio ↗</Link>
          </div>
        )}
        <noscript>Enable JavaScript to use secure account sign-in.</noscript>
      </div>
    </section>
  );
}
