/* ICT 溫習站 — 互動功能 */
(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var pageId = body.getAttribute("data-page");

  /* ---------------------------------------------------- storage (safe) */
  function load(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function saveRaw(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  /* ---------------------------------------------------- i18n */
  var STR = {
    zh: {
      search: "搜尋課題、術語……", menu: "開啟目錄", font: "調整字體大小", theme: "切換深色／淺色模式", top: "回到頁頂",
      done: "已溫習", mark: "標記為已溫習", revised: "已溫習", none: "找不到「%s」相關內容。",
      fontNames: { normal: "標準", large: "大", small: "小" }, fontLabel: "字體大小："
    },
    en: {
      search: "Search topics and terms…", menu: "Open menu", font: "Change text size", theme: "Toggle dark / light mode", top: "Back to top",
      done: "Revised", mark: "Mark as revised", revised: "Revised", none: "No results for “%s”.",
      fontNames: { normal: "standard", large: "large", small: "small" }, fontLabel: "Text size: "
    }
  };
  function lang() { return html.getAttribute("data-lang") === "en" ? "en" : "zh"; }
  function t(key) { return STR[lang()][key]; }

  function applyLangChrome() {
    var l = lang();
    html.setAttribute("lang", l === "en" ? "en" : "zh-Hant-HK");
    document.title = body.getAttribute(l === "en" ? "data-title-en" : "data-title-zh") || document.title;
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", t(k));
      el.setAttribute("title", t(k));
    });
    document.querySelectorAll("[data-lang-set]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang-set") === l ? "true" : "false");
    });
  }

  // Keep the reader at the same section when switching language.
  function currentSectionIndex() {
    var box = document.querySelector(".lang-" + lang() + ".prose");
    if (!box) return -1;
    var heads = box.querySelectorAll("h2");
    var idx = -1;
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].getBoundingClientRect().top < 140) idx = i; else break;
    }
    return idx;
  }
  function setLang(l) {
    if (l === lang()) return;
    var idx = currentSectionIndex();
    var atTop = window.scrollY < 80;
    html.setAttribute("data-lang", l);
    saveRaw("ictrev-lang", l);
    applyLangChrome();
    paintProgress();
    if (searchInput && searchInput.value.trim()) render(searchInput.value);
    if (!atTop && idx >= 0) {
      var box = document.querySelector(".lang-" + l + ".prose");
      var h = box && box.querySelectorAll("h2")[idx];
      if (h) h.scrollIntoView({ block: "start" });
    }
    setupScrollspy();
  }
  document.querySelectorAll("[data-lang-set]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang-set")); });
  });

  /* ---------------------------------------------------- theme & font */
  function currentTheme() {
    var th = html.getAttribute("data-theme");
    if (th) return th;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      saveRaw("ictrev-theme", next);
    });
  });
  var fonts = ["normal", "large", "small"];
  document.querySelectorAll("[data-font-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = html.getAttribute("data-font") || "normal";
      var next = fonts[(fonts.indexOf(cur) + 1) % fonts.length];
      if (next === "normal") html.removeAttribute("data-font");
      else html.setAttribute("data-font", next);
      saveRaw("ictrev-font", next);
      btn.setAttribute("title", t("fontLabel") + t("fontNames")[next]);
    });
  });

  /* ---------------------------------------------------- mobile nav */
  var menuBtn = document.querySelector(".menu-btn");
  var scrim = document.querySelector(".scrim");
  function setNav(open) {
    body.classList.toggle("nav-open", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (scrim) scrim.hidden = !open;
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setNav(!body.classList.contains("nav-open")); });
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
  var active = document.querySelector(".nav-link.is-active");
  if (active && active.scrollIntoView) active.scrollIntoView({ block: "center" });

  /* ---------------------------------------------------- progress */
  var done = load("ictrev-done", {});
  function paintProgress() {
    document.querySelectorAll("[data-page]").forEach(function (el) {
      if (el === body) return;
      el.classList.toggle("is-done", !!done[el.getAttribute("data-page")]);
    });
    document.querySelectorAll("[data-progress]").forEach(function (bar) {
      var ids = bar.getAttribute("data-progress").split(",").filter(Boolean);
      var n = ids.filter(function (id) { return done[id]; }).length;
      bar.style.width = ids.length ? (n / ids.length * 100) + "%" : "0";
    });
    document.querySelectorAll("[data-progress-text]").forEach(function (el) {
      var ids = el.getAttribute("data-progress-text").split(",").filter(Boolean);
      var n = ids.filter(function (id) { return done[id]; }).length;
      el.textContent = ids.length ? t("revised") + " " + n + " / " + ids.length : "";
    });
    var total = Object.keys(done).filter(function (k) { return done[k]; }).length;
    document.querySelectorAll("[data-total-done]").forEach(function (el) { el.textContent = total; });
    document.querySelectorAll("[data-done-toggle]").forEach(function (btn) {
      var on = !!done[btn.getAttribute("data-done-toggle")];
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.querySelector(".done-label").textContent = on ? t("done") : t("mark");
    });
  }
  document.querySelectorAll("[data-done-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-done-toggle");
      if (done[id]) delete done[id]; else done[id] = true;
      save("ictrev-done", done);
      paintProgress();
    });
  });

  /* ---------------------------------------------------- checklists (per language block) */
  ["zh", "en"].forEach(function (l) {
    var key = "ictrev-check:" + pageId + (l === "en" ? ":en" : "");
    var checks = load(key, {});
    document.querySelectorAll(".lang-" + l + " .task-box").forEach(function (box, i) {
      var li = box.closest("li");
      box.checked = !!checks[i];
      li.classList.toggle("is-checked", box.checked);
      box.setAttribute("aria-label", li.textContent.trim());
      box.addEventListener("change", function () {
        checks[i] = box.checked;
        li.classList.toggle("is-checked", box.checked);
        save(key, checks);
      });
    });
  });

  /* ---------------------------------------------------- TOC scrollspy */
  var io = null;
  function setupScrollspy() {
    if (io) { io.disconnect(); io = null; }
    var toc = document.querySelector(".toc.lang-" + lang());
    if (!toc || !("IntersectionObserver" in window)) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll("a"));
    var map = {};
    links.forEach(function (a) { map[decodeURIComponent(a.getAttribute("href").slice(1))] = a; });
    var heads = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var visible = {};
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var first = heads.find(function (h) { return visible[h.id]; });
      if (!first) {
        var above = heads.filter(function (h) { return h.getBoundingClientRect().top < 120; });
        first = above[above.length - 1];
      }
      links.forEach(function (a) { a.classList.remove("is-active"); });
      if (first && map[first.id]) map[first.id].classList.add("is-active");
    }, { rootMargin: "-70px 0px -60% 0px" });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---------------------------------------------------- back to top */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () { toTop.hidden = window.scrollY < 600; }, { passive: true });
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------------------------------------------------- print: open answers */
  window.addEventListener("beforeprint", function () {
    document.querySelectorAll(".prose details").forEach(function (d) { d.setAttribute("data-was", d.open ? "1" : ""); d.open = true; });
  });
  window.addEventListener("afterprint", function () {
    document.querySelectorAll(".prose details").forEach(function (d) { d.open = d.getAttribute("data-was") === "1"; });
  });

  /* ---------------------------------------------------- search */
  var searchInput = document.getElementById("search-input");
  var box = document.getElementById("search-results");
  var index = window.SEARCH_INDEX || [];
  var sel = -1;

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function highlight(text, terms) {
    var out = esc(text);
    terms.forEach(function (term) {
      if (!term) return;
      var re = new RegExp(esc(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      out = out.replace(re, function (m) { return "<mark>" + m + "</mark>"; });
    });
    return out;
  }
  function snippet(text, term) {
    var i = text.toLowerCase().indexOf(term.toLowerCase());
    if (i < 0) return text.slice(0, 90) + (text.length > 90 ? "…" : "");
    var start = Math.max(0, i - 30);
    return (start > 0 ? "…" : "") + text.slice(start, i + 70) + (i + 70 < text.length ? "…" : "");
  }
  function search(q) {
    var terms = q.trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var l = lang();
    var res = [];
    index.forEach(function (it) {
      if ((it.l || "zh") !== l) return;
      var hay = (it.h + " " + it.t).toLowerCase();
      var score = 0;
      for (var k = 0; k < terms.length; k++) {
        var term = terms[k].toLowerCase();
        if (hay.indexOf(term) < 0) return;
        if (it.h.toLowerCase().indexOf(term) >= 0) score += 10;
        score += Math.min(5, hay.split(term).length - 1);
      }
      res.push({ it: it, score: score });
    });
    res.sort(function (a, b) { return b.score - a.score; });
    return res.slice(0, 12).map(function (r) { return r.it; });
  }
  function render(q) {
    var results = search(q);
    var terms = q.trim().split(/\s+/);
    sel = -1;
    if (!q.trim()) { box.hidden = true; searchInput.setAttribute("aria-expanded", "false"); return; }
    if (!results.length) {
      box.innerHTML = '<div class="sr-empty">' + esc(t("none").replace("%s", q)) + "</div>";
    } else {
      box.innerHTML = results.map(function (it) {
        return '<a role="option" href="' + root + it.u + '">' +
          '<div class="sr-page">' + esc(it.p) + "</div>" +
          '<div class="sr-head">' + highlight(it.h, terms) + "</div>" +
          '<div class="sr-snip">' + highlight(snippet(it.t, terms[0]), terms) + "</div></a>";
      }).join("");
    }
    box.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
  }
  function move(d) {
    var items = box.querySelectorAll("a");
    if (!items.length) return;
    sel = (sel + d + items.length) % items.length;
    items.forEach(function (a, i) { a.setAttribute("aria-selected", i === sel ? "true" : "false"); });
    items[sel].scrollIntoView({ block: "nearest" });
  }
  if (searchInput && box) {
    var timer;
    searchInput.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(function () { render(searchInput.value); }, 80); });
    searchInput.addEventListener("focus", function () { if (searchInput.value.trim()) render(searchInput.value); });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        var items = box.querySelectorAll("a");
        var target = items[sel >= 0 ? sel : 0];
        if (target) { e.preventDefault(); window.location.href = target.href; }
      } else if (e.key === "Escape") { box.hidden = true; searchInput.blur(); }
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".search")) box.hidden = true; });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== searchInput && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault(); searchInput.focus();
      }
    });
  }

  /* ---------------------------------------------------- init */
  applyLangChrome();
  paintProgress();
  setupScrollspy();
})();
