# Implement Athena Table for production-bwi-snapshot Metadata

This task involves configuring an Amazon Athena environment to enable efficient SQL querying of JSON metadata files stored in the production-bwi-snapshot S3 bucket. We need to focus specifically on the meta.json files scattered throughout the bucket. To ensure we don't blow the budget on full-bucket scans, the table must be partitioned using a yyyy/mm/dd structure. This will allow the data team and automated agents to perform targeted historical analysis without the overhead of processing unrelated objects.

## Acceptance Criteria

- [ ] A dedicated Glue Data Catalog table is created (e.g., production_bwi_snapshot_metadata) pointing to the production-bwi-snapshot bucket.
- [ ] The table is configured to specifically target meta.json files, ensuring other snapshot artifacts are ignored.
- [ ] Data is partitioned by year (string), month (string), and day (string) to match the S3 key structure.
- [ ] The JSON SerDe correctly maps the internal fields of meta.json (e.g., id, timestamp, status) to SQL columns.
- [ ] A sample query (e.g., SELECT \* FROM snapshot_metadata WHERE year = '2026' LIMIT 10) returns accurate results within expected latency.
- [ ] A plan or script is provided to either run MSCK REPAIR TABLE or utilize a Glue Crawler to discover new daily partitions automatically.

## Notes

- Use org.openx.data.jsonserde.JsonSerDe for better handling of case-insensitive keys and nested structures if the meta.json schema evolves.
- Given the predictable nature of yyyy/mm/dd paths, consider using Partition Projection to bypass the Glue Catalog partition limit and speed up query planning.
- Verify that the Athena execution role has s3:GetLayout and s3:ListBucket permissions for the specific snapshot prefix.
- Ensure the meta.json files are in "JSON Lines" format if they contain multiple records; otherwise, standard JSON parsing applies.
