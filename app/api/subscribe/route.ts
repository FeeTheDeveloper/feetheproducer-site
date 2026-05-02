import { NextResponse } from "next/server";

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

  console.info("[subscribe] FTP email capture", {
    email,
    provider: "pending-resend-convertkit-mailchimp"
  });

  return NextResponse.json({
    ok: true,
    message: "Subscription captured."
  });
}
