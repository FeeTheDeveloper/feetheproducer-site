import { expect, test } from "@playwright/test";

test("account routes render and signed-out account access redirects", async ({ page, request }) => {
  for (const [route, title] of [["/sign-up", "Make yourself at home."], ["/sign-in", "Welcome back."]]) {
    for (const width of [1440, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('meta[name="robots"]').getAttribute("content")).toContain("noindex");
    }
  }
  const health = await (await request.get("/api/health/integrations")).json();
  await page.goto("/account", { waitUntil: "domcontentloaded" });
  if (health.integrations.clerk.configured) await expect(page).toHaveURL(/\/sign-in/);
  else await expect(page.getByRole("status")).toContainText("temporarily unavailable");
});
