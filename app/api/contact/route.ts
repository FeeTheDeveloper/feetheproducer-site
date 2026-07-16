import { NextResponse } from "next/server";

import { isEmailConfigured, sendNotificationEmail } from "@/lib/resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const submission = {
    name: normalizeField(payload.name),
    email: normalizeField(payload.email).toLowerCase(),
    service: normalizeField(payload.service),
    message: normalizeField(payload.message)
  };

  if (!submission.name || !submission.service || !submission.message) {
    return NextResponse.json(
      { error: "Name, service, and message are required." },
      { status: 400 }
    );
  }

  if (!submission.email || !isValidEmail(submission.email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (isEmailConfigured()) {
    const result = await sendNotificationEmail({
      subject: `New inquiry: ${submission.service} — ${submission.name}`,
      text: [
        "New inquiry via feetheproducer.com contact form:",
        "",
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Service: ${submission.service}`,
        "",
        "Message:",
        submission.message
      ].join("\n"),
      replyTo: submission.email
    });

    if (!result.ok) {
      console.error("[contact] Resend delivery failed", result.error);
    }
  } else {
    console.info("[contact] FTP inquiry received (Resend not configured)", {
      ...submission
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Contact submission captured."
  });
}
