import Link from "next/link";
import type { Metadata } from "next";
import { getStripeClient } from "@/lib/integrations/stripe";
import "../merch.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order status | Fee The Producer", robots: { index: false, follow: false } };
export default async function MerchCompletePage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  if (session_id && /^cs_(live|test)_[a-zA-Z0-9]{20,200}$/.test(session_id)) {
    try {
      const session = await getStripeClient().checkout.sessions.retrieve(session_id);
      paid = session.metadata?.application === "feetheproducer-merch" && session.payment_status === "paid" && session.status === "complete";
    } catch { /* A query string is never proof of payment. */ }
  }
  return <section className="container-page merch-complete">
    <p className="eyebrow">FEE THE PRODUCER / YOUR ORDER</p>
    <h1>{paid ? "Thank you for wearing the signature." : "Check your order status."}</h1>
    <p>{paid ? "Your payment is confirmed. Fee The Producer will review your order and submit it to Printful for production. This confirmation does not mean your order has shipped." : "We couldn’t confirm a completed payment from this link. Check your Stripe payment confirmation or contact Fee The Producer for help."}</p>
    <Link className="button button-primary" href="/merch">Back to the collection</Link><Link className="text-link" href="/contact">Contact Fee The Producer ↗</Link>
  </section>;
}
