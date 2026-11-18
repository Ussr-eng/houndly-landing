// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { FitCheckError, highlightModules, httpFitApi } from '../../src/lib/fit-check/api';

const ok = (body: unknown, status = 200) =>
  new Response(body === null ? null : JSON.stringify(body), { status });

describe('httpFitApi', () => {
  it('posts the question and the email to the backend', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(ok({ check_token: 'tok', verdict: 'fits' }))
      .mockResolvedValueOnce(ok(null, 202));
    const api = httpFitApi('https://api.within24.app/', fetchMock);

    expect((await api.ask('We leave Opsgenie', '/', 'de', 'ts')).check_token).toBe('tok');
    await api.email('tok', 'anna@team.eu');

    const calls = fetchMock.mock.calls.map(([url, init]) => [url, JSON.parse(String(init?.body))]);
    expect(calls).toEqual([
      [
        'https://api.within24.app/public/fit-check',
        {
          site: 'within24',
          page: '/',
          language: 'de',
          question: 'We leave Opsgenie',
          turnstile_token: 'ts',
        },
      ],
      [
        'https://api.within24.app/public/fit-check/email',
        { check_token: 'tok', email: 'anna@team.eu' },
      ],
    ]);
  });

  it('turns a failed status or network into FitCheckError', async () => {
    const api = httpFitApi(
      'https://api.test',
      vi
        .fn<typeof fetch>()
        .mockResolvedValueOnce(ok({ detail: 'x' }, 429))
        .mockRejectedValueOnce(new TypeError('offline')),
    );
    await expect(api.ask('abc', '/', 'en', '')).rejects.toEqual(new FitCheckError(429));
    await expect(api.email('t', 'a@b.eu')).rejects.toMatchObject({ status: 0 });
  });
});

describe('highlightModules', () => {
  function cards() {
    document.body.innerHTML = `
      <section data-fit-cards>
        <li data-module="oncall"></li>
        <li data-module="opsgenie"></li>
        <li data-module="team"></li>
      </section>`;
    const section = document.querySelector<HTMLElement>('[data-fit-cards]') as HTMLElement;
    const fit = () =>
      [...section.querySelectorAll<HTMLElement>('[data-module]')]
        .filter((c) => c.dataset.fit === 'yes')
        .map((c) => c.dataset.module);
    return { section, fit };
  }

  it('lights up the named modules and marks the section answered', () => {
    const { section, fit } = cards();
    highlightModules(['opsgenie', 'oncall', 'made-up']);
    expect(section.dataset.answered).toBe('true');
    expect(fit()).toEqual(['oncall', 'opsgenie']);
  });

  it('clears everything on reset', () => {
    const { section, fit } = cards();
    highlightModules(['team']);
    highlightModules(null);
    expect(section.dataset.answered).toBeUndefined();
    expect(fit()).toEqual([]);
  });

  it('does nothing on a page without cards', () => {
    document.body.innerHTML = '';
    expect(() => highlightModules(['oncall'])).not.toThrow();
  });
});
