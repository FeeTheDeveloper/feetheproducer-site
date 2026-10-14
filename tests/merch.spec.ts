import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("merch is reachable and shows six actual products", async ({ page }, testInfo) => {
  await page.goto("/merch");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Wear the signature/);
  await expect(page.locator(".merch-card")).toHaveCount(6);
  for (const link of await page.locator(".merch-card-heading a").all()) expect(await link.getAttribute("href")).toMatch(/^\/merch\//);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("merch-desktop.png"), fullPage: true });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.screenshot({ path: testInfo.outputPath("merch-mobile.png"), fullPage: true });
  await page.goto("/merch/studio-letterman");
  await expect(page.getByText(/fabric sleeves, not leather/i)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("merch selection works without JavaScript and does not submit a purchase", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/merch/core-washed-tee");
  const select = page.getByLabel("Size and price");
  if (await select.count()) {
    const options = page.locator("#merch-size option:not([disabled])");
    await select.selectOption((await options.first().getAttribute("value"))!);
    await expect(select).not.toHaveValue("");
    await expect(page.getByRole("button", { name: "Continue to checkout" })).toBeEnabled();
    expect(await page.locator(".merch-purchase").getAttribute("method")).toBe("post");
  } else await expect(page.getByText("Temporarily unavailable")).toBeVisible();
  await context.close();
});

test("checkout rejects cross-origin and tampered requests before provider calls", async ({ request }) => {
  expect((await request.post("/api/merch/checkout", { headers: { Origin: "https://unrelated.example" }, form: { product: "core-washed-tee" } })).status()).toBe(403);
  expect((await request.post("/api/merch/checkout", { headers: { Origin: "http://localhost:3100" }, form: { product: "unlisted", variant: "1", quantity: "1", requestKey: "fake" } })).status()).toBe(400);
  expect((await request.get("/api/merch/checkout")).status()).toBe(405);
});

test("query parameters cannot fabricate a paid order", async ({ page }) => {
  await page.goto("/merch/complete?session_id=not-a-session&paid=true");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Check your order status.");
  await expect(page.getByText("Your payment is confirmed.", { exact: false })).toHaveCount(0);
});
