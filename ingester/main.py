#!/usr/bin/env python3
"""
CSI Nor-Cal Google Photos Album Ingester

Launches a headed Chromium browser with a persistent profile, navigates to
Google Photos albums, scrapes all albums, and merges new entries into
output/photos.json — preserving any existing album data.

Usage (inside container):
    make run

Usage (from host):
    make ingest
"""

import json
import re
import time
from pathlib import Path

from playwright.sync_api import Page, sync_playwright

PROFILE_DIR = Path(__file__).parent / "playwright-profile"
OUTPUT_FILE = Path(__file__).parent / "output" / "photos.json"
COVERS_DIR = Path(__file__).parent / "output" / "covers"
ALBUMS_URL = "https://photos.google.com/albums"


# ── Persistence ──────────────────────────────────────────────────────────────

def load_existing() -> dict[str, dict]:
    if OUTPUT_FILE.exists():
        data = json.loads(OUTPUT_FILE.read_text())
        print(f"  Loaded {len(data)} existing album(s) from {OUTPUT_FILE}")
        return {a["albumUrl"]: a for a in data}
    return {}


def save(albums_by_url: dict[str, dict]):
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(list(albums_by_url.values()), indent=2, ensure_ascii=False)
    )


# ── Browser helpers ───────────────────────────────────────────────────────────

def ensure_logged_in(page: Page):
    time.sleep(2)
    if "accounts.google.com" in page.url:
        print()
        print("  Please log in to Google in the browser window.")
        print("  Press Enter here once you can see your Google Photos albums...")
        input()
        page.goto(ALBUMS_URL)
        page.wait_for_load_state("networkidle", timeout=20_000)


def scroll_to_end(page: Page):
    print("  Scrolling to load all albums...")
    prev_height = 0
    stale = 0
    while stale < 3:
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)
        height: int = page.evaluate("document.body.scrollHeight")
        if height == prev_height:
            stale += 1
        else:
            stale = 0
            prev_height = height


# ── Scraping ──────────────────────────────────────────────────────────────────

def extract_cover_url(img_src: str) -> str:
    """Strip Google's resize suffix and request a decent-resolution version."""
    if "google.com" in img_src and "=" in img_src:
        return img_src.split("=")[0] + "=w800"
    return img_src


def slugify(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")



def scrape_albums(page: Page) -> list[dict]:
    page.wait_for_load_state("networkidle", timeout=20_000)
    ensure_logged_in(page)
    scroll_to_end(page)

    # ── Pass 1: collect all card data before any navigation ───────────────────
    seen_hrefs: set[str] = set()
    raw: list[dict] = []

    cards = page.query_selector_all('a[href*="share/AF1Qip"]')
    print(f"  Found {len(cards)} album card(s)")

    for card in cards:
        href = card.get_attribute("href") or ""
        if not href or href in seen_hrefs:
            continue
        seen_hrefs.add(href)

        if href.startswith("http"):
            album_url = href
        elif href.startswith("./"):
            album_url = f"https://photos.google.com/{href[2:]}"
        else:
            album_url = f"https://photos.google.com{href}"

        # Title: aria-label on the <a> is most reliable
        title = (card.get_attribute("aria-label") or "").strip()
        title = re.sub(r"\s+\d+\s+items.*$", "", title).strip()
        if not title:
            for el in card.query_selector_all("div, span"):
                t = re.sub(r"\s+\d+\s+items.*$", "", (el.inner_text() or "")).strip()
                if t:
                    title = t
                    break
        title = title or "Untitled"

        # Date: second distinct text node inside the card
        texts = []
        for el in card.query_selector_all("div, span"):
            t = (el.inner_text() or "").strip()
            if t and t not in texts:
                texts.append(t)
        date = texts[1] if len(texts) > 1 else ""

        # Cover: grab from the card thumbnail (authenticated URL)
        # App falls back to placeholder icon via onError if not accessible
        cover_url = ""
        img = card.query_selector("img")
        if img:
            src = img.get_attribute("src") or ""
            cover_url = extract_cover_url(src)
        if not cover_url:
            bg_el = card.query_selector("div[style*='background-image']")
            if bg_el:
                style = bg_el.get_attribute("style") or ""
                m = re.search(r'url\("?([^")]+)"?\)', style)
                if m:
                    cover_url = extract_cover_url(m.group(1))

        raw.append({"album_url": album_url, "title": title, "date": date, "cover_url": cover_url})

    # ── Pass 2: resolve untitled albums by visiting their page ────────────────
    albums: list[dict] = []
    untitled_urls = [r["album_url"] for r in raw if r["title"] == "Untitled"]
    if untitled_urls:
        print(f"  Resolving {len(untitled_urls)} untitled album(s)...")
    title_cache: dict[str, str] = {}
    for url in untitled_urls:
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=15_000)
            t = page.title().replace(" - Google Photos", "").strip()
            if t:
                title_cache[url] = t
        except Exception:
            pass
    if untitled_urls:
        page.goto(ALBUMS_URL, wait_until="domcontentloaded", timeout=15_000)

    for item in raw:
        title = title_cache.get(item["album_url"], item["title"])
        albums.append({
            "id": slugify(title),
            "title": title,
            "albumUrl": item["album_url"],
            "coverUrl": item["cover_url"],
            "date": item["date"],
        })

    return albums


# ── Cover download ────────────────────────────────────────────────────────────

def download_covers(page: Page, albums: list[dict]) -> list[dict]:
    """Download cover images via the authenticated browser session and rewrite coverUrl to a local path."""
    COVERS_DIR.mkdir(parents=True, exist_ok=True)

    for album in albums:
        remote_url = album.get("coverUrl") or ""
        if not remote_url:
            continue

        album_id = album["id"]
        local_file = COVERS_DIR / f"{album_id}.jpg"

        # Skip if already downloaded
        if local_file.exists():
            album["coverUrl"] = f"covers/{album_id}.jpg"
            continue

        try:
            response = page.request.get(remote_url, timeout=15_000)
            if response.ok:
                local_file.write_bytes(response.body())
                album["coverUrl"] = f"covers/{album_id}.jpg"
                print(f"  Downloaded cover: {album_id}.jpg")
            else:
                print(f"  Warning: cover fetch failed for {album_id} (HTTP {response.status})")
        except Exception as e:
            print(f"  Warning: cover fetch error for {album_id}: {e}")

    return albums


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    existing = load_existing()

    print("\nLaunching browser...")
    with sync_playwright() as p:
        context = p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            headless=False,
            channel="chrome",
            args=[
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-blink-features=AutomationControlled",
            ],
            ignore_default_args=["--enable-automation"],
        )
        page = context.pages[0] if context.pages else context.new_page()
        page.goto(ALBUMS_URL)

        scraped = scrape_albums(page)

        print("\nDownloading cover images...")
        scraped = download_covers(page, scraped)

        context.close()

    # Merge: add new albums; update cover if it's still a remote URL
    added = 0
    for album in scraped:
        url = album["albumUrl"]
        if url not in existing:
            existing[url] = album
            added += 1
        else:
            # Always refresh cover to local path if we now have one
            if album["coverUrl"].startswith("covers/"):
                existing[url]["coverUrl"] = album["coverUrl"]
            elif not existing[url].get("coverUrl", "").startswith("covers/"):
                existing[url]["coverUrl"] = album["coverUrl"]

    save(existing)

    print()
    print("✓ Done!")
    print(f"  {added} new album(s) added")
    print(f"  {len(existing) - added} existing album(s) preserved")
    print(f"  Total: {len(existing)} album(s)")
    print(f"  Output: {OUTPUT_FILE}")
    print()
    print("  Copy to app:")
    print("    cp output/photos.json ../src/data/photos.json")
    print("    cp -r output/covers ../public/album-covers")


if __name__ == "__main__":
    main()
