#!/usr/bin/env python3
"""
Inject contact-paths blocks into the leads booklet.

Reads:
  output/leads/contacts.json  (50 records, in lead order)
  output/leads-booklet.html

Both inputs live under output/, which is gitignored: it holds prospect PII
and is never committed. Run from anywhere; paths resolve relative to the repo.

Each contact record has the shape:
{
  "lead_id": "US · 01 · ISSUER",          # exact match against <span class="lead-id">
  "company": "Circle Internet Group",
  "person": "Mandeep Walia",
  "linkedin": "https://linkedin.com/in/..." | null,
  "x_handle": "@handle" | null,
  "email": "verified@company.com" | null,
  "email_pattern": "first.last@company.com" | null,
  "general_contact": "press@company.com" | null,
  "warm_intro": {"vector": "...", "url": "..."} | null,
  "office_hq": "Street, City" | null,
  "notes": "..." | null
}

Writes the contact block right before each <div class="lead-outreach"> of the matching card.
"""
import json, re, sys, html
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "output" / "leads-booklet.html"
DATA = ROOT / "output" / "leads" / "contacts.json"

def esc(s):
    if s is None: return ""
    return html.escape(str(s), quote=True)

def linkedin_label(url):
    if not url: return None
    m = re.search(r"linkedin\.com/in/([^/?]+)", url)
    return f"linkedin.com/in/{m.group(1)}" if m else url

def x_url(handle):
    if not handle: return None
    h = handle.lstrip("@")
    return f"https://x.com/{h}"

def render_contact_block(c):
    rows = []

    # LinkedIn
    if c.get("linkedin"):
        label = linkedin_label(c["linkedin"])
        rows.append(("LinkedIn", f'<a href="{esc(c["linkedin"])}" rel="noopener">{esc(label)} ↗</a>'))
    else:
        rows.append(("LinkedIn", '<span class="empty">not located</span>'))

    # X
    if c.get("x_handle"):
        rows.append(("X", f'<a href="{esc(x_url(c["x_handle"]))}" rel="noopener">{esc(c["x_handle"])}</a>'))

    # Email — verified takes priority
    if c.get("email"):
        rows.append(("Email", f'<a href="mailto:{esc(c["email"])}">{esc(c["email"])}</a><span class="verified">verified</span>'))
    elif c.get("email_pattern"):
        rows.append(("Email", f'{esc(c["email_pattern"])}<span class="pat">pattern</span>'))
    else:
        rows.append(("Email", '<span class="empty">not located</span>'))

    # General
    if c.get("general_contact"):
        rows.append(("General", f'<a href="mailto:{esc(c["general_contact"])}">{esc(c["general_contact"])}</a>'))

    # Warm intro
    if c.get("warm_intro") and (c["warm_intro"].get("vector") or c["warm_intro"].get("url")):
        wi = c["warm_intro"]
        if wi.get("url") and wi.get("vector"):
            rows.append(("Warm-in", f'<span class="warm">{esc(wi["vector"])} <a href="{esc(wi["url"])}" rel="noopener">↗</a></span>'))
        elif wi.get("vector"):
            rows.append(("Warm-in", f'<span class="warm">{esc(wi["vector"])}</span>'))

    # HQ
    if c.get("office_hq"):
        rows.append(("HQ", f'{esc(c["office_hq"])}'))

    # Notes
    if c.get("notes"):
        rows.append(("Notes", f'<span class="warm">{esc(c["notes"])}</span>'))

    dl = "".join(f'<dt>{esc(label)}</dt><dd>{val}</dd>' for label, val in rows)
    return (
        '<div class="lead-contact">\n'
        f'      <div class="lead-contact-label">Contact paths</div>\n'
        f'      <dl>{dl}</dl>\n'
        '    </div>\n    '
    )

def main():
    contacts = json.loads(DATA.read_text())
    book = OUT.read_text()

    inserted = 0
    skipped = []

    for c in contacts:
        lid = c["lead_id"]
        # Anchor: find the article block containing the matching lead-id,
        # then insert the contact block before its <div class="lead-outreach"> tag.
        article_re = re.compile(
            r'(<span class="lead-id">' + re.escape(lid) + r'</span>.*?)(<div class="lead-outreach">)',
            re.DOTALL,
        )
        block = render_contact_block(c)
        new_book, n = article_re.subn(r'\1' + block.replace('\\', r'\\') + r'\2', book, count=1)
        if n == 0:
            skipped.append(lid)
            continue
        book = new_book
        inserted += 1

    OUT.write_text(book)
    print(f"Inserted contact blocks for {inserted}/{len(contacts)} leads.")
    if skipped:
        print("SKIPPED:", skipped)

if __name__ == "__main__":
    main()
