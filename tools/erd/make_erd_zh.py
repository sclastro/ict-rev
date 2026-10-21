import sys, json
sys.path.insert(0, __import__("os").path.dirname(__file__))
from gen_erd import ERD, f

out = {}

# D1: symbol sheet
d = ERD(660, 300, "實體關係圖符號")
rows = [("實體", "entity"), ("屬性", "attr"), ("主要屬性", "key"), ("關係", "rel")]
for i, (lab, kind) in enumerate(rows):
    y = 40 + i * 72
    d.raw(f'<text class="lab" x="12" y="{y+5}">{lab}</text>')
    if kind == "entity":
        d.entity(f"s{i}", 175, y, "實體")
    elif kind == "attr":
        d.raw(f'<ellipse class="shape" cx="175" cy="{y}" rx="56" ry="20"/><text x="175" y="{y+5}">屬性</text>')
    elif kind == "key":
        d.raw(f'<ellipse class="shape" cx="175" cy="{y}" rx="56" ry="20"/><text x="175" y="{y+5}">主要屬性</text>'
              f'<line class="link" x1="145" y1="{y+9}" x2="205" y2="{y+9}"/>')
    else:
        d.rel(f"s{i}", 175, y, "關係")
pairs = [("一對一", "1", "1", None), ("一對多", "1", "M", None), ("多對多", "M", "N", None), ("參與限制", None, None, "p")]
for i, (lab, a, b, p) in enumerate(pairs):
    y = 40 + i * 72
    d.raw(f'<text class="lab" x="300" y="{y+5}">{lab}</text>')
    d.raw(f'<line class="link" x1="400" y1="{y}" x2="642" y2="{y}"/>')
    pts = f"465,{y} 521,{y-27} 577,{y} 521,{y+27}"
    d.raw(f'<polygon class="shape" points="{pts}"/><text x="521" y="{y+5}">關係</text>')
    if a:
        d.raw(f'<text class="card" x="430" y="{y-8}">{a}</text><text class="card" x="612" y="{y-8}">{b}</text>')
    else:
        d.raw(f'<line class="mark" x1="425" y1="{y-9}" x2="425" y2="{y+9}"/>'
              f'<circle class="shape" cx="615" cy="{y}" r="6.5"/>')
d.raw('<line class="link" x1="282" y1="10" x2="282" y2="290" stroke-dasharray="3 4"/>')
out["d1"] = d.svg("考評局試卷末頁的實體關係圖符號（重繪）。參與限制：強制的一方用「|」，可選的一方用「O」。")

# D2: reading example
d = ERD(640, 120, "會員提交投訴的實體關係圖")
d.entity("m", 80, 60, "會員")
d.rel("r", 320, 60, "提交")
d.entity("c", 560, 60, "投訴")
d.link("m", "r", "1", "|", -1)
d.link("c", "r", "M", "O", -1)
out["d2"] = d.svg("「會員」旁的「1」和「|」：每宗投訴由<strong>剛好一名</strong>會員提交；「投訴」旁的「M」和「O」：每名會員提交<strong>零宗或多宗</strong>投訴。")

# D3: worked scenario
d = ERD(640, 300, "住戶、預訂和設施的實體關係圖")
d.entity("res", 80, 60, "住戶")
d.rel("r1", 320, 60, "提出")
d.entity("bk", 560, 60, "預訂")
d.rel("r2", 560, 165, "涉及")
d.entity("fac", 560, 260, "設施")
d.link("res", "r1", "1", "|", -1)
d.link("bk", "r1", "M", "O", -1)
d.link("bk", "r2", "M", "O", 1)
d.link("fac", "r2", "1", "|", 1)
out["d3"] = d.svg("屋苑會所預訂系統的實體關係圖：住戶與預訂是一對多，預訂與設施是多對一。")

# D4: M:N before decomposition
d = ERD(640, 120, "學生參加學會的多對多關係")
d.entity("s", 80, 60, "學生")
d.rel("r", 320, 60, "參加")
d.entity("c", 560, 60, "學會")
d.link("s", "r", "M", "|", -1)
d.link("c", "r", "N", "O", -1)
out["d4"] = d.svg("分解前：每名學生參加零個或多個學會（「學會」旁是 N、O）；每個學會最少有一名學生（「學生」旁是 M、|）。")

# D5: after decomposition
d = ERD(660, 300, "分解後的實體關係圖")
d.entity("s", 75, 60, "學生")
d.rel("r1", 330, 60, "擁有")
d.entity("j", 585, 60, "參加記錄")
d.rel("r2", 585, 165, "屬於")
d.entity("c", 585, 260, "學會")
d.link("s", "r1", "1", "|", -1)
d.link("j", "r1", "M", "O", -1)
d.link("j", "r2", "M", "|", 1)
d.link("c", "r2", "1", "|", 1)
out["d5"] = d.svg("分解後：新實體「參加記錄」兩邊都是「1」和「|」；原本在「學會」旁的「O」移到「擁有」一邊，原本在「學生」旁的「|」移到「屬於」一邊。")

# D6: entity with attributes
d = ERD(640, 200, "實體學生及其屬性")
d.entity("s", 320, 105, "學生")
d.attr("a1", 110, 40, "學生編號", "s", key_attr=True)
d.attr("a2", 320, 25, "姓名", "s")
d.attr("a3", 530, 40, "出生日期", "s")
d.attr("a4", 160, 175, "班別", "s")
d.attr("a5", 480, 175, "班號", "s")
out["d6"] = d.svg("實體「學生」及其屬性。主要屬性「學生編號」加底線。")

json.dump(out, open(__import__("os").path.join(__import__("os").path.dirname(__file__), "erd_zh.json"), "w"), ensure_ascii=False)
