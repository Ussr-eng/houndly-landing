import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { en } from '../src/i18n/en';

// Every FAQ "Read the guide" link must point to a published guide.
const links = en.faqPage.groups.flatMap((g) =>
  g.items.flatMap((i) => ('link' in i && i.link ? [i.link] : [])),
);

describe('FAQ page', () => {
  it('links to guides', () => {
    expect(links.length).toBeGreaterThan(0);
  });

  it.each(links)('%s is a published guide', (link) => {
    const slug = /^\/guides\/([a-z0-9-]+)\/$/.exec(link)?.[1];
    expect(slug).toBeDefined();
    const file = join(__dirname, '../src/content/guides', `${slug}.md`);
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file, 'utf8')).not.toMatch(/^draft:\s*true\s*$/m);
  });
});
