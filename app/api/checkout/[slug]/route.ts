import { NextRequest, NextResponse } from "next/server";

import { downloads } from "@/lib/data/downloads";
import { getStripe } from "@/lib/stripe";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const track = downloads.find((t) => t.slug === slug);

  if (!track || (!track.stripePriceId && !track.priceCents)) {
    return NextResponse.json({ error: "Track not available for purchase" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      track.stripePriceId
        ? { price: track.stripePriceId, quantity: 1 }
        : {
            price_data: {
              currency: "usd",
              unit_amount: track.priceCents,
              product_data: {
                name: track.title,
                description: `${track.artist}${track.featuring ? ` feat. ${track.featuring.join(", ")}` : ""}`
              }
            },
            quantity: 1
          }
    ],
    success_url: `${origin}/downloads/success?track=${track.slug}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/downloads`
  });

  if (!session.url) {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
