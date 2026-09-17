import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("prerendered / shows the Site heading without JavaScript", async ({
  page,
}) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: "Brian Patrick Kemper" }),
  ).toBeVisible();
});

test("an unknown path returns a real 404", async ({ request }) => {
  const response = await request.get("/does-not-exist");

  expect(response.status()).toBe(404);
});
