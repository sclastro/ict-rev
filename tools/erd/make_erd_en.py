import sys, json, re
sys.path.insert(0, __import__("os").path.dirname(__file__))
from gen_erd import ERD, f

out = {}

# D1: symbol sheet
d = ERD(660, 300, "ER diagram symbols")
rows = [("Entity", "entity"), ("Attribute", "attr"), ("Key attribute", "key"), ("Relationship", "rel")]
for i, (lab, kind) in enumerate(rows):
    y = 40 + i * 72
    d.raw(f'<text class="lab" x="12" y="{y+5}">{lab}</text>')
    if kind == "entity":
        d.entity(f"s{i}", 190, y, "Entity")
    elif kind == "attr":
        d.raw(f'<ellipse class="shape" cx="190" cy="{y}" rx="56" ry="20"/><text x="190" y="{y+5}">Attribute</text>')
    elif kind == "key":
        d.raw(f'<ellipse class="shape" cx="190" cy="{y}" rx="56" ry="20"/><text x="190" y="{y+5}">Attribute</text>'
              f'<line class="link" x1="155" y1="{y+9}" x2="225" y2="{y+9}"/>')
    else:
        d.rel(f"s{i}", 190, y, "Relationship")
pairs = [("One-to-one", "1", "1", None), ("One-to-many", "1", "M", None), ("Many-to-many", "M", "N", None), ("Participation", None, None, "p")]
for i, (lab, a, b, p) in enumerate(pairs):
    y = 40 + i * 72
    d.raw(f'<text class="lab" x="300" y="{y+5}">{lab}</text>')
    d.raw(f'<line class="link" x1="412" y1="{y}" x2="642" y2="{y}"/>')
    pts = f"465,{y} 521,{y-27} 577,{y} 521,{y+27}"
    d.raw(f'<polygon class="shape" points="{pts}"/><text x="521" y="{y+5}">Relationship</text>')
    if a:
        d.raw(f'<text class="card" x="437" y="{y-8}">{a}</text><text class="card" x="612" y="{y-8}">{b}</text>')
    else:
        d.raw(f'<line class="mark" x1="432" y1="{y-9}" x2="432" y2="{y+9}"/>'
              f'<circle class="shape" cx="615" cy="{y}" r="6.5"/>')
d.raw('<line class="link" x1="282" y1="10" x2="282" y2="290" stroke-dasharray="3 4"/>')
out["d1"] = d.svg("ER diagram symbols printed at the end of the HKEAA paper (redrawn). Participation: \"|\" on the mandatory side, \"O\" on the optional side.")

# D2: reading example
d = ERD(640, 120, "ER diagram of members submitting complaints")
d.entity("m", 80, 60, "Member")
d.rel("r", 320, 60, "submits")
d.entity("c", 560, 60, "Complaint")
d.link("m", "r", "1", "|", -1)
d.link("c", "r", "M", "O", -1)
out["d2"] = d.svg("\"1\" and \"|\" beside Member: each complaint is submitted by <strong>exactly one</strong> member. \"M\" and \"O\" beside Complaint: each member submits <strong>zero or more</strong> complaints.")

# D3: worked scenario
d = ERD(640, 300, "ER diagram of residents, bookings and facilities")
d.entity("res", 80, 60, "Resident")
d.rel("r1", 320, 60, "makes")
d.entity("bk", 560, 60, "Booking")
d.rel("r2", 560, 165, "involves")
d.entity("fac", 560, 260, "Facility")
d.link("res", "r1", "1", "|", -1)
d.link("bk", "r1", "M", "O", -1)
d.link("bk", "r2", "M", "O", 1)
d.link("fac", "r2", "1", "|", 1)
out["d3"] = d.svg("ER diagram of the clubhouse booking system: Resident to Booking is one-to-many; Booking to Facility is many-to-one.")

# D4: M:N before decomposition
d = ERD(640, 120, "Many-to-many relationship between students and clubs")
d.entity("s", 80, 60, "Student")
d.rel("r", 320, 60, "joins")
d.entity("c", 560, 60, "Club")
d.link("s", "r", "M", "|", -1)
d.link("c", "r", "N", "O", -1)
out["d4"] = d.svg("Before resolution: each student joins zero or more clubs (N and O beside Club); each club has at least one student (M and | beside Student).")

# D5: after decomposition
d = ERD(660, 300, "ER diagram after resolution")
d.entity("s", 75, 60, "Student")
d.rel("r1", 330, 60, "has")
d.entity("j", 585, 60, "Membership")
d.rel("r2", 585, 165, "belongs to")
d.entity("c", 585, 260, "Club")
d.link("s", "r1", "1", "|", -1)
d.link("j", "r1", "M", "O", -1)
d.link("j", "r2", "M", "|", 1)
d.link("c", "r2", "1", "|", 1)
out["d5"] = d.svg("After resolution: both original entities have \"1\" and \"|\" beside them. The \"O\" that was beside Club moves to the \"has\" side of Membership; the \"|\" that was beside Student moves to the \"belongs to\" side.")

# D6: entity with attributes
d = ERD(640, 200, "The entity Student and its attributes")
d.entity("s", 320, 105, "Student")
d.attr("a1", 110, 40, "Student ID", "s", key_attr=True)
d.attr("a2", 320, 25, "Name", "s")
d.attr("a3", 530, 40, "Birth date", "s")
d.attr("a4", 160, 175, "Class", "s")
d.attr("a5", 480, 175, "Class no.", "s")
out["d6"] = d.svg("The entity Student and its attributes. The key attribute Student ID is underlined.")

for k in out:  # long English labels inside diamonds use a smaller font
    for w in ("Relationship", "belongs to"):
        out[k] = re.sub(rf'(<text x="[\d.]+" y="[\d.]+")>{w}</text>', rf'\1 class="small">{w}</text>', out[k])
json.dump(out, open(__import__("os").path.join(__import__("os").path.dirname(__file__), "erd_en.json"), "w"), ensure_ascii=False)
