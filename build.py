#!/usr/bin/env python3
"""Build the bilingual static revision site.

Source:  site/site.json (structure), content/**/*.md (Chinese notes), content/**/*.en.md (English notes),
         site/template.html, site/assets/*
Output:  docs/  (served by GitHub Pages: branch → /docs)

Every page carries both languages; the 中文 / EN switch in the top bar toggles them without reloading.

Usage:   pip install markdown && python3 build.py
"""
import html
import json
import re
import shutil
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
LANGS = ("zh", "en")


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


def render_markdown(text, id_prefix=""):
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
        extensions=["tables", "fenced_code", "sane_lists", "md_in_html", RevisionExtension(), "toc"],
        extension_configs={"toc": {"slugify": slugify_unicode, "toc_depth": "2-3"}},
    )
    body = md.convert(text)
    tokens = md.toc_tokens
    if id_prefix:
        body = re.sub(r'(<h[1-6] id=")', r"\1" + id_prefix, body)
        for t in tokens:
            t["id"] = id_prefix + t["id"]
    # Task-list checkboxes: "- [ ] item"
    body = re.sub(r"<li>\[ \]\s*", '<li class="task"><input type="checkbox" class="task-box"> ', body)
    # Section numbers ("2.1 課程要求") become boxed labels, as in the original guide.
    body = re.sub(r'(<h2 id="[^"]+">)(\d+(?:\.\d+)*)\s+(.*?)</h2>',
                  r'\1<span class="sec-num">\2</span><span class="sec-title">\3</span></h2>', body)
    body = body.replace("<details>", '<details class="quiz">')
    return body, tokens


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", " ", s)).split()


# ---------------------------------------------------------------- bilingual helpers

def B(zh, en):
    """Inline text in both languages."""
    return f'<span class="lang-zh">{zh}</span><span class="lang-en" lang="en">{en}</span>'


def BB(zh, en, tag="div", cls=""):
    """Block content in both languages."""
    c = f" {cls}" if cls else ""
    return (f'<{tag} class="lang-zh{c}">{zh}</{tag}>'
            f'<{tag} class="lang-en{c}" lang="en">{en}</{tag}>')


def en_path(md):
    return md[:-3] + ".en.md"


# ---------------------------------------------------------------- structure

def load_pages(site):
    pages, modules = [], []
    pages.append({"id": "index", "url": "index.html", "kind": "home", "group": None, "module": None, "md": None})
    for group in site["groups"]:
        for mod in group["modules"]:
            mod["group"] = group
            mod["url"] = f"{mod['id']}/index.html"
            overview = {"id": f"{mod['id']}/index", "url": mod["url"], "kind": "module",
                        "group": group, "module": mod, "md": mod.get("overview")}
            pages.append(overview)
            mod["pages"] = [overview]
            for t in mod["topics"]:
                p = {"id": f"{mod['id']}/{t['id']}", "url": f"{mod['id']}/{t['id']}.html", "kind": "topic",
                     "group": group, "module": mod, "topic": t, "md": t.get("md")}
                pages.append(p)
                mod["pages"].append(p)
            modules.append(mod)
    for p in pages:
        md = p.get("md")
        p["ready"] = bool(md) and (CONTENT / md).exists()
        p["ready_en"] = bool(md) and (CONTENT / en_path(md)).exists()
    return pages, modules


def rel(from_url, to_url):
    return "../" * from_url.count("/") + to_url


def is_curriculum(group):
    return group["id"] in ("core", "elective")


def module_label(mod, lang):
    g = mod["group"]["id"]
    if g == "core":
        return f"單元 {mod['code']}" if lang == "zh" else f"Module {mod['code']}"
    if g == "elective":
        return f"選修{mod['code']}" if lang == "zh" else f"Elective {mod['code_en']}"
    return mod["title"] if lang == "zh" else mod["en"]


def topic_label(page, lang):
    if not is_curriculum(page["group"]):
        return ""
    return f"課題 {page['topic']['id']}" if lang == "zh" else f"Topic {page['topic']['id']}"


def page_title(page, lang, site=None):
    if page["kind"] == "home":
        return site["title"] if lang == "zh" else site["title_en"]
    if page["kind"] == "module":
        return page["module"]["title"] if lang == "zh" else page["module"]["en"]
    return page["topic"]["title"] if lang == "zh" else page["topic"]["en"]


def page_heading(page, lang, site=None):
    """Full label, e.g. 單元 A 課題 b：數據組織及數據控制 / Module A Topic b: Data Organisation …"""
    if page["kind"] == "home":
        return page_title(page, lang, site)
    sep = "：" if lang == "zh" else ": "
    mod = page["module"]
    if page["kind"] == "module":
        if not is_curriculum(page["group"]):
            return page_title(page, lang)
        return f"{module_label(mod, lang)}{sep}{page_title(page, lang)}"
    lab = topic_label(page, lang)
    if not lab:
        return page_title(page, lang)
    return f"{module_label(mod, lang)} {lab}{sep}{page_title(page, lang)}"


def hours_text(h, lang):
    return f"建議課時 {h} 小時" if lang == "zh" else f"Suggested time: {h} hours"


# ---------------------------------------------------------------- fragments

def nav_html(site, current):
    out = []
    home_active = " is-active" if current["kind"] == "home" else ""
    out.append(f'<a class="nav-home{home_active}" href="{rel(current["url"], "index.html")}">'
               f'<span class="nav-home-icon" aria-hidden="true">⌂</span>{B("首頁", "Home")}</a>')
    for group in site["groups"]:
        out.append(f'<div class="nav-group"><div class="nav-group-title">{B(group["title"], group["en"])}</div>')
        for mod in group["modules"]:
            open_ = current.get("module") is mod
            badge = ""
            if group["id"] != "exam":
                badge = f'<span class="nav-code">{B(mod["code"], mod["code_en"])}</span>'
            out.append(f'<details class="nav-module accent-{mod["accent"]}"{" open" if open_ else ""}>')
            out.append(f'<summary>{badge}<span class="nav-module-title">{B(mod["title"], mod["en"])}</span></summary><ul>')
            for p in mod["pages"]:
                if p["kind"] == "module":
                    label = B("概覽", "Overview")
                elif is_curriculum(group):
                    label = B(f'{p["topic"]["id"]}. {p["topic"]["title"]}', f'{p["topic"]["id"]}. {p["topic"]["en"]}')
                else:
                    label = B(p["topic"]["title"], p["topic"]["en"])
                cls = ["nav-link"]
                if p is current:
                    cls.append("is-active")
                if not p["ready"] and p["kind"] == "topic":
                    cls.append("is-pending")
                aria = ' aria-current="page"' if p is current else ""
                out.append(f'<li><a class="{" ".join(cls)}" data-page="{p["id"]}" href="{rel(current["url"], p["url"])}"{aria}>'
                           f'<span class="nav-tick" aria-hidden="true"></span><span class="nav-text">{label}</span></a></li>')
            out.append("</ul></details>")
        out.append("</div>")
    return "\n".join(out)


def toc_html(tokens, lang):
    if not tokens:
        return ""
    title = "本頁目錄" if lang == "zh" else "On this page"
    items = "".join(f'<li><a href="#{t["id"]}">{html.escape(html.unescape(t["name"]))}</a></li>' for t in tokens)
    return (f'<nav class="toc lang-{lang}"{" lang=en" if lang == "en" else ""} aria-label="{title}">'
            f'<div class="toc-title">{title}</div><ol>{items}</ol></nav>')


def breadcrumb(page):
    parts = [f'<a href="{rel(page["url"], "index.html")}">{B("首頁", "Home")}</a>']
    if page.get("group"):
        parts.append(f'<span>{B(page["group"]["title"], page["group"]["en"])}</span>')
    if page["kind"] == "topic":
        mod = page["module"]
        parts.append(f'<a href="{rel(page["url"], mod["url"])}">{B(mod["title"], mod["en"])}</a>')
    return '<nav class="breadcrumb">' + '<span class="sep">›</span>'.join(parts) + "</nav>"


def topic_cards(mod, from_url):
    cards = []
    for p in mod["pages"][1:]:
        t = p["topic"]
        meta_zh, meta_en = [], []
        if t.get("hours"):
            meta_zh.append(hours_text(t["hours"], "zh"))
            meta_en.append(hours_text(t["hours"], "en"))
        if t.get("chapters"):
            meta_zh.append(t["chapters"])
            meta_en.append(t.get("chapters_en", t["chapters"]))
        status = (f'<span class="badge badge-ready">{B("已上載", "Available")}</span>' if p["ready"]
                  else f'<span class="badge badge-pending">{B("整理中", "Coming soon")}</span>')
        code = ""
        if topic_label(p, "zh"):
            code = f'<span class="topic-code">{B(topic_label(p, "zh"), topic_label(p, "en"))}</span>'
        cards.append(
            f'<a class="topic-card{"" if p["ready"] else " is-pending"}" data-page="{p["id"]}" href="{rel(from_url, p["url"])}">'
            f'<div class="topic-card-top">{code}{status}</div>'
            f'<div class="topic-card-title">{B(t["title"], t["en"])}</div>'
            f'<div class="topic-card-en">{B(t["en"], t["title"])}</div>'
            f'<div class="topic-card-meta">{B(" · ".join(meta_zh), " · ".join(meta_en))}</div>'
            f'<span class="done-mark" aria-hidden="true">{B("✓ 已溫習", "✓ Revised")}</span></a>'
        )
    return '<div class="topic-grid">' + "".join(cards) + "</div>"


def pending_block(lang):
    if lang == "zh":
        return ('<div class="pending"><div class="pending-icon">整理中</div><div class="pending-title">內容整理中</div>'
                '<p>這一頁的溫習重點稍後上載。你可以先溫習已上載的課題。</p></div>')
    return ('<div class="pending"><div class="pending-icon">Coming soon</div><div class="pending-title">Content in preparation</div>'
            '<p>Revision notes for this page will be added later. Meanwhile, revise the topics already available.</p></div>')


def en_missing_block():
    return ('<div class="pending"><div class="pending-icon">English</div><div class="pending-title">English version in preparation</div>'
            '<p>This page is currently available in Chinese only. Switch to 中文 in the top bar to read it.</p></div>')


def prevnext(pages, page):
    seq = [p for p in pages if p["kind"] != "home"]
    i = seq.index(page)
    out = ['<nav class="prevnext">']
    if i > 0:
        p = seq[i - 1]
        out.append(f'<a class="pn pn-prev" href="{rel(page["url"], p["url"])}"><span class="pn-dir">{B("← 上一頁", "← Previous")}</span>'
                   f'<span class="pn-title">{B(page_heading(p, "zh"), page_heading(p, "en"))}</span></a>')
    else:
        out.append("<span></span>")
    if i < len(seq) - 1:
        p = seq[i + 1]
        out.append(f'<a class="pn pn-next" href="{rel(page["url"], p["url"])}"><span class="pn-dir">{B("下一頁 →", "Next →")}</span>'
                   f'<span class="pn-title">{B(page_heading(p, "zh"), page_heading(p, "en"))}</span></a>')
    out.append("</nav>")
    return "".join(out)


# ---------------------------------------------------------------- home

def build_home(site, pages):
    ready_topics = [p for p in pages if p["kind"] == "topic" and p["ready"]]
    ready_curriculum = [p for p in ready_topics if is_curriculum(p["group"])]
    groups = []
    for group in site["groups"]:
        cards = []
        for mod in group["modules"]:
            topics = mod["pages"][1:]
            ready_ids = [p["id"] for p in topics if p["ready"]]
            if mod.get("hours"):
                hours = B(f'{mod["hours"]} 小時', f'{mod["hours"]} hours')
            else:
                hours = B(f'{len(topics)} 個專題', f'{len(topics)} pages')
            sub = B(mod["en"], mod["title"])
            cards.append(
                f'<a class="module-card accent-{mod["accent"]}" href="{mod["url"]}">'
                f'<div class="module-card-head"><span class="module-code">{B(mod["code"], mod["code_en"])}</span>'
                f'<span class="module-hours">{hours}</span></div>'
                f'<div class="module-card-title">{B(mod["title"], mod["en"])}</div>'
                f'<div class="module-card-en">{sub}</div>'
                f'<div class="module-card-foot"><span>{B(f"已上載 {len(ready_ids)} / {len(topics)}", f"Available {len(ready_ids)} / {len(topics)}")}</span>'
                f'<span class="progress-text" data-progress-text="{",".join(ready_ids)}"></span></div>'
                f'<div class="progress" aria-hidden="true"><span class="progress-bar" data-progress="{",".join(ready_ids)}"></span></div>'
                "</a>"
            )
        groups.append(f'<section class="home-group"><h2>{B(group["title"], group["en"])}</h2>'
                      f'<div class="module-grid">{"".join(cards)}</div></section>')

    def latest_label(p, lang):
        lab = topic_label(p, lang)
        return f'{module_label(p["module"], lang)} · {lab}' if lab else module_label(p["module"], lang)

    latest = "".join(
        f'<li><a href="{p["url"]}"><span class="latest-mod">{B(latest_label(p, "zh"), latest_label(p, "en"))}</span>'
        f'{B(p["topic"]["title"], p["topic"]["en"])}</a></li>' for p in ready_topics)
    return f"""
<section class="hero">
  <div class="hero-eyebrow">{B("2025 年起新課程 · 必修 A 至 E · 選修二甲、二乙", "New curriculum from 2025 · Compulsory A–E · Electives 2A & 2B")}</div>
  <h1 class="hero-title">{B('ICT <em class="hl">溫習站</em>', 'ICT <em class="hl">Revision Hub</em>')}</h1>
  <p class="hero-sub">{B(site["subtitle"] + "溫習重點、考評局評卷要點與常見錯誤整理。按課程及評估指引的框架編排，配合課本與作業使用。",
                          "Revision notes, HKEAA marking points and common mistakes for " + site["subtitle_en"] +
                          ", organised by the Curriculum and Assessment Guide. Use alongside your textbook and workbook.")}</p>
  <div class="hero-actions">
    <a class="btn btn-primary" href="core-a/index.html">{B("由單元 A 開始", "Start with Module A")}</a>
    <a class="btn" href="exam/structure.html">{B("試卷結構與答題原則", "Paper structure &amp; answering principles")}</a>
  </div>
  <div class="hero-stats">
    <div><strong>144</strong><span>{B("必修課時", "Compulsory hours")}</span></div>
    <div><strong>76</strong><span>{B("選修課時（選兩項）", "Elective hours (choose two)")}</span></div>
    <div><strong>{len(ready_curriculum)}</strong><span>{B("已上載課題", "Topics available")}</span></div>
    <div><strong data-total-done>0</strong><span>{B("你已溫習", "You have revised")}</span></div>
  </div>
</section>
<section class="home-latest"><h2>{B("已上載內容", "Available content")}</h2><ul class="latest-list">{latest}</ul></section>
{"".join(groups)}
"""


# ---------------------------------------------------------------- pages

def index_sections(page, body, lang, index):
    chunks = re.split(r'(<h2 id="[^"]+">.*?</h2>)', body)
    heading, anchor, text = page_heading(page, lang), "", chunks[0]

    def push(h, a, t):
        words = " ".join(strip_tags(t))
        if words.strip():
            index.append({"l": lang, "p": page_heading(page, lang), "h": h,
                          "u": page["url"] + (f"#{a}" if a else ""), "t": words})
    for c in chunks[1:]:
        m = re.match(r'<h2 id="([^"]+)">(.*?)</h2>', c)
        if m:
            push(heading, anchor, text)
            anchor, heading, text = m.group(1), " ".join(strip_tags(m.group(2))), ""
        else:
            text += c
    push(heading, anchor, text)


def build_page(site, pages, page, template, index):
    mod = page.get("module")
    bodies, tokens = {}, {}
    if page["ready"]:
        bodies["zh"], tokens["zh"] = render_markdown((CONTENT / page["md"]).read_text(encoding="utf-8"))
        index_sections(page, bodies["zh"], "zh", index)
    if page["ready_en"]:
        bodies["en"], tokens["en"] = render_markdown((CONTENT / en_path(page["md"])).read_text(encoding="utf-8"), "en-")
        index_sections(page, bodies["en"], "en", index)

    if page["kind"] == "home":
        main, header, accent = build_home(site, pages), "", "a"
    else:
        accent = mod["accent"]
        eyebrow = {l: (module_label(mod, l) if is_curriculum(page["group"]) else (mod["en"] if l == "zh" else mod["title"]))
                   for l in LANGS}
        if page["kind"] == "topic" and topic_label(page, "zh"):
            for l in LANGS:
                eyebrow[l] += f" · {topic_label(page, l)}"
        chips = {"zh": [], "en": []}
        if page["kind"] == "topic":
            t = page["topic"]
            if t.get("hours"):
                for l in LANGS:
                    chips[l].append(hours_text(t["hours"], l))
            if t.get("chapters"):
                chips["zh"].append(t["chapters"])
                chips["en"].append(t.get("chapters_en", t["chapters"]))
        elif mod.get("hours"):
            for l in LANGS:
                chips[l].append(hours_text(mod["hours"], l))
        chip_html = "".join(f'<span class="chip">{B(z, e)}</span>' for z, e in zip(chips["zh"], chips["en"]))
        done_btn = ""
        if page["kind"] == "topic" and page["ready"]:
            done_btn = (f'<button class="done-btn" type="button" data-done-toggle="{page["id"]}" aria-pressed="false">'
                        f'<span class="done-box" aria-hidden="true"></span><span class="done-label"></span></button>')
        header = (
            f'{breadcrumb(page)}<header class="page-head">'
            f'<div class="page-eyebrow">{B(eyebrow["zh"], eyebrow["en"])}</div>'
            f'<h1 class="page-title">{B(page_title(page, "zh"), page_title(page, "en"))}</h1>'
            f'<div class="page-en">{B(page_title(page, "en"), page_title(page, "zh"))}</div>'
            f'<div class="page-meta">{chip_html}{done_btn}</div></header>'
        )
        def content_blocks():
            zh = f'<div class="lang-zh prose">{bodies["zh"]}</div>'
            if "en" in bodies:
                return zh + f'<div class="lang-en prose" lang="en">{bodies["en"]}</div>'
            return zh + f'<div class="lang-en" lang="en">{en_missing_block()}</div>'

        parts = []
        if page["kind"] == "module":
            parts.append(f'<h2 class="section-label">{B("課題", "Topics")}</h2>{topic_cards(mod, page["url"])}')
            if page["ready"]:
                parts.append(content_blocks())
        elif page["ready"]:
            parts.append(content_blocks())
        else:
            parts.append(BB(pending_block("zh"), pending_block("en")))
        main = "".join(parts) + prevnext(pages, page)

    toc = "".join(toc_html(tokens.get(l), l) for l in LANGS)
    out = (template
           .replace("{{title_zh}}", html.escape(f'{page_heading(page, "zh", site)}｜{site["title"]}' if page["kind"] != "home" else site["title"]))
           .replace("{{title_en}}", html.escape(f'{page_heading(page, "en", site)} | {site["title_en"]}' if page["kind"] != "home" else site["title_en"]))
           .replace("{{root}}", rel(page["url"], ""))
           .replace("{{accent}}", accent)
           .replace("{{page_id}}", page["id"])
           .replace("{{brand}}", B(site["title"], site["title_en"]))
           .replace("{{nav}}", nav_html(site, page))
           .replace("{{header}}", header)
           .replace("{{main}}", main)
           .replace("{{toc}}", toc)
           .replace("{{has_toc}}", "has-toc" if toc else "no-toc")
           .replace("{{kind}}", page["kind"]))
    dest = OUT / page["url"]
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out, encoding="utf-8")


def main():
    site = json.loads((SITE / "site.json").read_text(encoding="utf-8"))
    pages, _ = load_pages(site)
    template = (SITE / "template.html").read_text(encoding="utf-8")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copytree(SITE / "assets", OUT / "assets")
    (OUT / ".nojekyll").write_text("")
    index = []
    for page in pages:
        build_page(site, pages, page, template, index)
    (OUT / "assets" / "search-index.js").write_text(
        "window.SEARCH_INDEX = " + json.dumps(index, ensure_ascii=False) + ";\n", encoding="utf-8")
    zh = sum(1 for p in pages if p["ready"])
    en = sum(1 for p in pages if p["ready_en"])
    print(f"Built {len(pages)} pages ({zh} with Chinese content, {en} with English) → {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
