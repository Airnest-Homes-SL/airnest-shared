# Shared_Airnest — Project Instructions

**Workstation: 02_Airnest_HQ** (identity: Luis Navarro, luis@airnest.es)

## Purpose

Public file-sharing surface for Airnest. Anything pushed to this repo is published via GitHub Pages and becomes shareable through a clean URL. Used for ops briefings, integration reports, and any HTML/PDF artifact that needs to be linkable.

**Live URL:** https://airnest-homes-sl.github.io/airnest-shared/

> The published content is **public**. Never push anything containing client PII, guest data, credentials, or commercial figures that shouldn't be public.

## Repo

- **Remote:** https://github.com/Airnest-Homes-SL/airnest-shared (public)
- **Local path:** `02_Airnest_HQ/Projects/Shared_Airnest/` (this directory IS the git repo)
- **Default branch:** `main`
- **Pages source:** `main` branch, root path

## Layout

```
Shared_Airnest/
├── CLAUDE.md         # this file
├── MEMORY.md         # project memory + status
├── Resources/        # internal docs (not served via Pages by name, but DO NOT put secrets here either)
├── index.html        # landing page — "Night Ledger" house style (dark editorial archive)
├── gate.js           # access gate / passcode handling for index
├── *.html            # published artifacts — ops briefings, reports
├── Resources/
│   └── document-template.html  # starting point for every NEW artifact (see House Style)
└── .git/             # git metadata (lives in iCloud — see Risks below)
```

## House Style — "Night Ledger" (since 2026-05-22)

All **new** artifacts use the dark editorial "Night Ledger" style: warm near-black
background, parchment text, ember accent, Instrument Serif display / Hanken Grotesk
body / IBM Plex Mono labels, paper-grain + vignette atmosphere.

- **Start every new document by copying `Resources/document-template.html`** to the repo
  root as `<name>-YYYY-MM-DD.html`, then fill the `{{PLACEHOLDERS}}`.
- The template ships the shared components: `.verdict` (hero callout), `.sec` (section),
  `.item` + `.pill` (risk/action rows), `.callout` (inline note). Delete what's unused.
- Keep `<script src="gate.js">` in the `<head>`.
- **Existing pre-2026-05-22 artifacts keep their old warm-paper style — do not migrate them.**
  The index links both old and new docs; the divergence is accepted.

### index.html authoring

The index is a single flat, newest-first list — no category sections. To list a new doc,
add an `<a class="row">` inside `#archive-body` (above the `Add new documents` comment):

- `data-date="YYYY-MM-DD"` — **required**; drives sort order, auto-numbering, new/stale logic.
- `data-status="completed"` or `"stale"` — optional; default (omit) is active.
- `<span class="row-cat">` — category prefix chip (e.g. `Ops`, `Strategic`, `General`).

Inline JS handles the rest: docs ≤3 days old (`NEW_WINDOW_DAYS`) auto-promote to the
"Latest Additions" band with a `New` tag; everything else falls into the auto-numbered
newest-first list; `completed`/`stale` sink to the bottom.

## How to publish a file

```bash
cd "02_Airnest_HQ/Projects/Shared_Airnest"
cp /path/to/your/file.html .
git add file.html
git commit -m "publish: file.html"
git push
```

Wait ~1–2 minutes for Pages to deploy, then the URL is:

```
https://airnest-homes-sl.github.io/airnest-shared/file.html
```

For PDFs, images (PNG/JPG/SVG), CSV, JSON — same flow, same URL pattern.

## Wired-In Consumers

| Consumer | What it does | File |
|---|---|---|
| Weekly Operations Briefing cron | Auto-publishes weekly briefings every Monday | `02_Airnest_HQ/Projects/Weekly_Operations_Briefing/scripts/cron2-monitor-reply.sh` |

If you change the repo path, name, or remote — update the cron script and any other consumer in the same commit. Grep `airnest-shared` across the workspace before merging structural changes.

## Risks

- **iCloud + `.git/`:** the repo lives inside iCloud Drive. Heavy concurrent writes (e.g. multiple cron jobs at once) can in theory corrupt git internals. The Monday cron runs serialised so this is low-risk, but if you ever see weird `.git/` errors, that's the first suspect.
- **Public visibility:** every file pushed is public. There is no "draft" branch — staging happens locally before commit. The `gate.js` adds a UX gate on `index.html` but does NOT make any individual artifact URL non-discoverable.

## Rules

- Treat every commit as a publish event.
- No client PII, no internal financials, no credentials — even in commits that get reverted (history is permanent).
- Keep `index.html` curated — outdated briefing links rot quickly.
- When adding a new artifact, also add a link to it from `index.html` if it should be discoverable.

## Migration History

- Pre-2026-05-15: lived at `~/airnest-shared/` (outside iCloud) under `CommanderWi11/airnest-shared` (personal GitHub).
- 2026-05-15: migrated into `02_Airnest_HQ/Projects/Shared_Airnest/` and to `Airnest-Homes-SL/airnest-shared`. Old personal repo deleted. Old URL `commanderwi11.github.io/airnest-shared/...` is dead.
