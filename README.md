# ICT 溫習站

香港中學文憑考試資訊及通訊科技科（2025 年起新課程）溫習網站，設中文／英文切換。內容按《資訊及通訊科技課程及評估指引》的框架編排，涵蓋必修單元 A 至 E，以及選修二甲（數據庫）和二乙（網絡應用程式開發）。

## 目錄結構

```
content/            溫習內容（Markdown），每個課題一個檔案；英文版為同名的 .en.md
  core-a/           必修單元 A：index.md（概覽）、a.md 至 d.md（課題）
  exam/             考試攻略
  resources/        學習資源
site/
  site.json         網站結構：單元、課題、課時、對應的 Markdown 檔
  template.html     頁面範本
  assets/           樣式表（style.css）及互動功能（app.js）
build.py            建站程式：把 content/ 轉成 docs/ 內的網頁
docs/               生成的網站（由 GitHub Pages 發佈，請勿直接修改）
```

## 加入或修改內容

1. 在 `content/` 內新增或修改 Markdown 檔；英文版放在同一位置，檔名改為 `.en.md`（例如 `a.md` 與 `a.en.md`）。兩個版本的 `##` 章節數目須一致，切換語言時才能停留在同一節。課題頁由 `##` 標題開始，不用寫 `#` 頁面標題。
2. 在 `site/site.json` 對應課題加上 `"md": "路徑.md"`。未指定 `md` 的課題會顯示「內容整理中」。
3. 執行建站程式：

   ```
   pip install markdown
   python3 build.py
   ```

Markdown 特別寫法：

| 寫法 | 效果 |
|---|---|
| `> ⚠ …` | 黃色「常見失分」提示框 |
| `> ✔ …` | 綠色「高分寫法」提示框 |
| 其他 `> …` | 灰藍色備註框 |
| `<details><summary>題目</summary> 答案 </details>` | 自我檢測卡，可按「看答案」展開 |
| `- [ ] 項目` | 可剔選的清單，記錄儲存在瀏覽器 |

## 發佈（GitHub Pages）

在 GitHub 的 repo 頁面進入 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選要發佈的分支，資料夾選 **/docs**，然後按 Save。約一至兩分鐘後，網站會在 `https://sclastro.github.io/ict-rev/` 上線。
