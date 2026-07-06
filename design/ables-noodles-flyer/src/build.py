#!/usr/bin/env python3
"""Assemble self-contained flyer HTML variants from template + assets."""
import pathlib

d = pathlib.Path(__file__).parent
tpl = (d / "template.html").read_text()

tpl = tpl.replace("%%ANTON%%", (d / "fonts/anton.ttf.b64").read_text().strip())
tpl = tpl.replace("%%M500%%", (d / "fonts/montserrat-500.ttf.b64").read_text().strip())
tpl = tpl.replace("%%M700%%", (d / "fonts/montserrat-700.ttf.b64").read_text().strip())
tpl = tpl.replace("%%M800%%", (d / "fonts/montserrat-800.ttf.b64").read_text().strip())
tpl = tpl.replace("%%QR%%", (d / "qr.svg").read_text().strip())

# variant 1: vector illustration hero (fully self-contained, print-canonical)
bowl = (d / "bowl.svg").read_text()
hero_css = """
  .bowl{ position:absolute; right:26px; top:50%; transform:translateY(-50%); height:300px; z-index:2; }
"""
v1 = tpl.replace("%%HERO_CSS%%", hero_css).replace("%%HERO%%", bowl)
(d / "flyer.html").write_text(v1)

# variant 2: AI photo hero (remote URL — loads outside the sandbox)
photo_url = ("https://d8j0ntlcm91z4.cloudfront.net/user_3G7hDG6m6vVUCBfTtPO0uLqntyO/"
             "hf_20260706_174940_5dcd734d-c0c4-44ba-a3a1-4d2aa39f685e.png")
hero_css2 = """
  .hero-photo{ position:absolute; right:-6px; top:50%; transform:translateY(-50%); height:376px; z-index:2;
    -webkit-mask-image:radial-gradient(circle at center, #000 55%, transparent 72%);
    mask-image:radial-gradient(circle at center, #000 55%, transparent 72%); }
"""
v2 = tpl.replace("%%HERO_CSS%%", hero_css2).replace(
    "%%HERO%%", f'<img class="hero-photo" src="{photo_url}" alt="Bowl of loaded noodles">')
(d / "flyer-photo.html").write_text(v2)

print("built flyer.html", len(v1), "bytes; flyer-photo.html", len(v2), "bytes")
