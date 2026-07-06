// Export the flyer to a 300-DPI PNG and an A4 PDF using the pre-installed Chromium.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const file = process.argv[2] || 'flyer.html';
  const base = path.basename(file, '.html');
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // A4 = 794x1123 CSS px @96dpi; deviceScaleFactor 3.125 -> 2481x3509 ~ 300 DPI
  const page = await browser.newPage({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: 3.125,
  });
  await page.goto('file://' + path.resolve(__dirname, file));
  await page.waitForTimeout(400); // let fonts settle
  await page.screenshot({
    path: path.join(__dirname, `${base}-a4-300dpi.png`),
    clip: { x: 0, y: 0, width: 794, height: 1123 },
  });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: path.join(__dirname, `${base}-a4.pdf`),
    width: '210mm', height: '297mm', printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await browser.close();
  console.log(`exported ${base}-a4-300dpi.png + ${base}-a4.pdf`);
})();
