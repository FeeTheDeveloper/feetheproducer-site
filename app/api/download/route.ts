import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

import { downloads } from "@/lib/data/downloads";
import { getStripeClient } from "@/lib/stripe";

const CONTENT_TYPES: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
  ".wav": "audio/wav"
};

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  let slug: string | undefined;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed." },
        { status: 403 }
      );
    }

    slug = session.metadata?.slug;
  } catch {
    return NextResponse.json({ error: "Unable to verify order." }, { status: 400 });
  }

  const track = downloads.find((item) => item.slug === slug);

  if (!track) {
    return NextResponse.json({ error: "Track not found." }, { status: 404 });
  }

  const relativePath = decodeURIComponent(track.audioSrc);
  const filePath = path.join(process.cwd(), "public", relativePath);
  const extension = path.extname(filePath).toLowerCase();
  const fileBuffer = await readFile(filePath);
  const filename = `${track.artist} - ${track.title}${extension}`.replace(/["]/g, "");

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
