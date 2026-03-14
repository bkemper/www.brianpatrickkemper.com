# Ticket Template (for AI agents)

Copy this template when creating new tickets. Replace placeholders with concrete details. Use `@path` refs to point agents at relevant files (e.g. `@web/`, `@lambdas/bwi-snapshot/`).

---

# [Brief title describing the task]

One-paragraph description of what needs to be done and why it matters.

## Acceptance Criteria

- [ ] Criterion 1: Observable, testable outcome
- [ ] Criterion 2: Another measurable result
- [ ] Criterion 3: Include file refs when relevant (e.g. `@web/app/api/me/route.ts`)

## Notes

- Context, constraints, or decisions the agent should know
- Links to docs, prior tickets, or design references
- Dependencies or sequencing (e.g. "blocked by X")

---

## Example (filled out)

# Upgrade Next.js to 16.1 in web package

Upgrade the web app to Next.js 16.1 to pick up performance improvements and security patches. The upgrade path from the current version is straightforward per the migration guide.

## Acceptance Criteria

- [ ] `@web/package.json` uses Next.js 16.1
- [ ] `pnpm dev` and `pnpm build` succeed in @web
- [ ] No new deprecation warnings in the build output

## Notes

- See tickets/0001-upgrade-nextjs.md for prior attempt
- Follow the [Next.js upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- Run locally before deploying
