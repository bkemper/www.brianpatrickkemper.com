import { chromium as playwright } from "playwright-core";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "@sparticuz/chromium";

const s3 = new S3Client({});

function timestampPrefix(now: Date): string {
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const min = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd}/${hh}-${min}-${ss}`;
}

export const handler = async (): Promise<void> => {
  const bucketName = process.env.SNAPSHOT_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("SNAPSHOT_BUCKET_NAME is required");
  }

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  const pageOptions: Parameters<typeof browser.newPage>[0] = {
    ignoreHTTPSErrors: false,
    isMobile: false,
    javaScriptEnabled: true,
    locale: "en-US",
    screen: {
      height: 1290,
      width: 2796,
    },
    timezoneId: "UTC",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 BwiSnapshot/1.0",
    viewport: {
      height: 1290,
      width: 2796,
    },
  };

  const page = await browser.newPage(pageOptions);

  try {
    const start = new Date();
    const prefix = timestampPrefix(start);
    const url = "https://bwiairport.com/";
    const fetchOptions: Parameters<typeof page.goto>[1] = {
      timeout: 60_000,
      waitUntil: "networkidle",
    };

    await page.goto(url, fetchOptions);

    const end = new Date();

    const [dom, screenshot] = await Promise.all([
      page.content(),
      page.screenshot({
        fullPage: true,
        type: "png",
      }),
    ]);

    await s3.send(
      new PutObjectCommand({
        Body: dom,
        Bucket: bucketName,
        ContentType: "text/html",
        Key: `${prefix}/bwi.html`,
      }),
    );

    await s3.send(
      new PutObjectCommand({
        Body: screenshot,
        Bucket: bucketName,
        ContentType: "image/png",
        Key: `${prefix}/bwi.png`,
      }),
    );

    await s3.send(
      new PutObjectCommand({
        Body: JSON.stringify({
          endAt: end.toISOString(),
          fetchOptions,
          pageOptions,
          prefix,
          startAt: start.toISOString(),
          url,
        }),
        Bucket: bucketName,
        ContentType: "application/json",
        Key: `${prefix}/meta.json`,
      }),
    );
  } finally {
    await browser.close();
  }
};
