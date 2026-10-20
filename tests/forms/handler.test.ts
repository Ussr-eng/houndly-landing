import { describe, expect, it, vi } from 'vitest';
import { handleSubscribe, type Deps, type SubscribeEnv } from '../../src/lib/forms/handler';
import { brevoAttributes, safeErrorText } from '../../src/lib/forms/provider';

const BREVO_ENV: SubscribeEnv = {
  FORM_PROVIDER: 'brevo',
  BREVO_API_KEY: 'key',
  BREVO_LIST_KIT: '3',
  BREVO_LIST_WAITLIST: '4',
  BREVO_TEMPLATE_KIT: '10',
  BREVO_TEMPLATE_WAITLIST: '11',
  TURNSTILE_SECRET_KEY: 'secret',
};

function request(entries: [string, string][], json = false, method = 'POST') {
  const body = new FormData();
  for (const [k, v] of entries) body.append(k, v);
  return new Request('https://example.com/api/subscribe', {
    method,
    ...(method === 'POST' ? { body } : {}),
    headers: json ? { accept: 'application/json' } : {},
  });
}

function deps(responses: Record<string, Response | (() => Response)> = {}) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const log = vi.fn();
  const d: Deps = {
    fetch: (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, ...(init ? { init } : {}) });
      const r = Object.entries(responses).find(([k]) => url.startsWith(k))?.[1];
      if (!r) throw new Error(`unexpected fetch ${url}`);
      return typeof r === 'function' ? r() : r.clone();
    }) as typeof fetch,
    now: () => new Date('2026-10-19T10:00:00Z'),
    log,
  };
  return { d, calls, log };
}

const ok201 = new Response(null, { status: 201 });
const turnstileOk = () => Response.json({ success: true });
const turnstileBad = () => Response.json({ success: false });
const valid: [string, string][] = [
  ['list', 'kit'],
  ['email', 'person@company.eu'],
  ['company', 'Acme'],
  ['source', '/incident-kit/'],
  ['elapsed', '8000'],
];

describe('handleSubscribe', () => {
  it('rejects other methods', async () => {
    const { d } = deps();
    const res = await handleSubscribe(request([], false, 'GET'), BREVO_ENV, d);
    expect(res.status).toBe(405);
  });

  it('subscribes through Brevo with double opt-in and redirects without JavaScript', async () => {
    const { d, calls } = deps({ 'https://api.brevo.com/': ok201 });
    const res = await handleSubscribe(request(valid), BREVO_ENV, d);
    expect(res.status).toBe(303);
    expect(res.headers.get('location')).toBe('https://example.com/incident-kit/check-email/');
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toBe('https://api.brevo.com/v3/contacts/doubleOptinConfirmation');
    const init = calls[0]?.init;
    expect((init?.headers as Record<string, string>)['api-key']).toBe('key');
    expect(JSON.parse(String(init?.body))).toEqual({
      email: 'person@company.eu',
      attributes: {
        COMPANY: 'Acme',
        SOURCE: 'kit:/incident-kit/',
        CONSENT_VERSION: '2026-10-19',
        NEWS_CONSENT: false,
        SIGNUP_AT: '2026-10-19T10:00:00.000Z',
      },
      includeListIds: [3],
      templateId: 10,
      redirectionUrl: 'https://example.com/incident-kit/confirmed/',
    });
  });

  it('uses the early-access list, template and confirmation page', async () => {
    const { d, calls } = deps({ 'https://api.brevo.com/': ok201 });
    const res = await handleSubscribe(
      request(
        [
          ['list', 'waitlist'],
          ['email', 'a@b.eu'],
          ['plan', 'team'],
        ],
        true,
      ),
      BREVO_ENV,
      d,
    );
    expect(await res.json()).toEqual({ ok: true });
    const body = JSON.parse(String(calls[0]?.init?.body));
    expect([
      body.includeListIds,
      body.templateId,
      body.redirectionUrl,
      body.attributes.PLAN,
    ]).toEqual([[4], 11, 'https://example.com/pricing/confirmed/', 'team']);
  });

  it('answers JSON with field errors for invalid input', async () => {
    const { d, calls } = deps();
    const res = await handleSubscribe(
      request(
        [
          ['list', 'kit'],
          ['email', 'nope'],
        ],
        true,
      ),
      BREVO_ENV,
      d,
    );
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'invalid', fields: { email: 'invalid' } });
    expect(calls).toHaveLength(0);
  });

  it('redirects to the error page for invalid input without JavaScript', async () => {
    const { d } = deps();
    const res = await handleSubscribe(request([['list', 'kit']]), BREVO_ENV, d);
    expect(res.headers.get('location')).toBe('https://example.com/form-error/invalid/');
  });

  it.each([
    ['honeypot', [...valid, ['website', 'http://spam']]],
    ['too fast', [...valid.filter(([k]) => k !== 'elapsed'), ['elapsed', '800']]],
  ] as [string, [string, string][]][])('drops %s silently, like a success', async (_n, entries) => {
    const { d, calls, log } = deps();
    const res = await handleSubscribe(request(entries, true), BREVO_ENV, d);
    expect(await res.json()).toEqual({ ok: true });
    expect(calls).toHaveLength(0);
    expect(log).toHaveBeenCalledWith('subscribe_dropped', expect.anything());
  });

  it('verifies a Turnstile token without sending the IP', async () => {
    const { d, calls } = deps({
      'https://challenges.cloudflare.com/': turnstileOk,
      'https://api.brevo.com/': ok201,
    });
    const res = await handleSubscribe(
      request([...valid, ['cf-turnstile-response', 'tok']], true),
      BREVO_ENV,
      d,
    );
    expect(await res.json()).toEqual({ ok: true });
    const sent = calls[0]?.init?.body as FormData;
    expect(sent.get('response')).toBe('tok');
    expect(sent.get('remoteip')).toBeNull();
  });

  it('rejects a failed Turnstile check', async () => {
    const { d, calls } = deps({ 'https://challenges.cloudflare.com/': turnstileBad });
    const res = await handleSubscribe(
      request([...valid, ['cf-turnstile-response', 'tok']], true),
      BREVO_ENV,
      d,
    );
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ ok: false, error: 'verification' });
    expect(calls).toHaveLength(1);
  });

  it('reports "unavailable" when no provider is configured', async () => {
    const { d, log } = deps();
    const res = await handleSubscribe(request(valid, true), {}, d);
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ ok: false, error: 'unavailable' });
    expect(log).toHaveBeenCalledWith('subscribe_unconfigured');
  });

  it('reports "unavailable" when Brevo is missing a setting', async () => {
    const { d } = deps();
    const res = await handleSubscribe(
      request(valid, true),
      { ...BREVO_ENV, BREVO_TEMPLATE_KIT: '' },
      d,
    );
    expect(res.status).toBe(503);
  });

  it('maps provider errors to "unavailable" and logs Brevo\'s code and message', async () => {
    const { d, log } = deps({
      'https://api.brevo.com/': Response.json(
        { code: 'invalid_parameter', message: 'Invalid template id' },
        { status: 400 },
      ),
    });
    const res = await handleSubscribe(request(valid), BREVO_ENV, d);
    expect(res.headers.get('location')).toBe('https://example.com/form-error/unavailable/');
    expect(log).toHaveBeenCalledWith('subscribe_provider_error', {
      provider: 'brevo',
      status: 400,
      code: 'invalid_parameter',
      message: 'Invalid template id',
    });
  });

  it("redacts email addresses in Brevo's error message", async () => {
    const { d, log } = deps({
      'https://api.brevo.com/': Response.json(
        { code: 'invalid_parameter', message: 'Contact person@company.eu is blacklisted' },
        { status: 400 },
      ),
    });
    await handleSubscribe(request(valid), BREVO_ENV, d);
    expect(log).toHaveBeenCalledWith(
      'subscribe_provider_error',
      expect.objectContaining({ message: 'Contact [redacted] is blacklisted' }),
    );
  });

  it.each([
    ['an empty body', () => new Response(null, { status: 400 })],
    ['a non-JSON body', () => new Response('<html>Bad request</html>', { status: 400 })],
    ['a body without code or message', () => Response.json({ error: 1 }, { status: 400 })],
  ])('logs only the status for %s', async (_n, response) => {
    const { d, log } = deps({ 'https://api.brevo.com/': response });
    await handleSubscribe(request(valid), BREVO_ENV, d);
    expect(log).toHaveBeenCalledWith('subscribe_provider_error', {
      provider: 'brevo',
      status: 400,
    });
  });

  it('logs status 0 when the request to Brevo fails', async () => {
    const { d, log } = deps({
      'https://api.brevo.com/': () => {
        throw new Error('network');
      },
    });
    const res = await handleSubscribe(request(valid, true), BREVO_ENV, d);
    expect(res.status).toBe(502);
    expect(log).toHaveBeenCalledWith('subscribe_provider_error', { provider: 'brevo', status: 0 });
  });

  it('sends the fields with the types Brevo documents', async () => {
    // POST /v3/contacts/doubleOptinConfirmation: email (string), includeListIds (array of
    // integers), templateId (integer), redirectionUrl (absolute URL); attribute values are
    // strings, integers, arrays of strings or booleans.
    const { d, calls } = deps({ 'https://api.brevo.com/': ok201 });
    await handleSubscribe(request([...valid, ['news', 'yes']]), BREVO_ENV, d);
    const body = JSON.parse(String(calls[0]?.init?.body));
    expect(Object.keys(body).sort()).toEqual(
      ['attributes', 'email', 'includeListIds', 'redirectionUrl', 'templateId'].sort(),
    );
    expect(Number.isInteger(body.templateId)).toBe(true);
    expect(body.includeListIds.every(Number.isInteger)).toBe(true);
    expect(new URL(body.redirectionUrl).protocol).toBe('https:');
    expect(body.attributes.NEWS_CONSENT).toBe(true);
    for (const v of Object.values(body.attributes))
      expect(typeof v === 'boolean' || (typeof v === 'string' && v !== '')).toBe(true);
  });

  it('accepts everything with the fake provider and calls nothing', async () => {
    const { d, calls } = deps();
    const res = await handleSubscribe(request(valid, true), { FORM_PROVIDER: 'fake' }, d);
    expect(await res.json()).toEqual({ ok: true });
    expect(calls).toHaveLength(0);
  });

  it('never logs the email address or other fields', async () => {
    const { d, log } = deps({
      'https://api.brevo.com/': () =>
        Response.json({ code: 'x', message: 'person@company.eu' }, { status: 500 }),
    });
    await handleSubscribe(request([...valid, ['website', 'x']]), BREVO_ENV, d);
    await handleSubscribe(request(valid), BREVO_ENV, d);
    await handleSubscribe(request(valid), {}, d);
    const logged = JSON.stringify(log.mock.calls);
    expect(logged).not.toContain('person@company.eu');
    expect(logged).not.toContain('Acme');
  });

  it('rejects oversized bodies', async () => {
    const { d } = deps();
    const req = new Request('https://example.com/api/subscribe', {
      method: 'POST',
      body: 'x',
      headers: { 'content-length': String(64 * 1024) },
    });
    expect((await handleSubscribe(req, BREVO_ENV, d)).status).toBe(413);
  });
});

describe('brevoAttributes', () => {
  it('stores news consent and the consent version', () => {
    const attrs = brevoAttributes({
      at: '2026-10-19T10:00:00.000Z',
      redirectionUrl: 'https://example.com/incident-kit/confirmed/',
      data: {
        list: 'kit',
        email: 'a@b.eu',
        company: '',
        productType: 'software',
        laws: ['CRA', 'GDPR'],
        currentProcess: '',
        plan: '',
        newsConsent: true,
        source: '/incident-kit/',
      },
    });
    expect(attrs).not.toHaveProperty('COMPANY');
    expect(attrs).toMatchObject({
      NEWS_CONSENT: true,
      CONSENT_VERSION: '2026-10-19',
      LAWS: 'CRA,GDPR',
      PRODUCT_TYPE: 'software',
    });
  });
});

describe('safeErrorText', () => {
  it('redacts anything that looks like an email address', () => {
    expect(safeErrorText('a.b+c@sub.example.co.uk and "x@y.z"')).toBe(
      '[redacted] and "[redacted]"',
    );
  });

  it('truncates to 200 characters', () => {
    expect(safeErrorText('x'.repeat(500))).toHaveLength(200);
  });

  it('ignores empty and non-string values', () => {
    expect([safeErrorText(''), safeErrorText(42), safeErrorText(null)]).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });
});
