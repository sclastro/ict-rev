#!/usr/bin/env python3
"""Build the static revision site.

Source:  site/site.json (structure), content/**/*.md (notes), site/template.html, site/assets/*
Output:  docs/  (served by GitHub Pages: branch → /docs)

Usage:   pip install markdown && python3 build.py
"""
import html
import json
import re
import shutil
from datetime import date
from pathlib import Path
from xml.etree import ElementTree as etree

import markdown
from markdown.extensions import Extension
from markdown.extensions.toc import slugify_unicode
from markdown.treeprocessors import Treeprocessor

ROOT = Path(__file__).resolve().parent
SITE = ROOT / "site"
CONTENT = ROOT / "content"
OUT = ROOT / "docs"


# ---------------------------------------------------------------- markdown

class RevisionTreeprocessor(Treeprocessor):
    """Style callouts (⚠ / ✔ blockquotes) and wrap tables for horizontal scroll."""

    def run(self, root):
        for parent in root.iter():
            for i, child in enumerate(list(parent)):
                if child.tag == "table" and parent.get("class") != "table-wrap":
                    wrap = etree.Element("div", {"class": "table-wrap"})
                    parent.remove(child)
                    wrap.append(child)
                    parent.insert(i, wrap)
                elif child.tag == "blockquote":
                    text = "".join(child.itertext()).strip()
                    if text.startswith("⚠"):
                        child.set("class", "callout callout-warn")
                    elif text.startswith("✔"):
                        child.set("class", "callout callout-tip")
                    else:
                        child.set("class", "callout callout-note")
        return root


class RevisionExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(RevisionTreeprocessor(md), "revision", 5)


def render_markdown(text):
    # Let markdown inside <details> blocks be parsed.
    text = re.sub(r"<details>", '<details markdown="1">', text)
    # Blockquotes: each "> line" is its own paragraph; a new "> ⚠" line starts a new callout.
    # (Python-Markdown also merges blockquotes separated by a blank line, so separate them explicitly.)
    lines, out = text.split("\n"), []
    for line in lines:
        prev = out[-1] if out else ""
        if line.startswith(">"):
            is_new = line.lstrip("> ").startswith("⚠")
            if prev.startswith(">") and prev.strip() != ">":
                out.extend(["", "<!-- -->", ""] if is_new else [">"])
            elif prev == "" and len(out) > 1 and out[-2].startswith(">"):
                out.extend(["<!-- -->", ""])
        out.append(line)
    # Python-Markdown needs a blank line between a paragraph and a following list.
    lines, out, fence = out, [], False
    item = re.compile(r"^\s*(?:[-*+]|\d+\.)\s")
    for line in lines:
        if line.startswith("```"):
            fence = not fence
        prev = out[-1] if out else ""
        if (not fence and item.match(line) and prev.strip() and not item.match(prev)
                and not prev.startswith(("|", ">", "<", "#", " ", "\t"))):
            out.append("")
        out.append(line)
    text = "\n".join(out)
    md = markdown.Markdown(
        extensions=[
            "tables", "fenced_code", "sane_lists", "md_in_html",
            RevisionExtension(),
            "toc",
        ],
        extension_configs={"toc": {"slugify": slugify_unicode, "toc_depth": "2-3"}},
    )
    body = md.convert(text)
    # Task-list checkboxes: "- [ ] item"
    body = re.sub(r"<li>\[ \]\s*", '<li class="task"><input type="checkbox" class="task-box"> ', body)
    # Section numbers ("2.1 課程要求") become boxed labels, as in the original guide.
    body = re.sub(r'(<h2 id="[^"]+">)(\d+(?:\.\d+)*)\s+(.*?)</h2>',
                  r'\1<span class="sec-num">\2</span><span class="sec-title">\3</span></h2>', body)
    # Self-test blocks get a class for styling.
    body = body.replace('<details>', '<details class="quiz">')
    return body, md.toc_tokens


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", " ", s)).split()


# ---------------------------------------------------------------- structure

def load_pages(site):
    """Return ordered page list and module list with resolved URLs."""
    pages, modules = [], []
    home = {"id": "index", "url": "index.html", "kind": "home", "title": "首頁", "group": None, "module": None}
    pages.append(home)
    for group in site["groups"]:
        for mod in group["modules"]:
            mod["group"] = group
            mod["url"] = f"{mod['id']}/index.html"
            overview = {
                "id": f"{mod['id']}/index", "url": mod["url"], "kind": "module",
                "title": f"{mod['title']}", "group": group, "module": mod,
                "md": mod.get("overview"),
            }
            pages.append(overview)
            mod["pages"] = [overview]
            for t in mod["topics"]:
                p = {
                    "id": f"{mod['id']}/{t['id']}", "url": f"{mod['id']}/{t['id']}.html",
                    "kind": "topic", "title": t["title"], "group": group, "module": mod,
                    "topic": t, "md": t.get("md"),
                }
                t["page"] = p
                pages.append(p)
                mod["pages"].append(p)
            modules.append(mod)
    for p in pages:
        p["ready"] = bool(p.get("md")) and (CONTENT / p["md"]).exists()
    return pages, modules


def rel(from_url, to_url):
    depth = from_url.count("/")
    return "../" * depth + to_url


def module_label(mod):
    if mod["group"]["id"] == "core":
        return f"單元 {mod['code']}"
    if mod["group"]["id"] == "elective":
        return f"選修{mod['code']}"
    return mod["title"]


def topic_label(page):
    t = page["topic"]
    if page["group"]["id"] in ("core", "elective"):
        return f"課題 {t['id']}"
    return ""


# ---------------------------------------------------------------- fragments

def nav_html(pages, modules, site, current):
    out = []
    home_active = " is-active" if current["id"] == "index" else ""
    out.append(f'<a class="nav-home{home_active}" href="{rel(current["url"], "index.html")}">'
               f'<span class="nav-home-icon" aria-hidden="true">⌂</span>首頁</a>')
    for group in site["groups"]:
        out.append(f'<div class="nav-group"><div class="nav-group-title">{group["title"]}</div>')
        for mod in group["modules"]:
            open_ = current.get("module") is mod
            code = mod["code"] if group["id"] != "exam" else ""
            badge = f'<span class="nav-code">{code}</span>' if code else ""
            out.append(f'<details class="nav-module accent-{mod["accent"]}"{" open" if open_ else ""}>')
            out.append(f'<summary>{badge}<span class="nav-module-title">{mod["title"]}</span></summary><ul>')
            for p in mod["pages"]:
                label = "概覽" if p["kind"] == "module" else (
                    f'{p["topic"]["id"]}. {p["title"]}' if group["id"] != "exam" else p["title"])
                cls = ["nav-link"]
                if p is current:
                    cls.append("is-active")
                if not p["ready"] and p["kind"] == "topic":
                    cls.append("is-pending")
                aria = ' aria-current="page"' if p is current else ""
                out.append(f'<li><a class="{" ".join(cls)}" data-page="{p["id"]}" '
                           f'href="{rel(current["url"], p["url"])}"{aria}>'
                           f'<span class="nav-tick" aria-hidden="true"></span>{label}</a></li>')
            out.append("</ul></details>")
        out.append("</div>")
    return "\n".join(out)


def toc_html(tokens):
    if not tokens:
        return ""
    items = "".join(
        f'<li><a href="#{t["id"]}">{html.escape(html.unescape(t["name"]))}</a></li>' for t in tokens
    )
    return f'<nav class="toc" aria-label="本頁目錄"><div class="toc-title">本頁目錄</div><ol>{items}</ol></nav>'


def breadcrumb(page):
    parts = [f'<a href="{rel(page["url"], "index.html")}">首頁</a>']
    if page.get("group"):
        parts.append(f'<span>{page["group"]["title"]}</span>')
    if page["kind"] == "topic":
        mod = page["module"]
        parts.append(f'<a href="{rel(page["url"], mod["url"])}">{mod["title"]}</a>')
    return '<nav class="breadcrumb" aria-label="位置">' + '<span class="sep">›</span>'.join(parts) + "</nav>"


def topic_cards(mod, from_url, include_hours=True):
    cards = []
    for p in mod["pages"][1:]:
        t = p["topic"]
        label = topic_label(p)
        meta = []
        if include_hours and t.get("hours"):
            meta.append(f'建議課時 {t["hours"]} 小時')
        if t.get("chapters"):
            meta.append(t["chapters"])
        status = '<span class="badge badge-ready">已上載</span>' if p["ready"] else '<span class="badge badge-pending">整理中</span>'
        cards.append(
            f'<a class="topic-card{"" if p["ready"] else " is-pending"}" data-page="{p["id"]}" href="{rel(from_url, p["url"])}">'
            f'<div class="topic-card-top">{"<span class=topic-code>" + label + "</span>" if label else ""}{status}</div>'
            f'<div class="topic-card-title">{p["title"]}</div>'
            f'<div class="topic-card-en">{t["en"]}</div>'
            f'<div class="topic-card-meta">{" · ".join(meta)}</div>'
            f'<span class="done-mark" aria-hidden="true">✓ 已溫習</span></a>'
        )
    return '<div class="topic-grid">' + "".join(cards) + "</div>"


def pending_block(page):
    return (
        '<div class="pending">'
        '<div class="pending-icon" aria-hidden="true">✎</div>'
        '<div class="pending-title">內容整理中</div>'
        '<p>這一頁的溫習重點稍後上載。你可以先溫習已上載的課題。</p>'
        "</div>"
    )


def prevnext(pages, page):
    seq = [p for p in pages if p["kind"] != "home"]
    if page not in seq:
        return ""
    i = seq.index(page)
    out = ['<nav class="prevnext" aria-label="上下頁">']
    if i > 0:
        p = seq[i - 1]
        out.append(f'<a class="pn pn-prev" href="{rel(page["url"], p["url"])}"><span class="pn-dir">← 上一頁</span>'
                   f'<span class="pn-title">{page_heading(p)}</span></a>')
    else:
        out.append("<span></span>")
    if i < len(seq) - 1:
        p = seq[i + 1]
        out.append(f'<a class="pn pn-next" href="{rel(page["url"], p["url"])}"><span class="pn-dir">下一頁 →</span>'
                   f'<span class="pn-title">{page_heading(p)}</span></a>')
    out.append("</nav>")
    return "".join(out)


def page_heading(p):
    if p["kind"] == "module":
        return f'{module_label(p["module"])}：{p["module"]["title"]}' if p["group"]["id"] != "exam" else p["module"]["title"]
    if p["kind"] == "topic":
        lab = topic_label(p)
        return f'{module_label(p["module"])} {lab}：{p["title"]}' if lab else p["title"]
    return p["title"]


# ---------------------------------------------------------------- pages

def build_home(site, pages, modules):
    ready_topics = [p for p in pages if p["kind"] == "topic" and p["ready"]]
    ready_curriculum = [p for p in ready_topics if p["group"]["id"] in ("core", "elective")]
    groups = []
    for group in site["groups"]:
        cards = []
        for mod in group["modules"]:
            topics = mod["pages"][1:]
            ready_ids = [p["id"] for p in topics if p["ready"]]
            hours = f'{mod["hours"]} 小時' if mod.get("hours") else f'{len(topics)} 個專題'
            label = module_label(mod) if group["id"] != "exam" else mod["en"]
            cards.append(
                f'<a class="module-card accent-{mod["accent"]}" href="{mod["url"]}">'
                f'<div class="module-card-head"><span class="module-code">{mod["code"]}</span>'
                f'<span class="module-hours">{hours}</span></div>'
                f'<div class="module-card-title">{mod["title"]}</div>'
                f'<div class="module-card-en">{mod["en"] if group["id"] != "exam" else label}</div>'
                f'<div class="module-card-foot"><span>已上載 {len(ready_ids)} / {len(topics)}</span>'
                f'<span class="progress-text" data-progress-text="{",".join(ready_ids)}"></span></div>'
                f'<div class="progress" aria-hidden="true"><span class="progress-bar" data-progress="{",".join(ready_ids)}"></span></div>'
                "</a>"
            )
        groups.append(f'<section class="home-group"><h2>{group["title"]}</h2><div class="module-grid">{"".join(cards)}</div></section>')

    def latest_label(p):
        lab = topic_label(p)
        return f'{module_label(p["module"])} · {lab}' if lab else module_label(p["module"])
    latest = "".join(
        f'<li><a href="{p["url"]}"><span class="latest-mod">{latest_label(p)}</span>{p["title"]}</a></li>'
        for p in ready_topics
    )
    body = f"""
<section class="hero">
  <div class="hero-eyebrow">2025 年起新課程 · 必修 A 至 E · 選修二甲、二乙</div>
  <h1 class="hero-title">ICT <span>溫習站</span></h1>
  <p class="hero-sub">{site["subtitle"]}溫習重點、考評局評卷要點與常見錯誤整理。按課程及評估指引的框架編排，配合課本與作業使用。</p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="core-a/index.html">由單元 A 開始</a>
    <a class="btn" href="exam/structure.html">試卷結構與答題原則</a>
  </div>
  <div class="hero-stats">
    <div><strong>144</strong><span>必修課時</span></div>
    <div><strong>76</strong><span>選修課時（選兩項）</span></div>
    <div><strong>{len(ready_curriculum)}</strong><span>已上載課題</span></div>
    <div><strong data-total-done>0</strong><span>你已溫習</span></div>
  </div>
</section>
<section class="home-latest"><h2>已上載內容</h2><ul class="latest-list">{latest}</ul></section>
{"".join(groups)}
"""
    return body


def build_page(site, pages, modules, page, template, index):
    mod = page.get("module")
    body_md, toc_tokens = ("", [])
    if page["ready"]:
        body_md, toc_tokens = render_markdown((CONTENT / page["md"]).read_text(encoding="utf-8"))
        # search index: split by <h2 id="...">
        chunks = re.split(r'(<h2 id="[^"]+">.*?</h2>)', body_md)
        heading, anchor = page_heading(page), ""
        text = chunks[0]
        def push(h, a, t):
            words = " ".join(strip_tags(t))
            if words.strip():
                index.append({"p": page_heading(page), "h": h, "u": page["url"] + (f"#{a}" if a else ""), "t": words})
        for c in chunks[1:]:
            m = re.match(r'<h2 id="([^"]+)">(.*?)</h2>', c)
            if m:
                push(heading, anchor, text)
                anchor, heading, text = m.group(1), " ".join(strip_tags(m.group(2))), ""
            else:
                text += c
        push(heading, anchor, text)

    if page["kind"] == "home":
        main = build_home(site, pages, modules)
        accent, title = "a", site["title"]
        header = ""
    else:
        accent = mod["accent"]
        eyebrow = module_label(mod) if page["group"]["id"] != "exam" else mod["en"]
        if page["kind"] == "topic" and topic_label(page):
            eyebrow += f' · {topic_label(page)}'
        chips = []
        if page["kind"] == "topic":
            t = page["topic"]
            if t.get("hours"):
                chips.append(f'建議課時 {t["hours"]} 小時')
            if t.get("chapters"):
                chips.append(t["chapters"])
        elif mod.get("hours"):
            chips.append(f'建議課時 {mod["hours"]} 小時')
        chip_html = "".join(f'<span class="chip">{c}</span>' for c in chips)
        done_btn = ""
        if page["kind"] == "topic" and page["ready"]:
            done_btn = (f'<button class="done-btn" type="button" data-done-toggle="{page["id"]}" aria-pressed="false">'
                        f'<span class="done-box" aria-hidden="true"></span><span class="done-label">標記為已溫習</span></button>')
        en = page["topic"]["en"] if page["kind"] == "topic" else mod["en"]
        header = (
            f'{breadcrumb(page)}<header class="page-head">'
            f'<div class="page-eyebrow">{eyebrow}</div>'
            f'<h1 class="page-title">{page["title"]}</h1>'
            f'<div class="page-en">{en}</div>'
            f'<div class="page-meta">{chip_html}{done_btn}</div></header>'
        )
        parts = []
        if page["kind"] == "module":
            parts.append(f'<h2 class="section-label">課題</h2>{topic_cards(mod, page["url"], page["group"]["id"] != "exam")}')
            if page["ready"]:
                parts.append(f'<div class="prose">{body_md}</div>')
        else:
            parts.append(f'<div class="prose">{body_md}</div>' if page["ready"] else pending_block(page))
        main = "".join(parts) + prevnext(pages, page)
        title = f'{page_heading(page)}｜{site["title"]}'

    toc = toc_html(toc_tokens) if page["kind"] == "topic" or (page["kind"] == "module" and page["ready"]) else ""
    root = rel(page["url"], "")
    out = (template
           .replace("{{title}}", html.escape(title))
           .replace("{{root}}", root)
           .replace("{{accent}}", accent)
           .replace("{{page_id}}", page["id"])
           .replace("{{site_title}}", site["title"])
           .replace("{{nav}}", nav_html(pages, modules, site, page))
           .replace("{{header}}", header)
           .replace("{{main}}", main)
           .replace("{{toc}}", toc)
           .replace("{{has_toc}}", "has-toc" if toc else "no-toc")
           .replace("{{kind}}", page["kind"])
           .replace("{{year}}", str(date.today().year)))
    dest = OUT / page["url"]
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding="utf-8")


def main():
    site = json.loads((SITE / "site.json").read_text(encoding="utf-8"))
    pages, modules = load_pages(site)
    template = (SITE / "template.html").read_text(encoding="utf-8")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(SITE / "assets", OUT / "assets")
    (OUT / ".nojekyll").write_text("")
    index = []
    for page in pages:
        build_page(site, pages, modules, page, template, index)
    (OUT / "assets" / "search-index.js").write_text(
        "window.SEARCH_INDEX = " + json.dumps(index, ensure_ascii=False) + ";\n", encoding="utf-8")
    ready = sum(1 for p in pages if p["ready"])
    print(f"Built {len(pages)} pages ({ready} with content) → {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
