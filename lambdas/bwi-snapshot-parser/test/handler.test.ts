import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import {
  extractSecurityWaitTable,
  handler,
  type SecurityWaitRow,
} from "../src/handler";

const s3Mock = mockClient(S3Client);

function mockBody(text: string): { transformToString: () => Promise<string> } {
  return { transformToString: async () => text };
}

function s3Event(key: string, bucket = "test-bucket") {
  return {
    Records: [
      {
        s3: {
          bucket: { name: bucket },
          object: { key },
        },
      },
    ],
  };
}

describe("extractSecurityWaitTable", () => {
  it("returns rows from a table with Checkpoint, General, Priority, TSA Pre, Clear headers", () => {
    const html = `
      <table>
        <tr><th>Checkpoint</th><th>General</th><th>Priority</th><th>TSA Pre</th><th>Clear</th></tr>
        <tr><td>Checkpoint A</td><td>5 min</td><td>2 min</td><td>1 min</td><td>Closed</td></tr>
        <tr><td>Checkpoint B</td><td>Closed</td><td>Closed</td><td>Closed</td><td>Closed</td></tr>
      </table>
    `;
    const result = extractSecurityWaitTable(html);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      checkpoint: "Checkpoint A",
      general: "5 min",
      priority: "2 min",
      tsaPre: "1 min",
      clear: "Closed",
    });
    expect(result[1].checkpoint).toBe("Checkpoint B");
  });

  it("returns empty array when no table has the expected headers", () => {
    const html = `<table><tr><th>Other</th><th>Headers</th></tr></table>`;
    expect(extractSecurityWaitTable(html)).toEqual([]);
  });

  it("returns empty array when HTML has no table", () => {
    expect(extractSecurityWaitTable("<div>No table</div>")).toEqual([]);
  });

  it("skips rows with fewer than 5 cells", () => {
    const html = `
      <table>
        <tr><th>Checkpoint</th><th>General</th><th>Priority</th><th>TSA Pre</th><th>Clear</th></tr>
        <tr><td>Only</td><td>two</td></tr>
      </table>
    `;
    expect(extractSecurityWaitTable(html)).toEqual([]);
  });
});

describe("handler", () => {
  beforeEach(() => {
    s3Mock.reset();
  });

  it("skips when event record has no object key", async () => {
    const event = {
      Records: [{ s3: { bucket: { name: "b" }, object: {} } }],
    } as Parameters<typeof handler>[0];
    await handler(event, {} as never, () => {});
    expect(s3Mock.calls()).toHaveLength(0);
  });

  it("skips when key is not an HTML file", async () => {
    await handler(s3Event("2025/01/01/12-00-00/meta.json") as never, {} as never, () => {});
    expect(s3Mock.calls()).toHaveLength(0);
  });

  it("skips when parseStatus is already parsed", async () => {
    const metaKey = "2025/01/01/12-00-00/meta.json";
    s3Mock.on(GetObjectCommand).resolves({
      Body: mockBody(JSON.stringify({ parseStatus: "parsed", prefix: "2025/01/01/12-00-00" })) as never,
    });
    await handler(s3Event("2025/01/01/12-00-00/bwi.html") as never, {} as never, () => {});
    expect(s3Mock.calls()).toHaveLength(1);
    const getInput = s3Mock.calls()[0].args[0].input as { Key?: string };
    expect(getInput.Key).toBe(metaKey);
    const putCalls = s3Mock.commandCalls(PutObjectCommand);
    expect(putCalls).toHaveLength(0);
  });

  it("downloads HTML and meta, parses table, and updates meta.json with parsed status", async () => {
    const metaKey = "2025/01/01/12-00-00/meta.json";
    const meta = { prefix: "2025/01/01/12-00-00", startAt: "2025-01-01T12:00:00Z" };
    const html = `
      <table>
        <tr><th>Checkpoint</th><th>General</th><th>Priority</th><th>TSA Pre</th><th>Clear</th></tr>
        <tr><td>A</td><td>1 min</td><td>1 min</td><td>Closed</td><td>Closed</td></tr>
      </table>
    `;
    s3Mock
      .on(GetObjectCommand, { Key: metaKey })
      .resolves({ Body: mockBody(JSON.stringify(meta)) as never })
      .on(GetObjectCommand, { Key: "2025/01/01/12-00-00/bwi.html" })
      .resolves({ Body: mockBody(html) as never });

    await handler(s3Event("2025/01/01/12-00-00/bwi.html") as never, {} as never, () => {});

    const putCalls = s3Mock.commandCalls(PutObjectCommand);
    expect(putCalls).toHaveLength(1);
    const putInput = putCalls[0].args[0].input;
    expect(putInput.Key).toBe(metaKey);
    expect(putInput.ContentType).toBe("application/json");
    const body = JSON.parse(putInput.Body as string) as {
      parseStatus: string;
      securityWaitTable: SecurityWaitRow[];
      parsedStartAt: string;
      parsedEndAt: string;
    };
    expect(body.parseStatus).toBe("parsed");
    expect(body.securityWaitTable).toHaveLength(1);
    expect(body.securityWaitTable[0].checkpoint).toBe("A");
    expect(body.parsedStartAt).toBeDefined();
    expect(body.parsedEndAt).toBeDefined();
  });

  it("updates meta.json with parseStatus failed and parseError when HTML get fails", async () => {
    const metaKey = "2025/01/01/12-00-00/meta.json";
    const meta = { prefix: "2025/01/01/12-00-00" };
    s3Mock
      .on(GetObjectCommand, { Key: metaKey })
      .resolves({ Body: mockBody(JSON.stringify(meta)) as never })
      .on(GetObjectCommand, { Key: "2025/01/01/12-00-00/bwi.html" })
      .rejects(new Error("NoSuchKey"));

    await handler(s3Event("2025/01/01/12-00-00/bwi.html") as never, {} as never, () => {});

    const putCalls = s3Mock.commandCalls(PutObjectCommand);
    expect(putCalls).toHaveLength(1);
    const body = JSON.parse(putCalls[0].args[0].input.Body as string) as {
      parseStatus: string;
      parseError: string;
    };
    expect(body.parseStatus).toBe("failed");
    expect(body.parseError).toContain("NoSuchKey");
  });
});
