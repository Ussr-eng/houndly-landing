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
        companySize: '',
        currentProcess: '',
        sellsEu: '',
        note: '',
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
        ['product_type', 'iot'],
        ['laws', 'CRA'],
        ['laws', 'NIS2'],
        ['laws', 'CRA'],
        ['plan', 'team'],
        ['company_size', '10-49'],
        ['current_process', 'opsgenie'],
        ['sells_eu', 'unsure'],
        ['note', ' Night alerts '],
        ['source', '/pricing/'],
        ['news', 'yes'],
      ]),
    );
    expect(r.ok && r.data).toMatchObject({
      list: 'waitlist',
      laws: ['CRA', 'NIS2'],
      plan: 'team',
      companySize: '10-49',
      currentProcess: 'opsgenie',
      sellsEu: 'unsure',
      note: 'Night alerts',
      productType: 'iot',
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
        ['company_size', '1-9'],
        ['current_process', 'opsgenie'],
        ['sells_eu', 'yes'],
        ['note', 'x'],
      ]),
    );
    expect(
      r.ok && [r.data.plan, r.data.companySize, r.data.currentProcess, r.data.sellsEu, r.data.note],
    ).toEqual(['', '', '', '', '']);
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
      'unknown company size',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['company_size', '1000'],
      ],
      { companySize: 'invalid' },
    ],
    [
      'unknown on-call tool',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['current_process', 'A spreadsheet'],
      ],
      { currentProcess: 'invalid' },
    ],
    [
      'unknown EU answer',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['sells_eu', 'maybe'],
      ],
      { sellsEu: 'invalid' },
    ],
    [
      'long note',
      [
        ['list', 'waitlist'],
        ['email', 'a@b.eu'],
        ['note', 'x'.repeat(301)],
      ],
      { note: 'too_long' },
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
