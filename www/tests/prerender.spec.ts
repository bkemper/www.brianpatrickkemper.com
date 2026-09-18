import { expect, test } from "@playwright/test";

const canonicalOrigin = "https://www.brianpatrickkemper.com";
const currentYear = String(new Date().getFullYear());

const companyLinkedInPaths = [
  "/company/pieinsurance/",
  "/company/visual-lease/",
  "/company/joinfacet/",
  "/company/sparkpost/",
  "/company/staq/",
] as const;

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

test("prerendered / still shows the heading after reload without JavaScript", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Brian Patrick Kemper" }),
  ).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("heading", { level: 1, name: "Brian Patrick Kemper" }),
  ).toBeVisible();
});

test("prerendered / includes the Connect CTA and role text", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText(
      /A Product Software Engineer who builds digital products that make your work life easier by understanding your domain and leading teams to deliver the ideal user experience./,
    ),
  ).toBeVisible();

  const linkedIn = page.getByRole("link", { name: "Connect" });
  await expect(linkedIn).toBeVisible();
  await expect(linkedIn).toHaveAttribute(
    "href",
    "//www.linkedin.com/in/brianpatrickkemper/",
  );
});

test("prerendered / includes five company LinkedIn marks", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 2, name: "Company Logos" }),
  ).toBeAttached();

  for (const path of companyLinkedInPaths) {
    const link = page.locator(`a[href="//www.linkedin.com${path}"]`);
    await expect(link).toHaveCount(1);
  }
});

test("prerendered / footer has the year and GitHub profile link", async ({
  page,
}) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer).toContainText(currentYear);
  await expect(footer).toContainText("©");

  const githubLink = footer.getByRole("link", { name: "bkemper" });
  await expect(githubLink).toBeVisible();
  await expect(githubLink).toHaveAttribute("href", "//github.com/bkemper");
});

test("prerendered / document metadata matches the public Site", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Brian Patrick Kemper");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute(
    "content",
    "A Product Software Engineer who builds digital products that make your work life easier by understanding your domain and leading teams to deliver the ideal user experience.",
  );

  const keywords = page.locator('meta[name="keywords"]');
  await expect(keywords).toHaveAttribute("content", /engineer/);
  await expect(keywords).toHaveAttribute("content", /software/);

  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute("content", /index/);
  await expect(robots).toHaveAttribute("content", /follow/);

  const canonical = page.locator('link[rel="canonical"]');
  await expect(canonical).toHaveAttribute("href", `${canonicalOrigin}/`);
});

test("/robots.txt allows / and names the canonical sitemap", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");

  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toMatch(/Allow:\s*\/\s*$/im);
  expect(body).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
  expect(body).not.toContain("https://brianpatrickkemper.com/sitemap.xml");
});

test("/sitemap.xml lists only / on the canonical origin", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");

  expect(response.ok()).toBe(true);
  const body = await response.text();
  expect(body).toContain(`<loc>${canonicalOrigin}/</loc>`);
  expect(body).not.toContain("https://brianpatrickkemper.com/</loc>");
  expect(body.match(/<loc>/g)?.length).toBe(1);
});

test("Google Search Console verification file is served", async ({
  request,
}) => {
  const response = await request.get("/googleabca8e5aac858748.html");

  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(
    "google-site-verification: googleabca8e5aac858748.html",
  );
});

test("favicon and public logos are served at their current paths", async ({
  request,
}) => {
  for (const path of ["/favicon.ico", "/logo.png", "/logo.svg"]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
  }
});

test("an unknown path returns a real 404", async ({ request }) => {
  const response = await request.get("/does-not-exist");

  expect(response.status()).toBe(404);
});
