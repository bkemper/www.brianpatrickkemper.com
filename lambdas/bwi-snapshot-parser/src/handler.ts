import type { S3Handler } from "aws-lambda";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { parse } from "node-html-parser";

const s3 = new S3Client({});

/** BWI security wait table row: Checkpoint, General, Priority, TSA Pre, Clear */
export interface SecurityWaitRow {
  checkpoint: string;
  general: string;
  priority: string;
  tsaPre: string;
  clear: string;
}

/** Meta.json shape written by snapshot Lambda; we extend it with parse fields. */
export interface SnapshotMeta {
  endAt?: string;
  fetchOptions?: unknown;
  pageOptions?: unknown;
  prefix?: string;
  startAt?: string;
  url?: string;
  parseStatus?: "parsed" | "failed";
  parsedStartAt?: string;
  parsedEndAt?: string;
  securityWaitTable?: SecurityWaitRow[];
  parseError?: string;
}

const META_KEY = "meta.json";

function dirname(key: string): string {
  const i = key.lastIndexOf("/");
  return i === -1 ? "" : key.slice(0, i);
}

/**
 * Find the security wait-times table on BWI homepage.
 * Table has headers: Checkpoint | General | Priority | TSA Pre | Clear
 */
export function extractSecurityWaitTable(html: string): SecurityWaitRow[] {
  const root = parse(html);
  const tables = root.querySelectorAll("table");
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    if (rows.length < 2) continue;
    const headerCells = rows[0].querySelectorAll("th, td");
    const headerText = headerCells.map((c) => c.textContent.trim().toLowerCase()).join(" ");
    if (
      !headerText.includes("checkpoint") ||
      !headerText.includes("general") ||
      !headerText.includes("priority")
    ) {
      continue;
    }
    const result: SecurityWaitRow[] = [];
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].querySelectorAll("td");
      if (cells.length >= 5) {
        result.push({
          checkpoint: cells[0].textContent.trim(),
          general: cells[1].textContent.trim(),
          priority: cells[2].textContent.trim(),
          tsaPre: cells[3].textContent.trim(),
          clear: cells[4].textContent.trim(),
        });
      }
    }
    return result;
  }
  return [];
}

export const handler: S3Handler = async (event) => {
  for (const record of event.Records) {
    const key = record.s3?.object?.key;

    if (key == null || key === "") {
      console.log("Event missing object key; skipping.");
      continue;
    }

    if (!key.toLowerCase().endsWith(".html")) {
      console.log("Key is not an HTML file; skipping.", { key });
      continue;
    }

    const bucket = record.s3.bucket.name;
    const prefix = dirname(key);
    const metaKey = prefix ? `${prefix}/${META_KEY}` : META_KEY;

    let meta: SnapshotMeta;
    try {
      const metaRes = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: metaKey }),
      );
      const metaBody = await metaRes.Body?.transformToString();
      if (metaBody == null) {
        console.error("meta.json empty or missing.", { metaKey });
        continue;
      }
      meta = JSON.parse(metaBody) as SnapshotMeta;
    } catch (err) {
      console.error("Failed to download or parse meta.json", { metaKey, err });
      continue;
    }

    if (meta.parseStatus === "parsed") {
      console.log("Already parsed; skipping.", { metaKey });
      continue;
    }

    const parsedStartAt = new Date().toISOString();

    try {
      const htmlRes = await s3.send(
        new GetObjectCommand({ Bucket: bucket, Key: key }),
      );

      const html = await htmlRes.Body?.transformToString();

      if (html == null) {
        throw new Error("HTML object empty or missing.");
      }

      const securityWaitTable = extractSecurityWaitTable(html);
      const parsedEndAt = new Date().toISOString();

      const updated: SnapshotMeta = {
        ...meta,
        parseStatus: "parsed",
        parsedStartAt,
        parsedEndAt,
        securityWaitTable,
      };

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: metaKey,
          ContentType: "application/json",
          Body: JSON.stringify(updated),
        }),
      );
      console.log("Parsed and updated meta.json", {
        metaKey,
        rowCount: securityWaitTable.length,
      });
    } catch (err) {
      const parsedEndAt = new Date().toISOString();
      const parseError = err instanceof Error ? err.message : String(err);
      const updated: SnapshotMeta = {
        ...meta,
        parseStatus: "failed",
        parsedStartAt,
        parsedEndAt,
        parseError,
      };

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: metaKey,
          ContentType: "application/json",
          Body: JSON.stringify(updated),
        }),
      );
      console.error("Parse failed; meta.json updated with parseError.", {
        metaKey,
        parseError,
      });
    }
  }
};
