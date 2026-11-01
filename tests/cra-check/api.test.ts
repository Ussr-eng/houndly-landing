import { describe, expect, it, vi } from 'vitest';
import { CraCheckError, httpApi, pagePath } from '../../src/lib/cra-check/api';

const ok = (body: unknown, status = 200) =>
  new Response(body === null ? null : JSON.stringify(body), { status });

describe('httpApi', () => {
  it('posts the three steps to the backend', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(ok({ check_token: 'tok' }))
      .mockResolvedValueOnce(ok({ verdict: 'in_scope' }))
      .mockResolvedValueOnce(ok(null, 204));
    const api = httpApi('https://api.within24.app/', fetchMock);

    expect(await api.start('a@b.eu', '/cra/', 'ts')).toBe('tok');
    await api.check('tok', 'A lock', [{ question: 'Q?', answer: 'A' }]);
    await api.pain('tok', 'other', 'text');

    const calls = fetchMock.mock.calls.map(([url, init]) => [url, JSON.parse(String(init?.body))]);
    expect(calls).toEqual([
      [
        'https://api.within24.app/public/cra-check/start',
        { email: 'a@b.eu', page: '/cra/', turnstile_token: 'ts' },
      ],
      [
        'https://api.within24.app/public/cra-check',
        { check_token: 'tok', description: 'A lock', turns: [{ question: 'Q?', answer: 'A' }] },
      ],
      [
        'https://api.within24.app/public/cra-check/pain',
        { check_token: 'tok', choice: 'other', text: 'text' },
      ],
    ]);
  });

  it('reports the HTTP status, or 0 when the network fails', async () => {
    const api403 = httpApi('https://x', vi.fn<typeof fetch>().mockResolvedValue(ok({}, 403)));
    await expect(api403.start('a@b.eu', '/', '')).rejects.toEqual(new CraCheckError(403));
    const down = httpApi('https://x', vi.fn<typeof fetch>().mockRejectedValue(new TypeError()));
    await expect(down.pain('t', 'other', null)).rejects.toMatchObject({ status: 0 });
  });
});

describe('pagePath', () => {
  it('passes clean paths and replaces anything else with /', () => {
    expect(pagePath('/guides/cra-scope/')).toBe('/guides/cra-scope/');
    expect(pagePath('/Guides/CRA/')).toBe('/guides/cra/');
    expect(pagePath('/a%20b/')).toBe('/');
    expect(pagePath(`/${'a'.repeat(250)}`)).toBe('/');
  });
});
