#!/usr/bin/env python3
"""Render the terminal-style profile cards from live GitHub data.

Outputs:
  assets/contributions.svg  - animated contribution heatmap
  assets/whoami.svg         - ASCII avatar + streak / activity stats

Env:
  GH_USER   GitHub login (default: simonflavian)
  GH_TOKEN  token for the GraphQL API (GITHUB_TOKEN works in Actions)
"""
import bisect
import calendar
import datetime as dt
import io
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from html import escape
from pathlib import Path

from PIL import Image, ImageFilter

USER = os.environ.get("GH_USER", "simonflavian")
TOKEN = os.environ["GH_TOKEN"]
OUT = Path(__file__).resolve().parent.parent / "assets"

# GitHub dark palette
BG, PANEL, BORDER = "#0d1117", "#161b22", "#30363d"
TEXT, MUTED, ACCENT = "#e6edf3", "#7d8590", "#3fb950"
LEVELS = ["#1b222c", "#0e4429", "#006d32", "#26a641", "#39d353"]
FONT = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono',monospace"

QUERY = """
query($login: String!) {
  user(login: $login) {
    login name avatarUrl
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}"""


def fetch():
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": QUERY, "variables": {"login": USER}}).encode(),
        headers={"Authorization": f"bearer {TOKEN}", "User-Agent": USER},
    )
    for attempt in range(5):  # the contributions query 502s now and then
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                body = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code < 500 or attempt == 4:
                raise
            time.sleep(10 * (attempt + 1))
    if "errors" in body:
        raise SystemExit(body["errors"])
    return body["data"]["user"]


def rest(path):
    req = urllib.request.Request(
        "https://api.github.com" + path,
        headers={"Authorization": f"bearer {TOKEN}", "User-Agent": USER, "Accept": "application/vnd.github+json"},
    )
    for _ in range(5):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                time.sleep(2.1)  # search API allows 30 requests / minute
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code not in (403, 429):
                raise
            reset = int(e.headers.get("X-RateLimit-Reset", time.time() + 60))
            time.sleep(max(5, reset - time.time() + 1))
    raise SystemExit(f"rate limited on {path}")


def commit_counts(start, end):
    """Commits authored per day, from every repo the token can read.

    The public calendar hides private-repo work unless GitHub's "private
    contributions" toggle has propagated; commit search with a token that
    can read those repos sees it directly.
    """
    days, seen = {}, set()

    def window(a, b):
        q = urllib.parse.quote(f"author:{USER} author-date:{a.isoformat()}..{b.isoformat()}")
        first = rest(f"/search/commits?q={q}&per_page=100&page=1")
        if first["total_count"] > 1000 and a < b:  # search caps at 1000 results
            mid = a + (b - a) / 2
            window(a, mid)
            window(mid + dt.timedelta(days=1), b)
            return
        page, items = 1, first["items"]
        while True:
            for c in items:
                if c["sha"] in seen:
                    continue
                seen.add(c["sha"])
                day = c["commit"]["author"]["date"][:10]  # author's local date
                days[day] = days.get(day, 0) + 1
            if len(items) < 100 or page * 100 >= first["total_count"]:
                return
            page += 1
            items = rest(f"/search/commits?q={q}&per_page=100&page={page}")["items"]

    a = start
    while a <= end:
        b = min(end, (a.replace(day=1) + dt.timedelta(days=32)).replace(day=1) - dt.timedelta(days=1))
        window(a, b)
        a = b + dt.timedelta(days=1)
    return days


def merge_commits(weeks):
    """Fold commit counts into the calendar and re-derive the colour levels."""
    days = [d for wk in weeks for d in wk["contributionDays"]]
    commits = commit_counts(dt.date.fromisoformat(days[0]["date"]), dt.date.fromisoformat(days[-1]["date"]))
    for d in days:
        # max(), not sum: the calendar already includes the public commits.
        d["contributionCount"] = max(d["contributionCount"], commits.get(d["date"], 0))
    nonzero = sorted(d["contributionCount"] for d in days if d["contributionCount"])
    if not nonzero:
        return
    q = [nonzero[int(len(nonzero) * f)] for f in (.25, .5, .75)]
    for d in days:
        n = d["contributionCount"]
        d["level"] = 0 if not n else 1 + sum(n > t for t in q)


def fmt_day(d):
    return f"{calendar.month_abbr[d.month]} {d.day}"


def fmt_range(r):
    if not r:
        return None
    return fmt_day(r[0]) if r[0] == r[1] else f"{fmt_day(r[0])} – {fmt_day(r[1])}"


def stats(days):
    today = dt.date.fromisoformat(days[-1]["date"])
    counts = [(dt.date.fromisoformat(d["date"]), d["contributionCount"]) for d in days]

    longest, run, run_start, best_range = 0, 0, None, None
    for day, c in counts:
        if c:
            run_start = run_start if run else day
            run += 1
            if run > longest:
                longest, best_range = run, (run_start, day)
        else:
            run = 0

    # Current streak survives a quiet "today" (the day isn't over yet).
    i = len(counts) - 1
    if counts[i][1] == 0:
        i -= 1
    cur, cur_end = 0, counts[i][0] if i >= 0 else today
    while i >= 0 and counts[i][1]:
        cur += 1
        i -= 1
    cur_range = (cur_end - dt.timedelta(days=cur - 1), cur_end) if cur else None

    active = sum(1 for _, c in counts if c)
    total = sum(c for _, c in counts)
    best_day, best = max(counts, key=lambda x: x[1])

    months = []
    y, m = today.year, today.month
    for _ in range(12):
        months.append((y, m))
        y, m = (y, m - 1) if m > 1 else (y - 1, 12)
    months.reverse()
    per_month = {k: 0 for k in months}
    for day, c in counts:
        if (day.year, day.month) in per_month:
            per_month[(day.year, day.month)] += c

    return {
        "total": total,
        "current": cur,
        "current_range": cur_range,
        "longest": longest,
        "longest_range": best_range,
        "active": active,
        "span": len(counts),
        "best": best,
        "best_day": best_day,
        "avg": total / active if active else 0,
        "months": [(calendar.month_abbr[m][0], per_month[(y, m)]) for y, m in months],
    }


def window(x, y, w, h, title):
    """A terminal window frame with traffic-light dots."""
    return f"""
  <g transform="translate({x},{y})">
    <rect width="{w}" height="{h}" rx="8" fill="{BG}" stroke="{BORDER}"/>
    <path d="M0 8a8 8 0 0 1 8-8h{w-16}a8 8 0 0 1 8 8v18H0z" fill="{PANEL}"/>
    <line x1="0" y1="26" x2="{w}" y2="26" stroke="{BORDER}"/>
    <circle cx="14" cy="13" r="4.5" fill="#ff5f57"/>
    <circle cx="28" cy="13" r="4.5" fill="#febc2e"/>
    <circle cx="42" cy="13" r="4.5" fill="#28c840"/>
    <text x="{w/2}" y="17" text-anchor="middle" class="muted" font-size="10">{escape(title)}</text>
  </g>"""


def prompt(x, y, cmd, delay=0.0):
    """`user@github ~ $ cmd` with a typing reveal and blinking cursor."""
    head = f"{USER}@github ~ $ "
    full = len(head + cmd)
    cw = 8.4  # char width at 14px
    return f"""
  <g font-size="14" font-weight="700">
    <clipPath id="type{int(delay*10)}"><rect x="{x}" y="{y-16}" height="22" width="{len(head)*cw}">
      <animate attributeName="width" begin="{delay+.4}s" dur="{0.07*len(cmd):.2f}s" fill="freeze" calcMode="discrete" values="{';'.join(f'{(len(head)+i)*cw:.1f}' for i in range(1, len(cmd)+1))};{full*cw+12}"/>
    </rect></clipPath>
    <text x="{x}" y="{y}" clip-path="url(#type{int(delay*10)})"><tspan fill="{ACCENT}">{USER}@github</tspan><tspan fill="{TEXT}"> ~ $ {escape(cmd)}</tspan></text>
  </g>"""


def svg(w, h, body):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" font-family="{FONT}">
  <style>
    text {{ fill: {TEXT}; }}
    .muted {{ fill: {MUTED}; }}
    .fade {{ opacity: 0; animation: fade .5s ease-out forwards; }}
    .grow {{ transform-box: fill-box; transform-origin: bottom; transform: scaleY(0); animation: grow .8s cubic-bezier(.2,.8,.2,1) forwards; }}
    @keyframes fade {{ to {{ opacity: 1; }} }}
    @keyframes grow {{ to {{ transform: scaleY(1); }} }}
    @media (prefers-reduced-motion: reduce) {{ .fade, .grow {{ animation: none; opacity: 1; transform: none; }} }}
  </style>
  <rect width="{w}" height="{h}" rx="12" fill="{BG}"/>{body}
</svg>
"""


def contributions_svg(weeks, s):
    cell, gap = 12, 3
    step = cell + gap
    W = 900
    gx = (W - len(weeks) * step) / 2 + 14
    gy = 84
    out = [prompt(W / 2 - 190, 38, "./contributions.sh")]

    # Month labels at the first week that starts in a new month.
    # Skip a label that would collide with the previous one (a partial first month).
    last, last_i = None, -9
    for i, wk in enumerate(weeks):
        m = dt.date.fromisoformat(wk["contributionDays"][0]["date"]).month
        if m != last and i < len(weeks) - 2:
            if i - last_i < 3 and out[-1].startswith("<text"):
                out.pop()
            out.append(f'<text x="{gx+i*step}" y="{gy-8}" font-size="10" class="muted">{calendar.month_abbr[m]}</text>')
            last, last_i = m, i
    for r, label in ((1, "Mon"), (3, "Wed"), (5, "Fri")):
        out.append(f'<text x="{gx-8}" y="{gy+r*step+10}" font-size="10" class="muted" text-anchor="end">{label}</text>')

    levels = {"NONE": 0, "FIRST_QUARTILE": 1, "SECOND_QUARTILE": 2, "THIRD_QUARTILE": 3, "FOURTH_QUARTILE": 4}
    for i, wk in enumerate(weeks):
        cells = []
        for d in wk["contributionDays"]:
            lvl = d.get("level", levels[d["contributionLevel"]])
            n = d["contributionCount"]
            tip = f'{n} contribution{"s" if n != 1 else ""} on {d["date"]}'
            cells.append(f'<rect x="{gx+i*step}" y="{gy+d["weekday"]*step}" width="{cell}" height="{cell}" rx="2.5" fill="{LEVELS[lvl]}"><title>{tip}</title></rect>')
        out.append(f'<g class="fade" style="animation-delay:{1.2+i*0.025:.3f}s">{"".join(cells)}</g>')

    ly = gy + 7 * step + 22
    out.append(f'<text x="{gx}" y="{ly}" font-size="12" font-weight="700" class="fade" style="animation-delay:2.4s">{s["total"]:,} contributions in the last year</text>')
    lx = gx + len(weeks) * step - 5 * 14 - 34
    legend = f'<text x="{lx-8}" y="{ly}" font-size="10" class="muted" text-anchor="end">Less</text>'
    legend += "".join(f'<rect x="{lx+k*14}" y="{ly-10}" width="11" height="11" rx="2.5" fill="{c}"/>' for k, c in enumerate(LEVELS))
    legend += f'<text x="{lx+5*14+4}" y="{ly}" font-size="10" class="muted">More</text>'
    out.append(f'<g class="fade" style="animation-delay:2.4s">{legend}</g>')
    return svg(W, ly + 22, "".join(out))


def ascii_avatar(url, cols=82):
    with urllib.request.urlopen(url + "&s=460", timeout=60) as r:
        img = Image.open(io.BytesIO(r.read())).convert("RGB")
    w, h = img.size
    # Head-and-shoulders crop of the profile photo.
    img = img.crop((int(w * .18), int(h * .03), int(w * .82), int(h * .56)))
    cw, lh = 4.8, 8.6
    rows = round(cols * img.height / img.width * cw / lh)
    small = img.resize((cols, rows), Image.LANCZOS)
    px = small.load()
    lum = small.convert("L").filter(ImageFilter.UnsharpMask(2, 160, 2)).load()

    # Drop the plain wall: anything close to the median top-corner colour.
    corners = sorted(px[x, y] for x in (0, 1, cols - 2, cols - 1) for y in (0, 1, 2))
    bg = corners[len(corners) // 2]
    subject = [[sum((a - b) ** 2 for a, b in zip(px[x, y], bg)) ** .5 > 55 for x in range(cols)] for y in range(rows)]

    # Histogram-equalise over the subject only, darker = denser glyph.
    vals = sorted(lum[x, y] for y in range(rows) for x in range(cols) if subject[y][x])
    ramp = " .:-=+*#%@"
    lines = []
    for y in range(rows):
        row = ""
        for x in range(cols):
            if not subject[y][x]:
                row += " "
                continue
            p = 1 - bisect.bisect_left(vals, lum[x, y]) / len(vals)
            row += ramp[1 + min(len(ramp) - 2, int(p * (len(ramp) - 1)))]
        lines.append(row.rstrip())
    return lines, cw, lh


def whoami_svg(user, s):
    W, H = 900, 520
    out = [prompt(W / 2 - 120, 38, "whoami", delay=0.3)]
    pw, ph, py = 428, 450, 58

    # Left pane: ASCII portrait
    out.append(window(14, py, pw, ph, f"{user['login']}@github: ~/avatar.sh"))
    lines, cw, lh = ascii_avatar(user["avatarUrl"])
    ax = 14 + (pw - max(len(l) for l in lines) * cw) / 2
    ay = py + 26 + (ph - 26 - 18 - len(lines) * lh) / 2 + lh
    for i, line in enumerate(lines):
        if line.strip():
            out.append(f'<text x="{ax:.1f}" y="{ay+i*lh:.1f}" font-size="8" xml:space="preserve" class="fade" style="fill:#c9d1d9;animation-delay:{0.9+i*0.03:.2f}s">{escape(line)}</text>')
    out.append(f'<text x="26" y="{py+ph-10}" font-size="9" class="muted">{user["login"]}@github:~$ <tspan fill="{TEXT}">{escape(user.get("name") or user["login"])}</tspan></text>')

    # Right pane: stat cards + monthly bars
    rx = 14 + pw + 16
    out.append(window(rx, py, pw, ph, f"{user['login']}@github: ~/stats.sh"))
    cur_r = s["current_range"]
    long_r = s["longest_range"]
    cards = [
        ("current streak", f'{s["current"]}', "days" if s["current"] != 1 else "day",
         fmt_range(cur_r) or "start one today", ACCENT),
        ("longest streak", f'{s["longest"]}', "days" if s["longest"] != 1 else "day",
         fmt_range(long_r) or "—", TEXT),
        ("contributions", f'{s["total"]:,}', "", "in the last year", TEXT),
        ("active days", f'{s["active"]}', f'/ {s["span"]}', f'{round(100*s["active"]/s["span"])}% of the year', TEXT),
        ("best day", f'{s["best"]}', "", fmt_day(s["best_day"]) if s["best"] else "—", TEXT),
        ("avg / active day", f'{s["avg"]:.1f}', "", "contributions", TEXT),
    ]
    cw2, ch2, cg = (pw - 36) / 2, 62, 10
    for k, (label, big, unit, sub, color) in enumerate(cards):
        x = rx + 12 + (k % 2) * (cw2 + 12)
        y = py + 38 + (k // 2) * (ch2 + cg)
        unit_x = x + 12 + len(big) * 13.8 + 6
        out.append(f"""<g class="fade" style="animation-delay:{1.0+k*0.12:.2f}s">
    <rect x="{x}" y="{y}" width="{cw2}" height="{ch2}" rx="6" fill="{PANEL}" stroke="{BORDER}"/>
    <text x="{x+12}" y="{y+17}" font-size="10" class="muted">$ {label}</text>
    <text x="{x+12}" y="{y+42}" font-size="23" font-weight="800" style="fill:{color}">{big}</text>
    <text x="{unit_x:.0f}" y="{y+42}" font-size="11" class="muted">{unit}</text>
    <text x="{x+12}" y="{y+55}" font-size="9" class="muted">{escape(sub)}</text>
  </g>""")

    cy = py + 38 + 3 * (ch2 + cg)
    chh = ph - (cy - py) - 12
    out.append(f'<g class="fade" style="animation-delay:1.8s"><rect x="{rx+12}" y="{cy}" width="{pw-24}" height="{chh}" rx="6" fill="{PANEL}" stroke="{BORDER}"/>'
               f'<text x="{rx+24}" y="{cy+17}" font-size="10" class="muted">$ contributions / month</text></g>')
    peak = max(c for _, c in s["months"]) or 1
    bw, bg_ = 20, (pw - 48 - 12 * 20) / 11
    base = cy + chh - 22
    maxh = chh - 62
    for i, (label, c) in enumerate(s["months"]):
        bx = rx + 24 + i * (bw + bg_)
        bh = max(2, maxh * c / peak) if c else 2
        top = c == peak and c > 0
        fill = "#39d353" if top else ("#26a641" if c else BORDER)
        out.append(f'<rect class="grow" style="animation-delay:{2.0+i*0.06:.2f}s" x="{bx:.1f}" y="{base-bh:.1f}" width="{bw}" height="{bh:.1f}" rx="2" fill="{fill}"><title>{c} contributions</title></rect>')
        if c:
            out.append(f'<text class="fade" style="animation-delay:{2.6+i*0.06:.2f}s" x="{bx+bw/2:.1f}" y="{base-bh-5:.1f}" font-size="9" text-anchor="middle" font-weight="{700 if top else 400}">{c}</text>')
        out.append(f'<text x="{bx+bw/2:.1f}" y="{base+14}" font-size="9" class="muted" text-anchor="middle">{label}</text>')

    return svg(W, H, "".join(out))


def main():
    user = fetch()
    weeks = user["contributionsCollection"]["contributionCalendar"]["weeks"]
    merge_commits(weeks)
    days = [d for wk in weeks for d in wk["contributionDays"]]
    s = stats(days)
    OUT.mkdir(exist_ok=True)
    (OUT / "contributions.svg").write_text(contributions_svg(weeks, s))
    (OUT / "whoami.svg").write_text(whoami_svg(user, s))
    print(f"{s['total']} contributions · streak {s['current']} · longest {s['longest']} · active {s['active']}")


if __name__ == "__main__":
    main()
