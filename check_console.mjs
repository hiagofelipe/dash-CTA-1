import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const consoleLogs = [];
const networkFails = [];

page.on('console', msg => consoleLogs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`));
page.on('pageerror', err => consoleLogs.push(`[PAGE ERROR] ${err.message}`));
page.on('response', r => { if (r.status() >= 400) networkFails.push(`${r.status()} ${r.url()}`); });

await page.goto('https://hiagofelipe.github.io/dash-CTA-1/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

const rootHTML = await page.evaluate(() => document.getElementById('root').innerHTML);
const title = await page.title();

console.log('TITLE:', title);
console.log('\n=== CONSOLE LOGS ===');
if (consoleLogs.length === 0) console.log('(none)');
consoleLogs.forEach(l => console.log(l));
console.log('\n=== NETWORK FAILURES ===');
if (networkFails.length === 0) console.log('(none)');
networkFails.forEach(f => console.log(f));
console.log('\n=== #root innerHTML (first 300 chars) ===');
console.log(rootHTML.slice(0, 300) || '(EMPTY)');

await browser.close();
