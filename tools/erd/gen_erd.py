"""Generate ERD SVG snippets using HKEAA symbols. Output is pasted into Markdown."""
import math

EW, EH = 116, 44      # entity box
RW, RH = 112, 60      # relationship diamond
AW, AH = 112, 40      # attribute ellipse


def _rect_edge(cx, cy, w, h, tx, ty):
    dx, dy = tx - cx, ty - cy
    if dx == 0 and dy == 0:
        return cx, cy
    s = min((w / 2) / abs(dx) if dx else 1e9, (h / 2) / abs(dy) if dy else 1e9)
    return cx + dx * s, cy + dy * s


def _diamond_edge(cx, cy, w, h, tx, ty):
    dx, dy = tx - cx, ty - cy
    s = 1 / (abs(dx) / (w / 2) + abs(dy) / (h / 2))
    return cx + dx * s, cy + dy * s


def _ellipse_edge(cx, cy, w, h, tx, ty):
    dx, dy = tx - cx, ty - cy
    s = 1 / math.sqrt((dx / (w / 2)) ** 2 + (dy / (h / 2)) ** 2)
    return cx + dx * s, cy + dy * s


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


class ERD:
    def __init__(self, width, height, label):
        self.w, self.h, self.label = width, height, label
        self.nodes = {}
        self.parts = []

    def entity(self, key, x, y, text):
        self.nodes[key] = ("e", x, y)
        self.parts.append(
            f'<rect class="shape" x="{f(x-EW/2)}" y="{f(y-EH/2)}" width="{EW}" height="{EH}"/>'
            f'<text x="{f(x)}" y="{f(y+5)}">{text}</text>')

    def rel(self, key, x, y, text):
        self.nodes[key] = ("r", x, y)
        pts = f"{f(x-RW/2)},{f(y)} {f(x)},{f(y-RH/2)} {f(x+RW/2)},{f(y)} {f(x)},{f(y+RH/2)}"
        self.parts.append(f'<polygon class="shape" points="{pts}"/>'
                          f'<text x="{f(x)}" y="{f(y+5)}">{text}</text>')

    def attr(self, key, x, y, text, entity, key_attr=False):
        self.nodes[key] = ("a", x, y)
        ex, ey = self._edge(entity, x, y)
        ax, ay = _ellipse_edge(x, y, AW, AH, *self.nodes[entity][1:])
        self.parts.insert(0, f'<line class="link" x1="{f(ex)}" y1="{f(ey)}" x2="{f(ax)}" y2="{f(ay)}"/>')
        deco = ""
        self.parts.append(f'<ellipse class="shape" cx="{f(x)}" cy="{f(y)}" rx="{AW/2}" ry="{AH/2}"/>'
                          f'<text x="{f(x)}" y="{f(y+5)}"{deco}>{text}</text>')
        if key_attr:  # underline drawn explicitly for consistent rendering
            n = len(text)
            half = n * 7.5 if not text.isascii() else n * 4.4
            self.parts.append(f'<line class="link" x1="{f(x-half)}" y1="{f(y+9)}" x2="{f(x+half)}" y2="{f(y+9)}"/>')

    def _edge(self, key, tx, ty):
        kind, x, y = self.nodes[key]
        if kind == "e":
            return _rect_edge(x, y, EW, EH, tx, ty)
        if kind == "r":
            return _diamond_edge(x, y, RW, RH, tx, ty)
        return _ellipse_edge(x, y, AW, AH, tx, ty)

    def link(self, ent, rel, card, part, side=1):
        """Line between entity and relationship; card ('1','M','N') and part ('|','O') sit beside the entity.
        side chooses which side of the line the cardinality label goes (1 or -1)."""
        _, ex0, ey0 = self.nodes[ent]
        _, rx0, ry0 = self.nodes[rel]
        ex, ey = self._edge(ent, rx0, ry0)
        rx, ry = self._edge(rel, ex0, ey0)
        self.parts.insert(0, f'<line class="link" x1="{f(ex)}" y1="{f(ey)}" x2="{f(rx)}" y2="{f(ry)}"/>')
        L = math.hypot(rx - ex, ry - ey)
        ux, uy = (rx - ex) / L, (ry - ey) / L
        px, py = -uy, ux
        mx, my = ex + ux * 16, ey + uy * 16
        if part == "|":
            self.parts.append(f'<line class="mark" x1="{f(mx+px*9)}" y1="{f(my+py*9)}" '
                              f'x2="{f(mx-px*9)}" y2="{f(my-py*9)}"/>')
        elif part == "O":
            mx, my = ex + ux * 20, ey + uy * 20
            self.parts.append(f'<circle class="shape" cx="{f(mx)}" cy="{f(my)}" r="6.5"/>')
        if card:
            # label above a mostly horizontal line, left of a mostly vertical line
            if abs(uy) < 0.6:
                side = 1 if py < 0 else -1
            else:
                side = 1 if px < 0 else -1
            lx, ly = ex + ux * 22 + px * 16 * side, ey + uy * 22 + py * 16 * side
            self.parts.append(f'<text class="card" x="{f(lx)}" y="{f(ly+5)}">{card}</text>')

    def raw(self, s):
        self.parts.append(s)

    def svg(self, caption):
        body = "".join(self.parts)
        return (f'<figure class="erd">\n<svg viewBox="0 0 {self.w} {self.h}" role="img" aria-label="{self.label}">'
                f'{body}</svg>\n<figcaption>{caption}</figcaption>\n</figure>')
