import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: true });

test("hydrated clock shows America/New_York time without a wrong-time flash", async ({
  page,
  request,
}) => {
  const prerendered = await request.get("/");
  expect(await prerendered.text()).not.toMatch(/<time[\s>]/i);

  await page.goto("/");

  const clock = page.locator("time");
  await expect(clock).toBeVisible();

  await expect
    .poll(async () => {
      const rendered = (await clock.textContent())?.trim() ?? "";
      const expected = await page.evaluate(() =>
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "America/New_York",
          timeZoneName: "short",
        }),
      );
      return rendered === expected;
    })
    .toBe(true);

  await expect(clock).toHaveAttribute("datetime", /.+/);
});

test("time-zone note is visible for the same zone or an ahead/behind offset", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByText(
      /Nice! I work in the same time zone as you\.|I'm \d+ hours(?: and \d+ minutes)? (?:ahead|behind) you\./,
    ),
  ).toBeVisible();
});

test("clock schedules a refresh for the next minute boundary", async ({
  page,
}) => {
  // Freeze just before a minute rollover so the refresh delay is short and exact.
  await page.clock.install({ time: new Date("2024-06-15T16:00:45.000Z") });
  await page.goto("/");

  const clock = page.locator("time");
  await expect(clock).toBeVisible();
  const before = await clock.getAttribute("datetime");

  await page.clock.fastForward(15_000);

  await expect
    .poll(async () => clock.getAttribute("datetime"))
    .not.toBe(before);
});

test("color-scheme cycles system → light → dark and persists as color-scheme", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Change appearance" });
  await expect(toggle).toBeVisible();

  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("system");

  await toggle.click();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("light");
  await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "light");

  await toggle.click();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("dark");
  await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "dark");

  await toggle.click();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("system");

  await toggle.click();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("light");

  await page.reload();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("light");
  await expect(page.locator("html")).toHaveAttribute("data-color-scheme", "light");
});

test("color-scheme control has a user-language appearance tooltip", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Change appearance" });
  await toggle.hover();

  await expect(
    page.getByText("Matching your system. Click for light."),
  ).toBeVisible();
});

test("color-scheme control shows visible keyboard focus", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Change appearance" });
  await expect(toggle).toBeVisible();

  await toggle.evaluate((el) => (el as HTMLElement).blur());
  await expect
    .poll(async () =>
      toggle.evaluate((el) => getComputedStyle(el).outlineStyle),
    )
    .toBe("none");

  await toggle.focus();
  await expect(toggle).toBeFocused();

  await expect
    .poll(async () =>
      toggle.evaluate((el) => {
        const style = getComputedStyle(el);
        return `${style.outlineStyle} ${style.outlineWidth}`;
      }),
    )
    .toMatch(/solid\s+[1-9]/);
});

test("offline overlay shows direction and dismisses when online", async ({
  page,
  context,
}) => {
  await page.goto("/");

  await expect(page.getByText("You're offline")).toHaveCount(0);

  await context.setOffline(true);
  await expect(page.getByRole("heading", { name: "You're offline" })).toBeVisible();
  await expect(
    page.getByText(
      "This page needs a connection for the live clock. Check your network, then come back — I'll still be here in Eastern time.",
    ),
  ).toBeVisible();

  await context.setOffline(false);
  await expect(page.getByRole("heading", { name: "You're offline" })).toHaveCount(
    0,
  );
});
