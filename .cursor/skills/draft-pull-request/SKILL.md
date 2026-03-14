---
name: draft-pull-request
description: Draft pull request titles and descriptions from branch changes, then create a draft PR with gh if none exists. Use when the user asks to draft a PR, write a pull request, summarize changes for a PR, or create a PR description.
---

# Draft Pull Request

Draft PR title and body from the current branch and diff, then use GitHub CLI (`gh`) to create a draft PR if one doesn't already exist. Gather context first, then fill the template, then create.

## Workflow

1. **Gather context**: Branch name, base branch, and the diff (e.g. `git diff main...HEAD` or `git log main..HEAD --oneline`). Read changed files as needed to summarize behavior.
2. **Draft title**: Short, imperative, under ~72 chars. Prefer scope prefix when clear (e.g. `feat(bwi-snapshot): add S3 upload`).
3. **Draft body**: Use the template below. Omit sections that don’t apply.

4. **Check for existing PR**: Run `gh pr view` (or `gh pr list --head "$(git branch --show-current)"`). If a PR already exists for this branch, output the PR URL and the drafted title/body for the user to paste or update manually; do not create a second PR.
5. **Create draft PR if none exists**: Run `gh pr create --draft --title "<title>" --body "<body>"`. For long bodies, use `--body-file` with a temp file. Use the repo's default base branch (e.g. `main`) unless the user specified another. On success, output the new PR URL.

## PR body template

```markdown
## Summary
[1–3 sentences: what this does and why.]

## Changes
- [Bullet list of notable changes, not a full diff.]
- [Call out new files, config, or infra if relevant.]

## Testing
[How to verify: commands run, manual steps, or "N/A" for config-only.]

## Notes
[Optional: breaking changes, follow-up work, deployment considerations.]
```

## Guidelines

- **gh**: Run workflow steps from the repo root. If `gh` is not installed or not authenticated (`gh auth status`), inform the user and still output the drafted title and body.
- **Summary**: Explain outcome and intent; a reviewer should understand the PR without reading every file.
- **Changes**: Focus on what changed from a product or system perspective. Omit trivial formatting.
- **Testing**: Be concrete (e.g. "`pnpm test` in `lambdas/bwi-snapshot`", "Manual: trigger Lambda from console").
- If the branch fixes a ticket, mention it in Summary or Notes (e.g. "Fixes #123" or "Relates to tickets/0001-...").
