import { describe, expect, it } from 'vitest';
import { en } from '../src/i18n/en';

const texts = (): string[] =>
  en.privacy.sections.flatMap((section) => [
    section.heading,
    ...section.blocks.flatMap((block) =>
      'p' in block
        ? [block.p]
        : 'ul' in block
          ? block.ul
          : [...block.table.head, ...block.table.rows.flat()],
    ),
  ]);

describe('privacy policy text', () => {
  it('has no placeholders or unverified markers', () => {
    for (const text of [en.privacy.intro, ...texts()]) {
      expect(text).not.toMatch(/TODO|\[company|placeholder/i);
    }
  });

  it('links only to https or mailto targets', () => {
    for (const text of texts()) {
      for (const m of text.matchAll(/\]\(([^)]+)\)/g)) {
        expect(m[1]).toMatch(/^(https:\/\/|mailto:)/);
      }
    }
  });

  it('names no person as operator', () => {
    expect(texts().join(' ')).not.toMatch(/Dmytro|Slobodin/);
  });

  it('keeps the meta description within 155 characters', () => {
    expect(en.privacy.description.length).toBeLessThanOrEqual(155);
  });
});
