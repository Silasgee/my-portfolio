# Able's Noodles — A4 Flyer

Print-ready A4 portrait flyer for **Able's Noodles**, Marian, by Old Ikang, Calabar.

## Files

| File | What it is |
|---|---|
| `flyer-a4.pdf` | **Print this.** A4 (210 × 297 mm), full-bleed backgrounds, fonts embedded. |
| `flyer-a4-300dpi.png` | 2481 × 3509 px raster export (true 300 DPI) for digital sharing or print shops that prefer images. |
| `flyer.html` | Self-contained source of the above — open in any browser, print at 100% scale on A4 with margins set to *None*. Fonts and all graphics are embedded; no internet needed. |
| `flyer-photo.html` | Alternate hero: swaps the vector bowl illustration for an AI-generated food photograph (loaded from a remote URL — needs internet the first time you open it). Print via the browser the same way. |
| `flyer-motion.mp4` | 11-second animated version of the flyer (1588 × 2246, H.264, 30 fps, silent) — ready for WhatsApp status, Instagram, or a screen at the stall. |
| `src/` | Editable source: layout template, bowl-illustration generator, build + export scripts, fonts (Anton & Montserrat, both OFL-licensed). |

## Menu & contacts (as printed)

- Egg Noodles (noodles + fried egg) — ₦1,400
- Double Egg Noodles — ₦1,700
- Noodles & Suya — ₦2,700
- Make It Spicy — free
- Your Own Combo — customer specifies ("Just Ask")
- Call / WhatsApp: **0708 206 8174**

## Before you print — confirm

- **Instagram**: `@ablesnoodles` — confirm the handle
- **QR code**: a real, scannable code pointing to `instagram.com/ablesnoodles`. Regenerate if you want it to point elsewhere (see `src/`, the QR is `src/qr.svg`).

All of these live in plain HTML in `flyer.html` (search for the text) — edit, then re-export.

## Rebuilding after edits

```bash
cd src
python3 gen_bowl.py     # regenerates the bowl illustration (optional)
python3 build.py        # assembles flyer.html + flyer-photo.html
node export.js flyer.html   # exports 300-DPI PNG + A4 PDF (needs playwright + chromium)
python3 motion_build.py     # assembles the animated motion.html
node capture.js             # renders 330 frames; encode with:
# ffmpeg -framerate 30 -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 21 flyer-motion.mp4
```

## Design system

- **Palette**: ink `#111111`, gold `#FFC107`, orange `#F57C00`, chili red `#D62828`, paper `#FFF8F0`
- **Type**: Anton (display) + Montserrat 500/700/800 (text) — both SIL Open Font License
- **Format**: A4 trim, backgrounds run to the edge. If your printer needs bleed, export at 216 × 303 mm and the page background extends safely.
