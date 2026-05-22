# Shared_Airnest — Memory

Last reviewed: 2026-05-15

## Status

| Item | Value |
|---|---|
| Phase | **Live** — migrated to org and into HQ |
| Remote | https://github.com/Airnest-Homes-SL/airnest-shared (public) |
| Pages URL | https://airnest-homes-sl.github.io/airnest-shared/ |
| Default branch | `main` |
| Pages source | `main` / root path |

## Currently Published

| File | Purpose | First published |
|---|---|---|
| `index.html` | Landing page — "Night Ledger" dark editorial style | 2026-05-11 redesign; 2026-05-22 Night Ledger restyle |
| `gate.js` | Access gate / passcode for landing page | 2026-05-08 |
| `mews-certification-submission-2026-05-08.html` | Frozen snapshot of Mews cert form submission | 2026-05-08 |
| `mews-integration-report-2026-05-07.html` | CEO status report for Mews integration | 2026-05-07 |
| `ops-briefing-2026-05-08.html` | Weekly ops briefing | 2026-05-08 |
| `ops-briefing-2026-05-11.html` | Weekly ops briefing | 2026-05-11 |
| `poem-go-live-risk-alert-2026-05-22.html` | CEO risk alert for Poem Suites go-live | 2026-05-22 |

## House Style — "Night Ledger" (2026-05-22)

All **new** artifacts use the dark editorial "Night Ledger" style. Full convention is in
`CLAUDE.md` → House Style. Key points:

- New documents start from `Resources/document-template.html` (dark bg, ember accent,
  Instrument Serif / Hanken Grotesk / IBM Plex Mono, grain + vignette).
- Pre-2026-05-22 artifacts keep their old warm-paper style — **not migrated**.
- `index.html` is a flat, newest-first, auto-numbered list (no category sections). Add a
  doc as an `<a class="row">` in `#archive-body` with required `data-date="YYYY-MM-DD"`,
  optional `data-status="completed"|"stale"`, and a `.row-cat` chip. Docs ≤3 days old
  (`NEW_WINDOW_DAYS`) auto-promote to "Latest Additions" with a `New` tag.

## Wired-In Consumers

- **Weekly Operations Briefing cron** (`Weekly_Operations_Briefing/scripts/cron2-monitor-reply.sh`) auto-publishes a new `ops-briefing-YYYY-MM-DD.html` every Monday. If you rename/move this repo or change the remote URL, that script needs the same change in the same commit.

## Decisions

- **Live inside iCloud workspace** — moved 2026-05-15 (previously at `~/airnest-shared/`). Accepted risk: iCloud + `.git/` under cron load. Mitigation: Monday cron is serialised; one commit per week from the script.
- **Org-owned, not personal** — moved from `CommanderWi11/airnest-shared` → `Airnest-Homes-SL/airnest-shared` so the repo belongs to the company, not Luis personally. Push requires `airnest-homes` gh account being active.
- **Public, not private** — Pages on private repos requires GitHub paid plan. Content is non-sensitive (ops briefings, integration reports). PII/financials never published.
- **Old personal repo deleted** — past briefing emails with `commanderwi11.github.io/airnest-shared/...` URLs now 404. Accepted because audience was internal (Luis only).

## Next Actions

- None pending. Repo is operational. Next published artifact will be `ops-briefing-YYYY-MM-DD.html` on next Monday via cron.

## Blockers

- None.

## Timeline

- 2026-05-07: First artifact (`mews-integration-report-2026-05-07.html`) published to old personal repo.
- 2026-05-08: `gate.js` and first ops briefing added.
- 2026-05-11: Index redesign ("warm editorial minimalist") shipped. Second briefing published.
- 2026-05-15: **Migration day.** Moved `~/airnest-shared/` → `02_Airnest_HQ/Projects/Shared_Airnest/`. Remote switched to `Airnest-Homes-SL/airnest-shared` (public). Pages re-enabled at new URL. Cron script + workspace docs updated. Old `CommanderWi11/airnest-shared` deleted.

## Common Mistakes to Avoid

- Don't push anything containing guest names, reservation amounts, owner statements, internal financials, or credentials — even in throwaway commits. History is permanent and public.
- Don't run `gh repo create` or `git push` without first verifying `gh auth status` shows `airnest-homes` as active.
- Don't move or rename this repo without updating `cron2-monitor-reply.sh` in the same change — the briefing system will silently stop publishing.

## Archive

- (none yet)
