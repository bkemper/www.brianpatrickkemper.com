# ADR 0001: Node.js HTML parser for BWI snapshot Lambda

## Status

Accepted.

## Context

The BWI snapshot parser Lambda must download HTML from S3 and extract the security wait-times table (Checkpoint, General, Priority, TSA Pre, Clear) to store in `meta.json`. We need a Node.js HTML parser that runs inside AWS Lambda with constraints on bundle size, cold start, and memory.

## Decision

Use **node-html-parser** for parsing snapshot HTML in the parser Lambda.

## Alternatives considered

| Parser | Bundle size (approx) | Parse speed | DOM API | Notes |
|--------|----------------------|-------------|---------|--------|
| **node-html-parser** | ~173 kB | ~2 ms/file | querySelector, querySelectorAll | Smallest; fast; sufficient for table extraction. |
| htmlparser2 | ~306 kB | ~2.4 ms/file | SAX/callback only | No DOM; would need custom traversal. |
| cheerio | ~1.01 MB | ~12 ms/file | jQuery-like | Heavier; overkill for single-table extraction. |
| jsdom | ~3.34 MB | slowest | Full DOM | Too large and slow for Lambda. |
| linkedom | moderate | fast | DOM subset | Good option; node-html-parser is lighter and sufficient. |

## Rationale

- **Size**: Smallest footprint reduces Lambda deployment size and cold-start impact.
- **Performance**: Among the fastest parsers; important when processing full BWI homepage HTML.
- **Capabilities**: Supports CSS selectors (`querySelector` / `querySelectorAll`), which is enough to locate the security wait-times table (e.g. `table` plus validation by header text).
- **Lambda fit**: No native deps; pure JS; low memory use.

## Risks / maintenance

- The **npm package** `node-html-parser` is published from **[taoqf/node-html-parser](https://github.com/taoqf/node-html-parser)** (the original repo). A separate fork at [node-projects/node-html-parser](https://github.com/node-projects/node-html-parser) has low activity; we do not depend on that fork.
- If taoqf’s project becomes unmaintained (e.g. no releases, unfixed security issues), reassess and consider **linkedom** or **cheerio** as drop-in alternatives; both have active maintainers and similar DOM/selector APIs.

## Consequences

- Parser logic uses `parse()` plus `querySelector`/`querySelectorAll`; if BWI changes markup, we may need to adjust the selector (e.g. a more specific class or data attribute).
- If we later need full browser-like behavior (e.g. scripts, iframes), we would re-evaluate cheerio or a different approach.
