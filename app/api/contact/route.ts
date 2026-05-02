import { NextResponse } from "next/server";

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

  console.info("[contact] FTP inquiry received", {
    ...submission,
    provider: "pending-resend"
  });

  return NextResponse.json({
    ok: true,
    message: "Contact submission captured."
  });
}
