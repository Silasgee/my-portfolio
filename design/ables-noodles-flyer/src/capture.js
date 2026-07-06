// Render motion.html to PNG frames by stepping all CSS animations deterministically.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FPS = 30, DURATION = 11.0; // seconds

(async () => {
  const outDir = path.join(__dirname, 'frames');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir);

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(__dirname, 'motion.html'));
  await page.waitForTimeout(300);
  await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));

  const total = Math.round(FPS * DURATION);
  for (let i = 0; i < total; i++) {
    const ms = (i / FPS) * 1000;
    await page.evaluate(ms => {
      document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; });
    }, ms);
    await page.screenshot({
      path: path.join(outDir, `f${String(i).padStart(4, '0')}.png`),
      clip: { x: 0, y: 0, width: 794, height: 1123 },
    });
    if (i % 60 === 0) console.log(`frame ${i}/${total}`);
  }
  await browser.close();
  console.log(`done: ${total} frames at ${FPS}fps`);
})();
