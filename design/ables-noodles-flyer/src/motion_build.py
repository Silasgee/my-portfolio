#!/usr/bin/env python3
"""Build motion.html — the animated version of the flyer for video export."""
import pathlib

d = pathlib.Path(__file__).parent
t = (d / "template.html").read_text()

t = t.replace("%%ANTON%%", (d / "fonts/anton.ttf.b64").read_text().strip())
t = t.replace("%%M500%%", (d / "fonts/montserrat-500.ttf.b64").read_text().strip())
t = t.replace("%%M700%%", (d / "fonts/montserrat-700.ttf.b64").read_text().strip())
t = t.replace("%%M800%%", (d / "fonts/montserrat-800.ttf.b64").read_text().strip())
t = t.replace("%%QR%%", (d / "qr.svg").read_text().strip())

# hero: bowl illustration in an entrance wrapper; tag steam group for animation
bowl = (d / "bowl.svg").read_text()
bowl = bowl.replace('<g stroke="#FFF8F0" fill="none" stroke-linecap="round" filter="url(#steamBlur)">',
                    '<g class="steam" stroke="#FFF8F0" fill="none" stroke-linecap="round" filter="url(#steamBlur)">')
hero_css = """
  .bowl-wrap{ position:absolute; right:26px; top:50%; height:300px; width:300px; z-index:2;
              transform:translateY(-50%); }
  .bowl{ height:100%; width:auto; display:block; }
"""
t = t.replace("%%HERO_CSS%%", hero_css)
t = t.replace("%%HERO%%", '<div class="bowl-wrap">' + bowl + "</div>")

# wrap headline words for staggered entrance
old_h1 = '<h1>HOT<span class="dot">.</span> FRESH<span class="dot">.</span><br><span class="l2">LOADED<span class="dot">.</span></span></h1>'
new_h1 = ('<h1><span class="w w1">HOT<span class="dot">.</span></span> '
          '<span class="w w2">FRESH<span class="dot">.</span></span><br>'
          '<span class="w w3 l2">LOADED<span class="dot">.</span></span></h1>')
assert old_h1 in t
t = t.replace(old_h1, new_h1)

# animation choreography ------------------------------------------------------
anim = """
  /* ── motion choreography ─────────────────── */
  html,body{ background:var(--paper); }
  .page{ box-shadow:none; }

  @keyframes fadeDown{ from{ opacity:0; transform:translateY(-18px);} to{ opacity:1; transform:none;} }
  @keyframes fadeUp{ from{ opacity:0; transform:translateY(22px);} to{ opacity:1; transform:none;} }
  @keyframes fadeIn{ from{ opacity:0;} to{ opacity:1;} }
  @keyframes punchIn{ 0%{ opacity:0; transform:scale(1.6);} 60%{ opacity:1; transform:scale(.96);} 100%{ opacity:1; transform:scale(1);} }
  @keyframes spinIn{ 0%{ opacity:0; transform:rotate(-160deg) scale(.3);} 70%{ opacity:1; transform:rotate(12deg) scale(1.06);} 100%{ opacity:1; transform:rotate(0) scale(1);} }
  @keyframes slowSpin{ from{ transform:rotate(0);} to{ transform:rotate(360deg);} }
  @keyframes heroIn{ from{ opacity:0; transform:translateY(34px) scale(.985);} to{ opacity:1; transform:none;} }
  @keyframes bowlIn{ 0%{ opacity:0; transform:translateY(-50%) translateY(90px) scale(.9);}
                     70%{ opacity:1; transform:translateY(-50%) translateY(-8px) scale(1.015);}
                     100%{ opacity:1; transform:translateY(-50%) scale(1);} }
  @keyframes bob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-5px);} }
  @keyframes ruleGrow{ from{ width:0;} to{ width:44px;} }
  @keyframes steamRise{ 0%{ transform:translateY(10px); opacity:0;} 25%{ opacity:1;} 75%{ opacity:.85;} 100%{ transform:translateY(-26px); opacity:0;} }
  @keyframes qrPop{ 0%{ opacity:0; transform:scale(.5);} 70%{ opacity:1; transform:scale(1.08);} 100%{ opacity:1; transform:scale(1);} }
  @keyframes glowPulse{ 0%,100%{ text-shadow:0 0 0 rgba(255,193,7,0);} 50%{ text-shadow:0 0 18px rgba(255,193,7,.55);} }

  .brand{ animation:fadeDown .8s cubic-bezier(.2,.7,.3,1) 0s both; }
  .loc-chip{ animation:fadeDown .8s cubic-bezier(.2,.7,.3,1) .15s both; }
  .eyebrow{ animation:fadeIn .6s ease .5s both; }
  h1 .w{ display:inline-block; }
  h1 .w1{ animation:punchIn .55s cubic-bezier(.2,1.4,.4,1) .7s both; }
  h1 .w2{ animation:punchIn .55s cubic-bezier(.2,1.4,.4,1) .95s both; }
  h1 .w3{ animation:punchIn .6s cubic-bezier(.2,1.4,.4,1) 1.25s both; }
  .lede{ animation:fadeUp .7s ease 1.7s both; }
  .badge{ animation:spinIn 1s cubic-bezier(.2,.8,.3,1) 2s both; }
  .badge svg{ animation:slowSpin 14s linear 3s infinite; }
  .hero{ animation:heroIn .9s cubic-bezier(.2,.7,.3,1) 2.3s both; }
  .bowl-wrap{ animation:bowlIn 1.1s cubic-bezier(.2,.8,.3,1) 2.7s both; }
  .bowl{ animation:bob 4.5s ease-in-out 3.8s infinite; }
  .steam path{ animation:steamRise 3.2s ease-in-out infinite both; }
  .steam path:nth-child(1){ animation-delay:3.6s; }
  .steam path:nth-child(2){ animation-delay:4.1s; }
  .steam path:nth-child(3){ animation-delay:4.7s; }
  .steam-note{ animation:fadeIn .7s ease 3.3s both; }
  .hero-claim .rule{ animation:ruleGrow .6s cubic-bezier(.2,.7,.3,1) 3.5s both; }
  .hero-claim h2{ animation:fadeUp .7s ease 3.65s both; }
  .hero-claim p{ animation:fadeUp .7s ease 3.9s both; }
  .sec-head h3{ animation:fadeUp .6s ease 4.3s both; }
  .sec-head .line{ animation:fadeIn .6s ease 4.45s both; }
  .sec-head .spice{ animation:fadeIn .6s ease 4.6s both; }
  .menu-grid .mi:nth-child(1){ animation:fadeUp .55s ease 4.7s both; }
  .menu-grid .mi:nth-child(2){ animation:fadeUp .55s ease 4.85s both; }
  .menu-grid .mi:nth-child(3){ animation:fadeUp .55s ease 5.0s both; }
  .menu-grid .mi:nth-child(4){ animation:fadeUp .55s ease 5.15s both; }
  .menu-grid .mi:nth-child(5){ animation:fadeUp .55s ease 5.3s both; }
  .benefits{ animation:fadeIn .5s ease 5.6s both; }
  .benefits .ben:nth-child(1){ animation:fadeUp .5s ease 5.7s both; }
  .benefits .ben:nth-child(2){ animation:fadeUp .5s ease 5.8s both; }
  .benefits .ben:nth-child(3){ animation:fadeUp .5s ease 5.9s both; }
  .benefits .ben:nth-child(4){ animation:fadeUp .5s ease 6.0s both; }
  .benefits .ben:nth-child(5){ animation:fadeUp .5s ease 6.1s both; }
  .foot{ animation:fadeUp .85s cubic-bezier(.2,.7,.3,1) 6.3s both; }
  .qr-frame{ animation:qrPop .7s cubic-bezier(.2,1.2,.4,1) 6.9s both; }
  .qr-cap{ animation:fadeIn .6s ease 7.2s both; }
  .cta{ animation:glowPulse 3s ease-in-out 7.6s infinite; }
  .microfoot{ animation:fadeIn .7s ease 7.3s both; }
"""
t = t.replace("</style>", anim + "</style>")
(d / "motion.html").write_text(t)
print("motion.html", len(t), "bytes")
