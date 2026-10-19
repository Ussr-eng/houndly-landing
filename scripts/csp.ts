// Post-build: add the Content-Security-Policy to dist/_headers with the sha256 hashes of every
// inline script in dist/. CSP_MODE=report writes Content-Security-Policy-Report-Only
// (pull-request previews); anything else enforces it.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildCsp, inlineScripts, insertCsp, originOf } from '../src/lib/csp.ts';
import { site } from '../src/config/site.ts';

const DIST = join(import.meta.dirname, '..', 'dist');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const hashes = new Set<string>();
for (const file of htmlFiles(DIST)) {
  for (const body of inlineScripts(readFileSync(file, 'utf8'))) {
    hashes.add(createHash('sha256').update(body, 'utf8').digest('base64'));
  }
}

const turnstile = site.turnstile.origin;
const mode = process.env['CSP_MODE'] === 'report' ? 'report' : 'enforce';
const policy = buildCsp({
  reportOnly: mode === 'report',
  scriptHashes: [...hashes],
  scriptHosts: [originOf(site.analytics.scriptSrc), turnstile],
  connectHosts: [...site.analytics.connectSrc, turnstile],
  frameHosts: [turnstile],
});
const header =
  mode === 'report' ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy';

const path = join(DIST, '_headers');
writeFileSync(path, insertCsp(readFileSync(path, 'utf8'), header, policy));
console.log(`csp: ${header} with ${hashes.size} inline script hash(es)`);
