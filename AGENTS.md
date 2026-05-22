# AGENTS.md

Agent-facing guide for this repo. For the full picture (deploy, Cloudflare
settings, architecture rationale) read `README.md` — this file is the quick
operational reference plus the rules you must not break.

## What this is

The Rayleigh Stark marketing site: five hand-authored static HTML pages, plus
the marketing tooling that supports it. No framework, no React, no shared
stylesheet. Deployed on Cloudflare Pages.

## Commands

```bash
npm install
npm run dev      # dev server → http://localhost:1234
npm run build    # Parcel build + postbuild → ./dist
npm run preview  # serve ./dist with prod-accurate routing → http://localhost:4321
```

Always `npm run build` before assuming a change is deploy-ready — `postbuild.mjs`
copies static assets and generates `sitemap.xml` / `robots.txt`.

## Layout

| Path | Notes |
|------|-------|
| `index.html` `about.html` `approach.html` `contact.html` `terms.html` | The five pages. Each carries its own inline `<style>` block. |
| `src/images/` | Site images. `.archive/` holds retired assets — not shipped. |
| `brand/` | Logo, favicons, OG image, fonts. Source of brand assets. |
| `scripts/` | Build (`postbuild`, `ensure-head-tags`), capture (`capture-og`, `capture-runtime-pdf`), preview, and lead tooling (`inject-contacts.py`). |
| `prototypes/` | Design iteration history. Not built, not deployed — reference only. |
| `_redirects` `_headers` | Cloudflare Pages routing + headers. Copied to `dist/` by postbuild. |
| `output/` | **Gitignored.** Generated artifacts + the leads booklet, which contains real prospect PII. Never commit anything under `output/`. |

## Editing pages

- CSS is **inline per page** by design — no shared stylesheet. To change a
  page's styling, edit its own `<style>` block. Design tokens are duplicated
  in each block; if you change a token, change it in every page that uses it.
- Design tokens (source of truth):

  ```css
  --ink:#0A0B0E  --paper:#EFEAE0  --accent:#38bdf8  /* single accent */
  --green:#7FE0A6  --amber:#F7B955  /* status colours */
  --muted:rgba(239,234,224,.55)  --line:rgba(255,255,255,.07)
  ```

- Fonts: Inter Tight (display), Inter (body), IBM Plex Mono (metadata/labels).

## Copy & voice rules — non-negotiable

Scan any page you touch against these before finishing:

- **No em dashes anywhere.** Use commas, periods, colons, or restructure. En
  dashes for number ranges are fine.
- **Banned words:** transformation, synergy, leverage, ecosystem, journey,
  end-to-end, holistic, bespoke, white-glove.
- **No future-tense pitching** ("we will", "we can help", "we partner with").
  Present-tense ownership only: we build, we ship, we watch, we run.
- **No multi-industry vocabulary** (industries, sectors, verticals).
- **No prior employer named.** Only "Built on Wall Street" and "a global
  investment bank" are permitted credibility shorthands.
- **No availability statements** ("currently taking on", "open to clients").
- **No hedging** (typically, often, generally, may).
- **Core verbs**, used deliberately: watch, monitor, escalate, surface, intercept.

See `README.md` for the list of permitted acronyms.

## Don't commit

`output/` (PII + artifacts), `dist/`, `node_modules/`, `.parcel-cache/`,
`rayleigh-stark-dist.zip`, `.DS_Store`. All are in `.gitignore` — keep it that
way. Never add prospect data, emails, or contact lists to a tracked file.
