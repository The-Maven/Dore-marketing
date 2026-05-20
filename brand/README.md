# Rayleigh Stark · Brand assets

Logos and favicons. All built from `logo.html` so they stay in sync with the
nav brand-mark.

## What's in here

| File | Size | Use |
|------|------|-----|
| **`rs-logo-400-dark.png`** | 400×400 | **LinkedIn company logo.** Upload this. |
| `rs-logo-400-dark-dot.png` | 400×400 | LinkedIn variant with the sky-blue accent dot. |
| `rs-logo-1200-dark.png` | 1200×1200 | Press kit / hi-res, dark background. |
| `rs-logo-1200-dark-dot.png` | 1200×1200 | Hi-res with accent dot. |
| `rs-logo-1200-light.png` | 1200×1200 | For light backgrounds (decks, PDFs, white pages). |
| `rs-logo-1200-transparent.png` | 1200×1200 | Transparent background, paper-colored marks. |
| **`og-image.png`** | 1200×630 | **Social preview card** (Twitter, LinkedIn, iMessage). Also at site root. |
| `apple-touch-icon.png` | 180×180 | iOS home screen icon (also at site root). |
| `favicon-32.png` | 32×32 | Browser tab favicon (also at site root). |
| `favicon-192.png` | 192×192 | Android home screen (also at site root). |
| `favicon-512.png` | 512×512 | High-DPI favicon (also at site root). |

The OG image is rendered from `og-image.html` (same renderer pattern as the
logo). Open it in a browser to preview, then screenshot at 1200×630 to
regenerate.

## Design

Two elements: a square frame and "RS" inside it.

- **Square** — 86.6% of canvas (centered with ~6.7% margin per side). Border
  weight is 2.5% of canvas. Color: paper `#EFEAE0` on dark, ink `#0A0B0E` on light.
- **RS** — IBM Plex Mono SemiBold (weight 600), 46% of canvas font-size,
  slight negative tracking (-1% of size). Same color as the border.
- **Accent dot (optional)** — sky blue `#38bdf8` with a soft glow, top-right
  corner, 5.5% diameter. Used only on the variants ending in `-dot`.

The square+mark proportions match the nav `brand-mark` element on the live site,
just scaled up.

## LinkedIn upload notes

LinkedIn company logo:
- Use **`rs-logo-400-dark.png`** (or `-dot` if you want the accent).
- Recommended size on LinkedIn: 400×400. Square, PNG, well under their 4MB limit.
- LinkedIn renders the logo as a square in the header and a small circle in
  feed cards. The design is centered with margin so circle-cropping is safe.

## Regenerating

Edit `logo.html`, then run the screenshot loop. Chrome headless required.

```bash
# from this directory
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --default-background-color=00000000 --virtual-time-budget=4000 \
  --window-size=400,400 \
  --screenshot=rs-logo-400-dark.png \
  "file://$PWD/logo.html?size=400&bg=dark&dot=0"
```

Available query params: `size` (px), `bg` (dark|light|transparent), `dot` (0|1).

## Font

IBM Plex Mono SemiBold (weight 600), latin subset, embedded into `logo.html`
as a base64 woff2. No network dependency at render time. Source file at
`plex-mono-600-latin.woff2`.
