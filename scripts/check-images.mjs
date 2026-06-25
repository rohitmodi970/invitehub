import fs from 'fs';

const data = fs.readFileSync('lib/templates/data.ts', 'utf8');
const refs = [...new Set([...data.matchAll(/\/images\/templates\/([^'"]+)/g)].map((m) => m[1]))];
const existing = new Set(fs.readdirSync('public/images/templates'));
const missing = refs.filter((r) => !existing.has(r));
console.log(`Referenced: ${refs.length}, missing: ${missing.length}`);
missing.forEach((f) => console.log(`  MISSING: ${f}`));
