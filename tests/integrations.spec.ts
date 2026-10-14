import { expect, test } from "@playwright/test";

/**
 * The integration routes must degrade safely. Credentials are absent in CI and
 * in any local checkout, so the contract under test is: report status honestly,
 * refuse work with 503/401/400, and never take the public site down with them.
 */

const SECRET_SHAPES = [/sk_(test|live)_/, /whsec_/, /service_role/, /eyJ[A-Za-z0-9_-]{20,}/];

test("health route reports integration status without leaking values", async ({
  request,
}) => {
  const response = await request.get("/api/health/integrations");
  expect(response.status()).toBe(200);

  const body = await response.json();
  for (const name of ["clerk", "stripe", "supabase"] as const) {
    expect(body.integrations[name]).toBeDefined();
    expect(typeof body.integrations[name].configured).toBe("boolean");
  }

  const raw = JSON.stringify(body);
  for (const shape of SECRET_SHAPES) {
    expect(raw, `health payload matched ${shape}`).not.toMatch(shape);
  }
});

test("account route refuses without auth instead of erroring", async ({
  request,
}) => {
  const response = await request.get("/api/account");
  // 503 when Clerk is unconfigured, 401 once it is.
  expect([401, 503]).toContain(response.status());
  expect((await response.json()).error).toBeTruthy();
});

test("checkout route refuses without auth instead of erroring", async ({
  request,
}) => {
  const response = await request.post("/api/checkout", {
    data: { productSlug: "does-not-exist" },
  });
  expect([400, 401, 503]).toContain(response.status());
  expect((await response.json()).error).toBeTruthy();
});

test("webhook routes reject unsigned payloads", async ({ request }) => {
  for (const path of ["/api/webhooks/stripe", "/api/webhooks/clerk"]) {
    const response = await request.post(path, { data: { type: "ping" } });
    // 503 when unconfigured, 400 once configured and the signature is missing.
    expect([400, 503], path).toContain(response.status());
  }
});

test("public pages still render with the auth middleware in place", async ({
  page,
}) => {
  for (const route of ["/", "/streaming", "/beats", "/contact"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});
