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

test("color-scheme cycles system → light → dark and persists as color-scheme", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button");
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

test("color-scheme control has a Toggle Color Scheme tooltip", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button");
  await toggle.hover();

  await expect(page.getByText("Toggle Color Scheme")).toBeVisible();
});

test("offline overlay shows Lost Connection and dismisses when online", async ({
  page,
  context,
}) => {
  await page.goto("/");

  await expect(page.getByText("Lost Connection")).toHaveCount(0);

  await context.setOffline(true);
  await expect(page.getByRole("heading", { name: "Lost Connection" })).toBeVisible();
  await expect(
    page.getByText(
      "It is a bummer that you lost your internet connection. Try shaking your mouse, yelling at your internet service provider, or restart your computer 3 times.",
    ),
  ).toBeVisible();

  await context.setOffline(false);
  await expect(page.getByRole("heading", { name: "Lost Connection" })).toHaveCount(
    0,
  );
});
