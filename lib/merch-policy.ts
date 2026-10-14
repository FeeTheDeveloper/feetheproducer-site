/** USD arithmetic uses integer cents; a 30% margin means cost / 0.70. */
export function usdCents(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d{1,7}(\.\d{1,2})?$/.test(value)) return null;
  const [dollars, cents = ""] = value.split(".");
  const result = Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
  return Number.isSafeInteger(result) ? result : null;
}

export function retailForMargin(costCents: number): number {
  if (!Number.isSafeInteger(costCents) || costCents <= 0 || costCents > 100_000_000) {
    throw new Error("Invalid product cost");
  }
  return Math.ceil((costCents * 100) / 70);
}

export function merchQuantity(value: unknown): number | null {
  if (typeof value !== "string" || !/^[1-5]$/.test(value)) return null;
  return Number(value);
}

export function validCheckoutKey(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function money(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
