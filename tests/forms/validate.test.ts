import { describe, expect, it } from 'vitest';
import { validateSubscribe } from '../../src/lib/forms/validate';

function form(entries: [string, string][]) {
  const fd = new FormData();
  for (const [k, v] of entries) fd.append(k, v);
  return fd;
}

describe('validateSubscribe', () => {
  it('accepts a minimal kit sign-up', () => {
    const r = validateSubscribe(
      form([
        ['list', 'kit'],
        ['email', ' Name@Company.com '],
      ]),
    );
    expect(r).toEqual({
      ok: true,
      data: {
        list: 'kit',
        email: 'name@company.com',
        company: '',
        productType: '',
        laws: [],
        currentProcess: '',
        plan: '',
        newsConsent: false,
        source: '',
      },
    });
  });

  it('reads all early-access fields', () => {
    const r = validateSubscribe(
      form([
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['company', 'Acme'],
        ['product_type', 'device'],
        ['laws', 'CRA'],
        ['laws', 'NIS2'],
        ['laws', 'CRA'],
        ['plan', 'team'],
        ['current_process', 'A spreadsheet'],
        ['source', '/pricing/'],
        ['news', 'yes'],
      ]),
    );
    expect(r.ok && r.data).toMatchObject({
      list: 'waitlist',
      laws: ['CRA', 'NIS2'],
      plan: 'team',
      currentProcess: 'A spreadsheet',
      productType: 'device',
      source: '/pricing/',
      // news consent exists only on the kit form
      newsConsent: false,
    });
  });

  it('stores news consent only when ticked on the kit form', () => {
    const on = validateSubscribe(
      form([
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['news', 'yes'],
      ]),
    );
    expect(on.ok && on.data.newsConsent).toBe(true);
  });

  it('ignores early-access fields on the kit form', () => {
    const r = validateSubscribe(
      form([
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['plan', 'team'],
        ['current_process', 'x'],
      ]),
    );
    expect(r.ok && [r.data.plan, r.data.currentProcess]).toEqual(['', '']);
  });

  it.each([
    ['missing email', [['list', 'kit']], { email: 'required' }],
    [
      'bad email',
      [
        ['list', 'kit'],
        ['email', 'not-an-email'],
      ],
      { email: 'invalid' },
    ],
    [
      'long email',
      [
        ['list', 'kit'],
        ['email', `${'a'.repeat(250)}@b.eu`],
      ],
      { email: 'too_long' },
    ],
    [
      'long company',
      [
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['company', 'x'.repeat(201)],
      ],
      { company: 'too_long' },
    ],
    [
      'unknown product type',
      [
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['product_type', 'car'],
      ],
      { productType: 'invalid' },
    ],
    [
      'unknown law',
      [
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['laws', 'DORA'],
      ],
      { laws: 'invalid' },
    ],
    [
      'free plan',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['plan', 'free'],
      ],
      { plan: 'invalid' },
    ],
    [
      'long answer',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['current_process', 'x'.repeat(1001)],
      ],
      { currentProcess: 'too_long' },
    ],
  ] as [string, [string, string][], Record<string, string>][])(
    'rejects %s',
    (_n, entries, errors) => {
      const r = validateSubscribe(form(entries));
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.errors).toEqual(errors);
    },
  );

  it('rejects an unknown list', () => {
    const r = validateSubscribe(
      form([
        ['list', 'newsletter'],
        ['email', 'a@b.eu'],
      ]),
    );
    expect(r).toEqual({ ok: false, list: null, errors: { list: 'invalid' } });
  });

  it('drops an unsafe source path', () => {
    const r = validateSubscribe(
      form([
        ['list', 'kit'],
        ['email', 'a@b.eu'],
        ['source', 'https://evil'],
      ]),
    );
    expect(r.ok && r.data.source).toBe('');
  });
});
