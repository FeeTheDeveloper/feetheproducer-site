import { NextResponse } from "next/server";

import { isEmailConfigured, sendNotificationEmail } from "@/lib/resend";

type SubscribePayload = {
  email?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email =
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (isEmailConfigured()) {
    const result = await sendNotificationEmail({
      subject: "New FTP list subscriber",
      text: `New subscriber via feetheproducer.com email capture:\n\n${email}`,
      replyTo: email
    });

    if (!result.ok) {
      console.error("[subscribe] Resend delivery failed", result.error);
    }
  } else {
    console.info("[subscribe] FTP email capture (Resend not configured)", {
      email
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Subscription captured."
  });
}
