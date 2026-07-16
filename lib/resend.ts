import { SITE } from "@/lib/site";

type SendEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

// Sends a notification email to the site inbox via Resend's REST API.
// FROM must be on a domain verified in Resend (resend.com/domains);
// override with CONTACT_FROM_EMAIL until feetheproducer.com is verified.
export async function sendNotificationEmail({
  subject,
  text,
  replyTo
}: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not configured." };
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    `Fee The Producer <onboarding@resend.dev>`;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { reply_to: [replyTo] } : {})
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return {
      ok: false,
      error: `Resend responded ${response.status}: ${detail.slice(0, 300)}`
    };
  }

  return { ok: true };
}
