import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/streaming",
  "/streaming/the-band-room",
  "/streaming/neva-give-up",
  "/streaming/back-from-venus",
  "/streaming/all-gas-no-breaks",
  "/streaming/rolling",
  "/beats",
  "/about",
  "/contact",
  "/licensing",
];

test("all public routes and local images load without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
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
    "/api/checkout",
  ]) {
    expect((await page.goto(route))?.status(), route).toBe(404);
  }
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
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
      if (route === "/" && width !== 768) {
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
  const menu = page.locator("summary");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("details")).not.toHaveAttribute("open");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The studio" })
    .click();
  await expect(page).toHaveURL(/\/beats$/);
  await expect(page.locator("details")).not.toHaveAttribute("open");
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
  await page.goto("http://127.0.0.1:3100/");
  await expect(
    page.getByRole("heading", { name: "Feel every frequency." }),
  ).toBeVisible();
  await page.locator("summary").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "The music" })
    .click();
  await expect(page).toHaveURL(/\/streaming$/);
  await page.goto("http://127.0.0.1:3100/contact");
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

test("catalog contains only current Apple releases and the approved YouTube channel", async ({
  page,
  request,
}) => {
  const artistUrl =
    "https://music.apple.com/us/artist/fee-the-producer/1896424385";
  const channelUrl = "https://www.youtube.com/channel/UC9UgxU4WyYxVZzhVYeLyc_Q";
  const expected = [
    {
      slug: "the-band-room",
      title: "The Band Room",
      url: "https://music.apple.com/us/album/the-band-room/6822257257?i=6822257258",
    },
    {
      slug: "neva-give-up",
      title: "Neva Give Up (feat. Dave Watson)",
      url: "https://music.apple.com/us/album/neva-give-up-feat-dave-watson/6822143525?i=6822143526",
    },
    {
      slug: "back-from-venus",
      title: "Back From Venus",
      url: "https://music.apple.com/us/album/back-from-venus/6820309021?i=6820309022",
    },
    {
      slug: "all-gas-no-breaks",
      title: "All Gas No Breaks (feat. Ray Nathan)",
      url: "https://music.apple.com/us/album/all-gas-no-breaks-feat-ray-nathan/6806901863?i=6806901864",
    },
    {
      slug: "rolling",
      title: "Rolling (feat. Ray-Nathan)",
      url: "https://music.apple.com/us/album/rolling-feat-ray-nathan/6794165343?i=6794165344",
    },
  ];
  await page.goto("/streaming");
  await expect(page.locator(".release-card")).toHaveCount(5);
  expect(
    await page
      .locator(".release-card-link")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual(expected.map((release) => `/streaming/${release.slug}`));
  for (const release of expected) {
    await page.goto(`/streaming/${release.slug}`);
    await expect(page.locator("h1")).toContainText(release.title);
    await expect(page.locator(".platform-buttons a")).toHaveCount(1);
    await expect(page.locator(".platform-buttons a")).toHaveAttribute(
      "href",
      release.url,
    );
  }
  const allowed = new Set([
    artistUrl,
    channelUrl,
    ...expected.map((release) => release.url),
  ]);
  for (const route of routes) {
    await page.goto(route);
    const links = await page
      .locator('a[href^="http"]')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
    expect(
      links.every((url) => url !== null && allowed.has(url)),
      route,
    ).toBe(true);
    expect(links, route).toContain(channelUrl);
    await expect(page.locator("iframe, audio, video")).toHaveCount(0);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const release of expected)
    expect(sitemap).toContain(`/streaming/${release.slug}`);
  for (const removed of ["koolin-it", "l-r-a", "im-gone"])
    expect(sitemap).not.toContain(`/streaming/${removed}`);
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
