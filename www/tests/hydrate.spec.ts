import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: true });

test("color-scheme cycles dark → system → light and persists as color-scheme", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Toggle Color Scheme" });
  await expect(toggle).toBeVisible();

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

  await page.reload();
  await expect
    .poll(async () => page.evaluate(() => localStorage.getItem("color-scheme")))
    .toBe("system");
});

test("color-scheme control has a Toggle Color Scheme tooltip", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Toggle Color Scheme" });
  await toggle.hover();

  await expect(page.getByText("Toggle Color Scheme")).toBeVisible();
});

test("color-scheme control shows visible keyboard focus", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Toggle Color Scheme" });
  await expect(toggle).toBeVisible();

  const unfocusedBackground = await toggle.evaluate((el) => {
    (el as HTMLElement).blur();
    return getComputedStyle(el).backgroundColor;
  });

  await toggle.focus();
  await expect(toggle).toBeFocused();

  await expect
    .poll(async () =>
      toggle.evaluate((el) => getComputedStyle(el).backgroundColor),
    )
    .not.toBe(unfocusedBackground);
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

test("employer logo wall exposes aria-labels", async ({ page }) => {
  await page.goto("/");

  for (const label of [
    "Pie Insurance",
    "Visual Lease",
    "Facet",
    "SparkPost",
    "Staq",
  ]) {
    await expect(page.getByRole("link", { name: label })).toBeVisible();
  }
});
