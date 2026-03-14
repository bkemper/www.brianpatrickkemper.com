# Add Lambda triggered on new BWI snapshot bucket uploads

Create a Lambda that runs when new objects are added to the BWI snapshot S3 bucket. The Lambda should log or return "hello world" so we can verify the S3 event trigger and wiring before adding real processing logic.

## Acceptance Criteria

- [ ] A new Lambda is defined and deployed that is invoked when objects are created in the BWI snapshot bucket (see `@infra/stacks/bwi-snapshot-stack.ts` for bucket and stack)
- [ ] The Lambda handles S3 event notifications (e.g. `ObjectCreated:Put`) and responds with or logs "hello world"
- [ ] Lambda is wired in CDK with an S3 event source on the existing `BwiSnapshotBucket` in `@infra/stacks/bwi-snapshot-stack.ts`
- [ ] Deploy succeeds and a test upload to the bucket results in "hello world" appearing in the Lambda’s logs or response

## Notes

- BWI snapshot bucket is `BwiSnapshotBucket` in `@infra/stacks/bwi-snapshot-stack.ts`; consider adding the new Lambda and S3 notification in the same stack or a sibling stack in `@infra/`
- Follow existing Lambda patterns in this repo (e.g. `@lambdas/bwi-snapshot/` for structure; new handler can be minimal Node/TypeScript or preferred runtime)
- This ticket is a stepping stone for future processing of new snapshot files; keep the handler small and focused
