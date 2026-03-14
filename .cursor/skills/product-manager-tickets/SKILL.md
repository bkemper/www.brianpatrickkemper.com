---
name: product-manager-tickets
description: Apply product management best practices when creating or refining tickets. Use when the user asks to create a ticket, draft a ticket, write a user story, or when working with tickets/ in this repo.
---

# Product Manager Ticket Agent

Apply PM best practices when creating tickets. Use the template at `tickets/0000-template.md` as the base structure. Each ticket lives in `tickets/` with filename `NNNN-slug.md` (e.g. `0001-upgrade-nextjs.md`).

## Structure

Follow this structure for every ticket:

```markdown
# [Brief title describing the task]

One-paragraph description of what needs to be done and why it matters.

## Acceptance Criteria

- [ ] Criterion 1: Observable, testable outcome
- [ ] Criterion 2: Another measurable result
- [ ] Criterion 3: Include file refs when relevant (e.g. `@web/app/api/me/route.ts`)

## Notes

- Context, constraints, or decisions the agent should know
- Links to docs, prior tickets, or design references
- Dependencies or sequencing
```

## INVEST Principles

Apply INVEST when drafting tickets:

| Principle | Guidance |
|-----------|----------|
| **Independent** | Ticket can be done without waiting on others; minimize coupling. Split if tightly dependent. |
| **Negotiable** | Leave room for discussion; avoid over-specifying implementation unless required. |
| **Valuable** | State why it matters (user value, business value, tech debt payoff) in the description. |
| **Estimable** | Provide enough context (AC, notes, refs) that scope is clear. |
| **Small** | Aim for completable in one session; if large, suggest breaking into sub-tickets. |
| **Testable** | Every acceptance criterion must be observable and verifiable (no vague "works correctly"). |

## Acceptance Criteria Rules

- Each criterion is a **checklist item** with `- [ ]`.
- Write as **outcomes**, not implementation steps: "User can export CSV" not "Add export button."
- Be **specific**: "`pnpm build` succeeds with no warnings" not "build works."
- Use **`@path` refs** for files or dirs the agent should touch (e.g. `@web/package.json`, `@lambdas/bwi-snapshot/`).
- Include **non-functional** requirements when relevant (perf, a11y, SEO, security).

## Notes Section

Use Notes for:

- Links to prior tickets, docs, or design references
- Dependencies ("blocked by NNNN-other-ticket")
- Sequencing ("Do this before NNNN-deployment")
- Constraints or decisions the agent should respect

## User Stories (Optional)

For feature work, the description can follow user-story format:

> As a [role], I want [goal] so that [outcome].

Example:

> As a logged-in user, I want to export my data as CSV so that I can analyze it offline.

## Example (Complete)

```markdown
# Add CSV export for dashboard data

As a logged-in user, I want to export my dashboard data as CSV so that I can analyze it offline. Export should work from the main dashboard view and respect current filters.

## Acceptance Criteria

- [ ] Export button appears on dashboard when user has data (see `@web/app/dashboard/page.tsx`)
- [ ] Clicking export downloads a CSV with columns: date, metric, value
- [ ] CSV reflects current date range and filters
- [ ] Export handles empty state without error
- [ ] File size remains reasonable for datasets up to 10k rows

## Notes

- Use browser File API or similar; avoid server round-trip per guidance in tickets/0002-api-budget.md
- Design mock: [Figma link]
```

## Checklist Before Submitting

- [ ] Title is concrete and action-oriented
- [ ] Description explains what and why
- [ ] All AC items are testable and outcome-focused
- [ ] `@path` refs point to relevant files/dirs
- [ ] Notes cover dependencies, links, and constraints
- [ ] Ticket passes INVEST (especially Independent, Small, Testable)
