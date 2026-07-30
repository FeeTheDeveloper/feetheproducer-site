import { NextRequest, NextResponse } from "next/server";

import { downloads } from "@/lib/data/downloads";
import { SITE } from "@/lib/site";
import { getStripeClient } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const track = downloads.find((item) => item.slug === slug);

  if (!track || !track.stripePriceId) {
    return NextResponse.redirect(new URL("/downloads", request.url));
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: track.stripePriceId, quantity: 1 }],
      success_url: `${SITE.url}/downloads/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/downloads/cancel`,
      metadata: { slug: track.slug }
    });

    if (!session.url) {
      return NextResponse.redirect(new URL("/downloads", request.url));
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch {
    return NextResponse.redirect(new URL("/downloads", request.url));
  }
}
