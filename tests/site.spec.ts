import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/streaming",
  "/streaming/dont-call-it-nothing",
  "/streaming/the-band-room",
  "/streaming/neva-give-up",
  "/streaming/back-from-venus",
  "/streaming/all-gas-no-breaks",
  "/streaming/rolling",
  "/beats",
  "/about",
  "/contact",
  "/licensing",
  "/merch",
  "/merch/core-washed-tee",
  "/merch/studio-letterman",
];

test("all public routes and local images load without runtime errors", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    if (route === "/") await page.locator(".band-archive summary").click();
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect
      .poll(
        () =>
          page
            .locator("img")
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  image instanceof HTMLImageElement &&
                  image.complete &&
                  image.naturalWidth > 0,
              ),
            ),
        { message: route },
      )
      .toBe(true);
  }
  expect(errors).toEqual([]);
  for (const route of [
    "/streaming/missing",
    "/streaming/koolin-it",
    "/streaming/l-r-a",
    "/streaming/im-gone",
    "/beats/missing",
    "/downloads",
  ]) {
    expect((await page.goto(route))?.status(), route).toBe(404);
  }
  // /api/checkout is wired again, but POST-only: a navigation is rejected
  // rather than missing. The route's own behaviour is covered in
  // tests/integrations.spec.ts.
  expect((await page.goto("/api/checkout"))?.status(), "/api/checkout").toBe(
    405,
  );
});

test("desktop, mobile, and narrow layouts have no horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/streaming",
      "/beats",
      "/contact",
      "/streaming/all-gas-no-breaks",
      "/about",
      "/merch",
      "/merch/signature-snapback",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
      if (route === "/" && width !== 768) {
        await page.locator(".band-archive summary").click();
        for (const image of await page.locator("img").all()) {
          await image.scrollIntoViewIfNeeded();
        }
        await page.locator("footer").scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            page
              .locator("img")
              .evaluateAll((images) =>
                images.every(
                  (image) =>
                    image instanceof HTMLImageElement &&
                    image.complete &&
                    image.naturalWidth > 0,
                ),
              ),
          )
          .toBe(true);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: testInfo.outputPath(`homepage-${width}.png`),
          fullPage: true,
        });
        await page.screenshot({
          path: testInfo.outputPath(`hero-${width}.png`),
          fullPage: false,
        });
        await page.locator("#live-performance").screenshot({
          path: testInfo.outputPath(`performance-${width}.png`),
        });
      }
    }
  }
});

test("keyboard skip link and mobile disclosure support navigation and Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const menu = page.locator("header summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("header details")).not.toHaveAttribute("open");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The studio" })
    .click();
  await expect(page).toHaveURL(/\/beats$/);
  await expect(page.locator("header details")).not.toHaveAttribute("open");
});

test("motion pauses, persists, resumes, and follows OS changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".emblem-scene")).toHaveAttribute(
    "data-active",
    "true",
  );
  await page
    .getByRole("button", { name: "Pause visual motion" })
    .first()
    .click();
  await expect(page.locator(".emblem-scene")).toHaveAttribute(
    "data-active",
    "false",
  );
  expect(
    await page
      .locator(".emblem-object")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Enable visual motion" }).first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Enable visual motion" })
    .first()
    .click();
  await expect(page.locator(".emblem-scene")).toHaveAttribute(
    "data-active",
    "true",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page
      .getByRole("button", { name: "Motion reduced by your device setting" })
      .first(),
  ).toBeDisabled();
  expect(
    await page
      .locator(".emblem-object")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".emblem-scene")).toHaveAttribute(
    "data-active",
    "false",
  );
  await page.goto("/about");
  await page.goBack();
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(page.locator(".emblem-scene")).toHaveAttribute(
    "data-active",
    "true",
  );
});

test("static site remains navigable with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3100/");
  await expect(
    page.getByRole("heading", { name: "Feel every frequency." }),
  ).toBeVisible();
  await expect(page.locator("video")).toHaveAttribute("controls", "");
  await expect(page.locator("video")).not.toHaveAttribute("autoplay");
  await page.locator(".band-archive summary").click();
  await expect(page.locator(".band-photo-grid")).toBeVisible();
  await page.locator("header summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The music" })
    .click();
  await expect(page).toHaveURL(/\/streaming$/);
  await page.goto("http://localhost:3100/contact");
  await expect(
    page.getByRole("link", { name: /contact@feetheproducer.com/ }).first(),
  ).toHaveAttribute("href", "mailto:contact@feetheproducer.com");
  await context.close();
});

test("contact validates fields and prepares an email draft without a network submission", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") requests.push(request.url());
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Open Email Draft" }).click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  await page.getByLabel("Name", { exact: true }).fill("Studio Test");
  await page.getByLabel("Email", { exact: true }).fill("studio@example.com");
  await page
    .getByRole("combobox", { name: "Service", exact: true })
    .selectOption("Custom production");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Local verification only. No message is being sent.");
  await page.getByRole("button", { name: "Open Email Draft" }).click();
  await expect(
    page.getByText(
      "Your email app will open with a draft. Send it to complete your inquiry.",
    ),
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("catalog remains current and uses the owner-supplied Apple Music embeds", async ({
  page,
  request,
}) => {
  const channelUrl = "https://www.youtube.com/channel/UC9UgxU4WyYxVZzhVYeLyc_Q";
  const expected = [
    {
      slug: "dont-call-it-nothing",
      title: "Don't Call It Nothing",
      embed:
        "https://embed.music.apple.com/us/song/dont-call-it-nothing/6823479049",
    },
    {
      slug: "the-band-room",
      title: "The Band Room",
      embed:
        "https://embed.music.apple.com/us/song/the-band-room/6822257258",
    },
    {
      slug: "neva-give-up",
      title: "Neva Give Up (feat. Dave Watson)",
      embed:
        "https://embed.music.apple.com/us/song/neva-give-up-feat-dave-watson/6822143526",
    },
    {
      slug: "back-from-venus",
      title: "Back From Venus",
      embed:
        "https://embed.music.apple.com/us/song/back-from-venus/6820309022",
    },
    {
      slug: "all-gas-no-breaks",
      title: "All Gas No Breaks (feat. Ray Nathan)",
      embed:
        "https://embed.music.apple.com/us/song/all-gas-no-breaks-feat-ray-nathan/6806901864",
    },
    {
      slug: "rolling",
      title: "Rolling (feat. Ray-Nathan)",
      embed:
        "https://embed.music.apple.com/us/song/rolling-feat-ray-nathan/6794165344",
    },
  ];
  await page.goto("/streaming");
  await expect(page.locator(".release-card")).toHaveCount(6);
  expect(
    await page
      .locator(".release-card-link")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(expected.map((release) => `/streaming/${release.slug}`));
  for (const release of expected) {
    await page.goto(`/streaming/${release.slug}`);
    await expect(page.locator("h1")).toContainText(release.title);
    const player = page.locator(".apple-music-embed");
    await expect(player).toHaveCount(1);
    await expect(player).toHaveAttribute("src", release.embed);
    await expect(player).toHaveAttribute(
      "title",
      `Listen to ${release.title} by Fee The Producer on Apple Music`,
    );
    await expect(page.locator('a[href*="music.apple.com"]')).toHaveCount(0);
  }
  const allowed = new Set([channelUrl]);
  for (const route of routes) {
    await page.goto(route);
    const routeAllowed = new Set(allowed);
    if (route === "/") {
      routeAllowed.add("https://tubitv.com/tv-shows/200166809/s01-e01-payroll-giovanni");
      routeAllowed.add("https://www.instagram.com/bylugphonics/?hl=en");
    }
    const links = await page
      .locator('a[href^="http"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
    expect(
      links.every((url) => url !== null && routeAllowed.has(url)),
      route,
    ).toBe(true);
    expect(links, route).toContain(channelUrl);
    await expect(page.locator("audio")).toHaveCount(0);
    const release = expected.find(
      (candidate) => route === `/streaming/${candidate.slug}`,
    );
    await expect(page.locator("iframe")).toHaveCount(
      route === "/" || release ? 1 : 0,
    );
    if (route === "/") {
      const player = page.locator(".apple-music-embed");
      await expect(player).toHaveAttribute(
        "src",
        "https://embed.music.apple.com/us/song/dont-call-it-nothing/6823479049",
      );
      await expect(player).toHaveAttribute(
        "title",
        "Listen to Don't Call It Nothing by Fee The Producer on Apple Music",
      );
      await expect(player).toHaveAttribute(
        "sandbox",
        "allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation",
      );
    }
    await expect(page.locator("video")).toHaveCount(route === "/" ? 1 : 0);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const release of expected)
    expect(sitemap).toContain(`/streaming/${release.slug}`);
  for (const removed of ["koolin-it", "l-r-a", "im-gone"])
    expect(sitemap).not.toContain(`/streaming/${removed}`);
});

test("live performance waits for play, supports seeking and pauses when hidden", async ({ page }) => {
  const mediaRequests: string[] = [];
  page.on("request", request => {
    if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
  });
  await page.goto("/");
  const video = page.locator("video");
  const play = page.getByRole("button", { name: "Play Payroll Giovanni live with Bylugphonics" });
  await expect(play).toBeVisible();
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).toHaveAttribute("playsinline", "");
  await expect(video).not.toHaveAttribute("autoplay");
  await expect(video).not.toHaveAttribute("loop");
  expect(mediaRequests).toEqual([]);
  await play.focus();
  await page.keyboard.press("Enter");
  await expect(video).toBeFocused();
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0);
  expect(await video.evaluate((node: HTMLVideoElement) => node.duration)).toBeCloseTo(62, 0);
  await video.evaluate((node: HTMLVideoElement) => { node.currentTime = 30; });
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThanOrEqual(30);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
  await expect(page.locator(".performance-arena")).toHaveAttribute("data-playing", "false");
  const gallery = page.locator(".band-archive summary");
  await gallery.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".band-photo-grid")).toBeVisible();
});

test("failed performance media offers the real episode fallback", async ({ page }) => {
  await page.route("**/video/payroll-giovanni-live-excerpt.mp4", route => route.abort());
  await page.goto("/");
  await page.getByRole("button", { name: "Play Payroll Giovanni live with Bylugphonics" }).click();
  const fallback = page.getByRole("status");
  await expect(fallback).toContainText("couldn’t play");
  await expect(fallback.getByRole("link")).toHaveAttribute("href", "https://tubitv.com/tv-shows/200166809/s01-e01-payroll-giovanni");
});

test("primary routes have no detectable WCAG A/AA violations", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [
      "/",
      "/streaming",
      "/beats",
      "/about",
      "/contact",
      "/streaming/rolling",
    ]) {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        // Apple owns the embed document; its current SVG has an invalid ARIA
        // attribute. The iframe boundary itself is covered above.
        .exclude(".apple-music-embed")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        result.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        `${route} at ${width}`,
      ).toEqual([]);
    }
  }
});
