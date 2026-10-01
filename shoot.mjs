import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:5190/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
  console.log(name, 'ok');
  await ctx.close();
}
await b.close();
