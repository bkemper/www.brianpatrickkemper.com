# Parse Fetched HTML For Security Wait Data

Add functionality to the `BwiSnapshotParserFn` Lambda to download and parse the fetched HTML for the security wait data and store in the meta.json.

## Acceptance Criteria

- [ ] Compile a list of Node.js HTML parsers, compare them based on size, capabilities, and performance, select the best for running in an AWS Lambda, and document as an architectural decision record (ADR) in `adrs` directory
- [ ] Add a guard clause to exit if the event is either missing a key or the key is not an HTML file
- [ ] Download and parse the related `meta.json` file (should be in the same directory)
- [ ] Add a guard clause to exit if the `parseStatus === "parsed"`
- [ ] Download and parse the HTML file for ".<insert CSS selector>" table data
- [ ] Update the `meta.json` file with table data, `parseStatus === "parsed"`, `parsedStartAt`, and `parsedEndAt`, or if it fails, `parseStatus === "failed"` and a `parseError`
- [ ] Write unit tests

## Notes

- Consider use AWS EventBridge to better handle errors and allow for retries
