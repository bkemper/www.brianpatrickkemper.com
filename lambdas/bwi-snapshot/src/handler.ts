import { chromium as playwright } from "playwright-core";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import chromium from "@sparticuz/chromium";

const s3 = new S3Client({});

function timestampPrefix(): string {
  const now = new Date();
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

  const page = await browser.newPage();

  try {
    const prefix = timestampPrefix();

    await page.goto("https://bwiairport.com/", { waitUntil: "networkidle" });

    const [dom, screenshot] = await Promise.all([
      page.content(),
      page.screenshot({ type: "png" }),
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
  } finally {
    await browser.close();
  }
};
