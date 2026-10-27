#!/usr/bin/env python3
"""sync_pinned_projects.py — rewrite the README Projects table from GitHub pinned repos.

Source of truth: GraphQL pinnedItems of tpc-pascal.
Rewrites only the block between <!--PINNED:START--> / <!--PINNED:END--> in
README.md (3-column rows with logo).

Prints `changed=true` / `changed=false`. Needs env GH_TOKEN.
"""
import json
import os
import re
import sys
import urllib.error
import urllib.request

OWNER = "tpc-pascal"
GH_TOKEN = os.environ.get("GH_TOKEN", "").strip()
START = "<!--PINNED:START-->"
END = "<!--PINNED:END-->"
TABLE_HEADER = "| Logo | Repo | Description |\n|:---|:---|:---|"

TARGETS = [("README.md", True)]

QUERY = (
    'query { user(login: "%s") { pinnedItems(first: 6, types: REPOSITORY) {'
    " nodes { ... on Repository { name url description } } } } }"
) % OWNER


def fetch_pinned():
    if not GH_TOKEN:
        sys.exit("Error: GH_TOKEN is required")
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": QUERY}).encode(),
        headers={
            "Authorization": f"Bearer {GH_TOKEN}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.load(resp)
    except (urllib.error.URLError, TimeoutError) as e:
        sys.exit(f"Error: cannot reach GitHub GraphQL ({e})")
    if data.get("errors"):
        sys.exit(f"Error: GraphQL returned {data['errors']}")
    nodes = data["data"]["user"]["pinnedItems"]["nodes"]
    return [n for n in nodes if n and n.get("name")]


def logo_url(repo):
    raw = f"https://raw.githubusercontent.com/{OWNER}/{repo}/main/assets/logo.svg"
    try:
        req = urllib.request.Request(raw, method="HEAD")
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                return raw
    except (urllib.error.URLError, TimeoutError):
        pass
    return f"https://github.com/{repo}.png?size=100"


def esc(text):
    return (text or "No description").replace("|", "\\|").replace("\n", " ").strip()


def build_rows(pinned, with_logo):
    rows = []
    for r in pinned:
        name = r["name"]
        link = f"[**{name}**]({r['url']})"
        desc = esc(r.get("description"))
        if with_logo:
            rows.append(f'| <img src="{logo_url(name)}" width="100"> | {link} | {desc} |')
        else:
            rows.append(f"| {link} | {desc} |")
    return rows


def rewrite(path, block):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    if START not in text or END not in text:
        sys.exit(f"Error: markers missing in {path}")
    i = text.index(START) + len(START)
    j = text.index(END, i)
    new_text = text[:i] + "\n" + block + "\n" + text[j:]
    if new_text == text:
        return False
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_text)
    return True


def main():
    pinned = fetch_pinned()
    if not pinned:
        sys.exit("Error: pinned repo list is empty")
    changed = []
    for path, with_logo in TARGETS:
        block = "\n".join([TABLE_HEADER, *build_rows(pinned, with_logo)])
        if rewrite(path, block):
            changed.append(path)
    print("changed=true" if changed else "changed=false")
    for path in changed:
        print(f"updated {path}")


if __name__ == "__main__":
    main()
