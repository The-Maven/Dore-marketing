#!/usr/bin/env python3
"""Local preview server that emulates Cloudflare Pages.

Reads dist/_redirects and applies the rules so local behaviour matches
production. Same source of truth as the deployed site — no parallel config.
"""
import http.server
import os
import re
import socketserver
import sys
from pathlib import Path

DIST = Path(__file__).parent.parent / "dist"
PORT = int(os.environ.get("PORT", "4321"))


def parse_redirects(path: Path):
    """Returns a list of (compiled regex, destination, status) tuples."""
    if not path.exists():
        return []
    rules = []
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 3:
            continue
        src, dst, status_str = parts[0], parts[1], parts[2]
        try:
            status = int(status_str)
        except ValueError:
            continue
        # Convert glob (*) to regex while escaping the rest of the path.
        pattern = "^" + re.escape(src).replace(r"\*", "(.*)") + "$"
        rules.append((re.compile(pattern), dst, status))
    return rules


class PagesHandler(http.server.SimpleHTTPRequestHandler):
    REDIRECTS = []
    # Bind to an absolute path so rebuilds (rm -rf dist && parcel build) that
    # delete and recreate dist/ don't crash the server with FileNotFoundError
    # on os.getcwd().
    DIRECTORY = str(DIST.resolve())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=self.DIRECTORY, **kwargs)

    def do_GET(self):  # noqa: N802
        path = self.path.split("?", 1)[0]

        # 1. Apply _redirects rules (matches Cloudflare's behaviour)
        for pattern, dst, status in self.REDIRECTS:
            match = pattern.match(path)
            if not match:
                continue
            target = dst
            if ":splat" in dst and match.groups():
                target = dst.replace(":splat", match.group(1))
            if status == 200:
                # internal rewrite — serve the target file, keep the URL
                self.path = target
                return super().do_GET()
            # external redirect
            self.send_response(status)
            self.send_header("Location", target)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return

        # 2. Mirror Cloudflare's folder-as-page behaviour: when /<name> is
        #    requested and /<name>/index.html exists, serve that directly
        #    (rather than Python's default 301 to /<name>/). This keeps clean
        #    URLs in the address bar with no redirect.
        if path != "/" and not path.endswith("/"):
            candidate = os.path.join(self.DIRECTORY, path.lstrip("/"), "index.html")
            if os.path.isfile(candidate):
                self.path = path + "/index.html"
                return super().do_GET()

        return super().do_GET()

    def log_message(self, fmt, *args):  # noqa: N802
        sys.stderr.write(f"  {self.command} {self.path}  →  {args[1] if len(args) > 1 else ''}\n")


def main():
    redirects_path = DIST / "_redirects"
    PagesHandler.REDIRECTS = parse_redirects(redirects_path)
    print(f"[preview] {len(PagesHandler.REDIRECTS)} redirect rules loaded from {redirects_path}")
    if not DIST.exists():
        print(f"[preview] dist/ not found — run `npm run build` first", file=sys.stderr)
        sys.exit(1)
    # Don't chdir — the handler uses an absolute DIRECTORY instead. This way
    # a `rm -rf dist && parcel build` rebuild won't invalidate the server's cwd.
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), PagesHandler) as httpd:
        print(f"[preview] serving http://localhost:{PORT}/ from {DIST}")
        print(f"[preview] mirrors Cloudflare Pages _redirects + _headers behaviour")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[preview] stopped")


if __name__ == "__main__":
    main()
