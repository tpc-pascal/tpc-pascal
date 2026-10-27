import os
import re
import requests

REPOS_RAW = os.environ.get("REPOS", "").strip()
GH_TOKEN = os.environ.get("GH_TOKEN", "")
OWNER = "tpc-pascal"
README = "README.md"

if not REPOS_RAW:
    print("Error: REPOS is empty")
    exit(1)

repos = [r.strip() for r in REPOS_RAW.split(",") if r.strip()]
if not repos:
    print("Error: no valid repo names")
    exit(1)

headers = {"Authorization": f"token {GH_TOKEN}"} if GH_TOKEN else {}

with open(README, encoding="utf-8") as f:
    content = f.read()

section_marker = "<h2 align=\"left\">Projects</h2>"
snake_marker = '<img src="https://raw.githubusercontent.com/tpc-pascal/tpc-pascal/output/snake.svg" alt="Snake animation" />'

if section_marker not in content:
    print("Error: Projects section not found in README")
    exit(1)

section_start = content.index(section_marker)
section_end = content.index(snake_marker)
section_body = content[section_start:section_end]
table_lines = section_body.split("\n")

separator_idx = None
for i, line in enumerate(table_lines):
    if ":---" in line:
        separator_idx = i
        break

if separator_idx is None:
    print("Error: table separator not found in Projects section")
    exit(1)

existing_repos = set()
for line in table_lines[separator_idx + 1:]:
    stripped = line.strip()
    if stripped.startswith("|") and "github.com" in stripped:
        m = re.search(r"github\.com/" + re.escape(OWNER) + r"/([^\")]+)", stripped)
        if m:
            existing_repos.add(m.group(1))

new_rows = []
for repo in repos:
    if repo in existing_repos:
        print(f"Skipping {repo}: already in table")
        continue

    full_name = f"{OWNER}/{repo}"
    logo_url = f"https://raw.githubusercontent.com/{full_name}/main/assets/logo.svg"

    desc = "No description"
    try:
        r = requests.get(f"https://api.github.com/repos/{full_name}", headers=headers, timeout=10)
        if r.ok:
            desc = (r.json().get("description") or "No description").strip()
        else:
            print(f"Warning: GitHub API returned {r.status_code} for {repo}")
    except requests.RequestException as e:
        print(f"Warning: Cannot reach GitHub API ({e})")

    if desc == "No description":
        try:
            r = requests.get(f"https://raw.githubusercontent.com/{full_name}/main/README.md", timeout=10)
            if r.ok:
                first_line = r.text.strip().split("\n")[0].strip("# ").strip()
                if first_line:
                    desc = first_line
        except requests.RequestException:
            pass

    new_rows.append(f"| <img src=\"{logo_url}\" width=\"100\"> | [**{repo}**](https://github.com/{full_name}) | {desc} |")

if not new_rows:
    print("All repos already in table, nothing to add")
    exit(0)

lines = content.split("\n")
projects_start_line = None
snake_line = None
for i, line in enumerate(lines):
    if section_marker in line:
        projects_start_line = i
    if snake_marker in line:
        snake_line = i
        break

if projects_start_line is None or snake_line is None:
    print("Error: could not find Projects section boundaries")
    exit(1)

insert_line = None
for i in range(projects_start_line, snake_line):
    if ":---" in lines[i]:
        insert_line = i
        break

if insert_line is None:
    print("Error: could not find table separator in Projects section")
    exit(1)

new_content = "\n".join(lines[:insert_line + 1]) + "\n" + "\n".join(new_rows) + "\n" + "\n".join(lines[insert_line + 1:])

with open(README, "w", encoding="utf-8") as f:
    f.write(new_content)

added = ", ".join(r for r in repos if r not in existing_repos)
print(f"Added to README: {added}")
