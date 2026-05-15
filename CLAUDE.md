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
├── index.html        # landing page (warm editorial minimalist design — see git history for redesign)
├── gate.js           # access gate / passcode handling for index
├── *.html            # published artifacts — ops briefings, reports
└── .git/             # git metadata (lives in iCloud — see Risks below)
```

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
