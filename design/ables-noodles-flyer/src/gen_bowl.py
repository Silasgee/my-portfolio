#!/usr/bin/env python3
"""Generate the top-down noodle bowl SVG illustration for the Able's Noodles flyer."""
import math, random

random.seed(42)
CX, CY = 210, 225          # bowl centre in a 420x430 viewBox
NOODLE_R = 132             # radius of the noodle mass

def swirl_paths(n, seed):
    """Organic overlapping noodle strands: arcs with wobble, clipped to the bowl."""
    rnd = random.Random(seed)
    paths = []
    for i in range(n):
        r = rnd.uniform(28, NOODLE_R - 10)
        a0 = rnd.uniform(0, 2 * math.pi)
        sweep = rnd.uniform(1.4, 3.4)
        steps = 14
        pts = []
        wob_amp = rnd.uniform(4, 11)
        wob_freq = rnd.uniform(2, 5)
        wob_ph = rnd.uniform(0, 6.28)
        drift = rnd.uniform(-18, 18)
        for s in range(steps + 1):
            t = s / steps
            a = a0 + sweep * t
            rr = r + wob_amp * math.sin(wob_freq * a + wob_ph) + drift * t
            rr = max(14, min(NOODLE_R - 4, rr))
            pts.append((CX + rr * math.cos(a), CY + rr * math.sin(a) * 0.92))
        d = f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"
        for j in range(1, len(pts) - 1, 2):
            x1, y1 = pts[j]
            x2, y2 = pts[j + 1] if j + 1 < len(pts) else pts[j]
            d += f" Q{x1:.1f} {y1:.1f} {x2:.1f} {y2:.1f}"
        paths.append(d)
    return paths

strands = []
# base layer: darker, thicker strands for depth
for d in swirl_paths(26, 7):
    strands.append(f'<path d="{d}" fill="none" stroke="#C87D12" stroke-width="8.5" stroke-linecap="round"/>')
# mid layer: main golden noodles
for d in swirl_paths(30, 21):
    strands.append(f'<path d="{d}" fill="none" stroke="#F0A424" stroke-width="7.5" stroke-linecap="round"/>')
# top layer: lighter glossy strands
for d in swirl_paths(20, 99):
    strands.append(f'<path d="{d}" fill="none" stroke="#FFC24A" stroke-width="6.5" stroke-linecap="round"/>')
# gloss highlights riding on top strands
for d in swirl_paths(14, 99)[:12]:
    strands.append(f'<path d="{d}" fill="none" stroke="#FFE49A" stroke-width="2" stroke-linecap="round" opacity="0.85"/>')

NOODLES = "\n      ".join(strands)

# scattered garnish helpers -------------------------------------------------
rnd = random.Random(5)
def scatter(count, rmin, rmax):
    out = []
    for _ in range(count):
        a = rnd.uniform(0, 2 * math.pi)
        r = rnd.uniform(rmin, rmax)
        out.append((CX + r * math.cos(a), CY + r * math.sin(a) * 0.92))
    return out

spring_onions = "".join(
    f'<g transform="translate({x:.0f} {y:.0f}) rotate({rnd.uniform(0,360):.0f})">'
    f'<ellipse rx="6.5" ry="5.5" fill="#7CB342"/><ellipse rx="3.6" ry="3" fill="#DCEDC8"/></g>'
    for x, y in scatter(9, 30, 118))

chili_flakes = "".join(
    f'<rect x="{x:.0f}" y="{y:.0f}" width="4" height="2.6" rx="1.2" fill="#C62828" '
    f'transform="rotate({rnd.uniform(0,360):.0f} {x:.0f} {y:.0f})"/>'
    for x, y in scatter(14, 25, 122))

pepper_bits = []
for x, y in scatter(7, 40, 112):
    col = rnd.choice(["#D64545", "#D64545", "#4C8C3F"])
    pepper_bits.append(
        f'<rect x="{x:.0f}" y="{y:.0f}" width="20" height="4.6" rx="2.3" fill="{col}" '
        f'transform="rotate({rnd.uniform(0,360):.0f} {x:.0f} {y:.0f})"/>')
carrots = "".join(
    f'<rect x="{x:.0f}" y="{y:.0f}" width="16" height="3.4" rx="1.7" fill="#F57C00" '
    f'transform="rotate({rnd.uniform(0,360):.0f} {x:.0f} {y:.0f})"/>'
    for x, y in scatter(6, 45, 110))
PEPPERS = "".join(pepper_bits)

SVG = f'''<svg class="bowl" viewBox="0 0 420 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bowl of loaded noodles">
  <defs>
    <radialGradient id="bowlGlow" cx="50%" cy="42%" r="65%">
      <stop offset="0%" stop-color="#3a3a3c"/><stop offset="70%" stop-color="#232325"/><stop offset="100%" stop-color="#1a1a1c"/>
    </radialGradient>
    <radialGradient id="noodleBase" cx="45%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#E9A62B"/><stop offset="100%" stop-color="#C97F10"/>
    </radialGradient>
    <radialGradient id="yolk" cx="38%" cy="34%" r="70%">
      <stop offset="0%" stop-color="#FFC94D"/><stop offset="55%" stop-color="#F5A623"/><stop offset="100%" stop-color="#E08A0A"/>
    </radialGradient>
    <linearGradient id="stick" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C89B6A"/><stop offset="100%" stop-color="#9A6F42"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="steamBlur" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="4.5"/></filter>
    <clipPath id="noodleClip"><ellipse cx="{CX}" cy="{CY}" rx="{NOODLE_R + 6}" ry="{(NOODLE_R + 6) * 0.92:.0f}"/></clipPath>
  </defs>

  <!-- warm glow + shadow under bowl -->
  <ellipse cx="{CX}" cy="{CY + 14}" rx="196" ry="182" fill="#F57C00" opacity="0.10" filter="url(#soft)"/>
  <ellipse cx="{CX}" cy="{CY + 26}" rx="182" ry="164" fill="#000" opacity="0.55" filter="url(#soft)"/>

  <!-- bowl -->
  <ellipse cx="{CX}" cy="{CY}" rx="180" ry="167" fill="url(#bowlGlow)"/>
  <ellipse cx="{CX}" cy="{CY}" rx="180" ry="167" fill="none" stroke="#4a4a4e" stroke-width="1.4" opacity="0.9"/>
  <path d="M{CX - 178} {CY - 18} A178 165 0 0 1 {CX + 62} {CY - 163}" fill="none" stroke="#FFC107" stroke-width="2.4" opacity="0.35" stroke-linecap="round"/>
  <ellipse cx="{CX}" cy="{CY}" rx="152" ry="141" fill="#141414"/>

  <!-- noodles -->
  <ellipse cx="{CX}" cy="{CY}" rx="{NOODLE_R + 8}" ry="{(NOODLE_R + 8) * 0.92:.0f}" fill="url(#noodleBase)"/>
  <g clip-path="url(#noodleClip)">
      {NOODLES}
  </g>

  <!-- garnish under toppings -->
  <g clip-path="url(#noodleClip)">{PEPPERS}{carrots}</g>

  <!-- grilled sausage slices -->
  <g>
    <g transform="translate(268 262) rotate(-14)">
      <ellipse rx="30" ry="21" fill="#7E2F22"/><ellipse rx="25" ry="16.5" fill="#C4573B"/><ellipse rx="21" ry="13" fill="#D87A55"/>
      <path d="M-13 -5 L13 -8 M-14 1 L14 0 M-12 7 L12 8" stroke="#8A3526" stroke-width="2.8" stroke-linecap="round" opacity="0.9"/>
      <ellipse cx="-7" cy="-6" rx="7" ry="4" fill="#EFA57F" opacity="0.7"/>
    </g>
    <g transform="translate(148 300) rotate(18)">
      <ellipse rx="27" ry="19" fill="#7E2F22"/><ellipse rx="22.5" ry="15" fill="#C4573B"/><ellipse rx="19" ry="12" fill="#D87A55"/>
      <path d="M-11 -4 L11 -6 M-11 2 L11 1 M-9 7 L9 7" stroke="#8A3526" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
    </g>
    <g transform="translate(305 190) rotate(30)">
      <ellipse rx="24" ry="17" fill="#7E2F22"/><ellipse rx="20" ry="13.5" fill="#C4573B"/><ellipse rx="16.5" ry="10.5" fill="#D87A55"/>
      <path d="M-9 -4 L9 -5 M-9 1 L9 1 M-8 6 L8 6" stroke="#8A3526" stroke-width="2.2" stroke-linecap="round" opacity="0.9"/>
    </g>
  </g>

  <!-- grilled chicken pieces -->
  <g>
    <g transform="translate(128 178) rotate(-8)">
      <path d="M-30 -2 Q-26 -20 -4 -22 Q22 -24 30 -8 Q34 6 20 16 Q0 26 -18 18 Q-32 12 -30 -2 Z" fill="#9C5A1E"/>
      <path d="M-24 -4 Q-20 -16 -2 -17 Q18 -19 24 -6 Q27 4 16 12 Q0 19 -14 13 Q-25 8 -24 -4 Z" fill="#B5651D"/>
      <path d="M-16 -8 Q-4 -14 12 -9" stroke="#D68740" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-18 6 L14 9 M-12 -2 L18 2" stroke="#7A4212" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(232 138) rotate(14) scale(0.82)">
      <path d="M-30 -2 Q-26 -20 -4 -22 Q22 -24 30 -8 Q34 6 20 16 Q0 26 -18 18 Q-32 12 -30 -2 Z" fill="#9C5A1E"/>
      <path d="M-24 -4 Q-20 -16 -2 -17 Q18 -19 24 -6 Q27 4 16 12 Q0 19 -14 13 Q-25 8 -24 -4 Z" fill="#B5651D"/>
      <path d="M-16 -8 Q-4 -14 12 -9" stroke="#D68740" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M-18 6 L14 9" stroke="#7A4212" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    </g>
  </g>

  <!-- fried egg -->
  <g transform="translate(178 235)">
    <path d="M-52 4 Q-56 -26 -30 -38 Q-2 -50 28 -42 Q56 -34 54 -6 Q52 20 26 32 Q-2 44 -30 32 Q-50 24 -52 4 Z" fill="#FFF6E8"/>
    <path d="M-45 2 Q-48 -22 -26 -32 Q-2 -42 24 -35 Q48 -28 46 -5 Q44 16 22 26 Q-2 36 -26 26 Q-43 19 -45 2 Z" fill="#FFFDF8"/>
    <circle cx="-2" cy="-3" r="19" fill="url(#yolk)"/>
    <circle cx="-2" cy="-3" r="19" fill="none" stroke="#D98E12" stroke-width="1.4" opacity="0.7"/>
    <ellipse cx="-8.5" cy="-9.5" rx="6" ry="4" fill="#FFE9B0" opacity="0.95"/>
  </g>

  <!-- spring onion + chili on top -->
  <g clip-path="url(#noodleClip)">{spring_onions}{chili_flakes}</g>

  <!-- chopsticks resting on the rim -->
  <g transform="translate(0 0)">
    <rect x="252" y="26" width="9" height="188" rx="4.5" fill="url(#stick)" transform="rotate(36 256 30)"/>
    <rect x="270" y="30" width="9" height="182" rx="4.5" fill="url(#stick)" transform="rotate(30 274 34)"/>
  </g>

  <!-- steam -->
  <g stroke="#FFF8F0" fill="none" stroke-linecap="round" filter="url(#steamBlur)">
    <path d="M158 92 Q146 68 158 48 Q170 28 160 6" stroke-width="7" opacity="0.28"/>
    <path d="M208 84 Q196 58 210 38 Q222 20 212 -2" stroke-width="8" opacity="0.34"/>
    <path d="M258 96 Q248 74 260 54 Q272 34 264 14" stroke-width="6.5" opacity="0.26"/>
  </g>
</svg>'''

open("bowl.svg", "w").write(SVG)
print("bowl.svg written,", len(SVG), "bytes")
