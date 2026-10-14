export function checkoutQuantity(value: unknown): number | null {
  if (value === undefined) return 1;
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 99
    ? value
    : null;
}

export function checkoutStatus(input: {
  paymentStatus: string;
  sessionStatus: string | null;
  eventType: string;
  fullyRefunded: boolean;
}): "pending" | "paid" | "refunded" | "expired" | "failed" {
  if (input.fullyRefunded) return "refunded";
  if (input.paymentStatus === "paid" || input.paymentStatus === "no_payment_required") return "paid";
  if (input.sessionStatus === "expired") return "expired";
  if (input.eventType === "checkout.session.async_payment_failed") return "failed";
  return "pending";
}

export function checkoutRequestKey(value: string | null): string | null {
  return value && /^[A-Za-z0-9_-]{8,128}$/.test(value) ? value : null;
}
