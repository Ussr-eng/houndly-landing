import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Published guides must not ship with unverified markers; drafts may.
const dir = join(__dirname, '../src/content/guides');
const files = readdirSync(dir).filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'));

describe('guide content', () => {
  it.each(files)('%s: published guide has no TODO markers', (file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    const draft = /^draft:\s*true\s*$/m.test(text.split('\n---')[0] ?? '');
    if (!draft) expect(text).not.toMatch(/TODO/);
  });

  it.each(files)('%s: published guide has its social image', (file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    if (/^draft:\s*true\s*$/m.test(text)) return;
    const slug = /^slug:\s*(\S+)/m.exec(text)?.[1];
    expect(existsSync(join(__dirname, `../public/og/guides/${slug}.png`))).toBe(true);
  });

  it.each(files)('%s: links stay inside the site or go to https', (file) => {
    const text = readFileSync(join(dir, file), 'utf8');
    for (const [, href] of text.matchAll(/\]\(([^)]+)\)/g))
      expect(href).toMatch(/^(\/[a-z0-9/-]*\/(#[a-z0-9-]+)?|https:\/\/)/);
  });
});
