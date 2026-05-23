# Rayleigh Stark · Website

Always-on monitoring for institutional books. Risk, exposures, news, operational
events. Policy-bound escalation when something needs human eyes. Built on Wall Street.

---

## Stack

- **Static HTML** — six hand-authored pages. No React, no framework.
- **Parcel** — handles HTML processing, CSS bundling, dev server, and production
  minification.
- **Cloudflare Pages** — hosting, redirects, headers, edge cache, DDoS.

Total dependencies: one (`parcel`). The site is intentionally not a framework app.

## Pages

| Path | File | Purpose |
|------|------|---------|
| `/` | `index.html` | Homepage. Hero, two offers, four pillars, credibility, four use cases, contact. |
| `/approach` | `approach.html` | How an engagement runs from diagnostic to first agent to handover. |
| `/about` | `about.html` | Anthony Kwawu, founder. Avatar + bio + what got shipped. |
| `/products` | `products.html` | Doré as the flagship product. Hermes runtime. Three engagement models. Screenshot slots for the analyze + compendium + analyst views. |
| `/contact` | `contact.html` | One-line note + email. |
| `/terms` | `terms.html` | Site terms in five sections. |

Four navigation items appear on every page: **Approach · About · Products ·
Contact**, plus the **See use cases** CTA button. The trading-name and Terms
link sit in the footer of every page.

### Products page — image assets

The Products page reserves three figure slots for product screenshots; until
the PNGs land, each slot renders a labelled placeholder so layout is intact.
Drop these files into `src/images/` and the placeholders take over with no
CSS change:

| Slot | File | Recommended size | Caption shown beneath |
|------|------|------------------|-----------------------|
| Doré analyze view | `src/images/dore-analyze.png` | 1600×900 | "Doré, attestation analysis · multi-chain corroboration in view, every figure traceable." |
| Doré Compendium | `src/images/dore-compendium.png` | 1600×900 | "The Compendium · what the data layer is doing, in plain view, refreshed live." |
| Analyst console | `src/images/dore-analyst.png` | 1600×900 | "Hermes, the analyst · cited answers from the verified fact store, never a number it cannot trace." |

## Develop

```bash
npm install
npm run dev          # → http://localhost:1234
```

## Build

```bash
npm run build        # → ./dist
npm run preview      # → http://localhost:4321
```

The build script:

1. Runs Parcel on the five HTML entry points.
2. Calls `scripts/postbuild.mjs`, which copies static assets (`favicon.svg`,
   `og-image.png`, `_headers`, `_redirects`, `src/images/*`), then generates
   `dist/sitemap.xml` and `dist/robots.txt`.

The preview script (`scripts/preview.py`) reads `dist/_redirects` directly so
local routing behaviour mirrors Cloudflare Pages exactly. Clean URLs
(`/about`, `/contact`, etc.) work, trailing-slash variants 301, and legacy
service URLs 301 to `/` — same as production.

## Brand & voice rules

These are enforced in copy across every page. If you add or edit a page, scan
it against these rules before shipping.

- **No em dashes anywhere.** Commas, periods, colons, or restructured sentences.
  En dashes for number ranges are fine.
- **No transformation, synergy, leverage, ecosystem, journey, end-to-end,
  holistic, bespoke, white-glove.**
- **No future-tense pitching** (we will, we can help, we partner with). Present
  tense ownership only (we build, we ship, we watch, we run).
- **No multi-industry vocabulary** (industries, sectors, verticals).
- **No prior employer name** (Goldman Sachs, NatWest Boxed, or any specific
  bank). "Built on Wall Street" and "a global investment bank" are the only
  permitted credibility shorthands.
- **No availability statements** ("currently taking on", "open to new clients").
- **No hedging** (typically, often, generally, may).
- **Core verbs:** watch, monitor, escalate, surface, intercept. Used deliberately
  and consistently when describing the work.

Acronyms permitted where they earn their place:
FCA, MLRO, Section 166, MiCA, BCBS 239, SR 11-7, SEPA, FPS, FedNow, RTP, ACH,
SWIFT gpi, NIST AI RMF.

## Design system

The CSS is inline per-page (intentionally — no shared stylesheet to keep each
page self-contained and fast). Tokens are duplicated in each `<style>` block.
Source of truth:

```css
--ink:        #0A0B0E   /* page background */
--paper:      #EFEAE0   /* primary text */
--muted:      rgba(239,234,224,.55)
--muted-2:    rgba(239,234,224,.38)
--line:       rgba(255,255,255,.07)
--line-strong:rgba(255,255,255,.16)
--accent:     #38bdf8   /* sky blue — single accent */
--green:      #7FE0A6   /* status: live / OK */
--amber:      #F7B955   /* status: warning */
```

Fonts (Google Fonts CDN):
- **Inter Tight** — display
- **Inter** — body
- **IBM Plex Mono** — metadata, status, code-feel labels

## Architecture decisions

- **No shared CSS file.** Each page carries its own `<style>` block. Avoids
  cascade bugs when one page evolves, keeps each page a single network request,
  and makes the markup readable without a separate context.
- **No React.** Five small pages. No client state. No SPA navigation. Plain HTML
  + a sticky nav. Loads under 100KB per page including the avatar.
- **Avatar served at original resolution.** `object-position` and `object-fit`
  in CSS handle cropping. No image transformation pipeline.
- **Clean URLs via `_redirects`.** `/approach` rewrites to `/approach.html`
  (status 200, not 301) so the URL bar stays clean.

## Deploy

The site is on **Cloudflare Pages**. Push to `main`:

```bash
git push origin main
```

Cloudflare picks up the push, runs `npm run build`, deploys `dist/`. Preview
deployments are auto-created for every non-`main` branch.

### Cloudflare Pages dashboard settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repo root) |
| Node version | `20` (pinned via `.nvmrc`) |
| Framework preset | `None` |

### Redirects + headers

- `_redirects` — clean URL rewrites + legacy 301s for cut service pages.
- `_headers` — long-cache for static assets, short-cache + security headers
  for HTML. Includes HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy.

Both files live in the repo root and are copied to `dist/` by the postbuild
script.

### Custom domain

`rayleighstark.com` points at the Cloudflare Pages project via CNAME/ALIAS.
Cloudflare manages the TLS cert automatically.

## Inboxes & legacy links

`_redirects` 301s every old service URL (`/service-*`, `/case-study-*`,
`/operator-notes`, `/manifesto`, `/digital-assets-infrastructure`,
`/payments-infrastructure`, `/platform-reliability`) to `/`. The wedge changed.

## Prototypes & history

`prototypes/` holds the design iteration history (v1 terminal, v2 editorial,
v2 systems, v3 — selected). Not built, not deployed, kept for reference.

## License

Rayleigh Stark is a trading name of Premium Services & Network UK Ltd.
All content © Rayleigh Stark.
