// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type Mod = typeof import('../src/lib/analytics');
let mod: Mod;

beforeEach(async () => {
  vi.resetModules();
  mod = await import('../src/lib/analytics');
  document.head.innerHTML = '';
  delete window.umami;
  delete window.plausible;
});

afterEach(() => {
  delete window.umami;
  delete window.plausible;
});

function addScript(): HTMLScriptElement {
  const s = document.createElement('script');
  s.setAttribute('data-analytics', '');
  document.head.append(s);
  return s;
}

describe('track', () => {
  it('lists exactly the events defined in CLAUDE.md', () => {
    expect([...mod.analyticsEvents].sort()).toEqual(
      [
        'buy_clicked',
        'calculator_calculated',
        'calculator_opened',
        'ics_downloaded',
        'kit_requested',
        'link_copied',
        'waitlist_submitted',
        'cra_check_opened',
        'cra_check_started',
        'cra_check_answered',
        'cra_check_pain',
      ].sort(),
    );
  });

  it('does nothing when there is no analytics script on the page', () => {
    expect(() => mod.track('kit_requested')).not.toThrow();
  });

  it('forwards the event and props to Umami', () => {
    const umami = { track: vi.fn() };
    window.umami = umami;
    mod.track('buy_clicked', { plan: 'team' });
    mod.track('link_copied');
    expect(umami.track).toHaveBeenNthCalledWith(1, 'buy_clicked', { plan: 'team' });
    expect(umami.track).toHaveBeenNthCalledWith(2, 'link_copied', undefined);
  });

  it('falls back to Plausible when that is the loaded provider', () => {
    const plausible = vi.fn();
    window.plausible = plausible;
    mod.track('ics_downloaded', { scope: 'all' });
    expect(plausible).toHaveBeenCalledWith('ics_downloaded', { props: { scope: 'all' } });
  });

  it('sends to one provider only', () => {
    window.umami = { track: vi.fn() };
    window.plausible = vi.fn();
    mod.track('waitlist_submitted', { interest: 'oncall' });
    expect(window.umami.track).toHaveBeenCalledOnce();
    expect(window.plausible).not.toHaveBeenCalled();
  });

  it('queues events until the script loads, then sends them once in order', () => {
    const script = addScript();
    mod.track('calculator_opened');
    mod.track('link_copied');
    const umami = { track: vi.fn() };
    window.umami = umami;
    script.dispatchEvent(new Event('load'));
    script.dispatchEvent(new Event('load'));
    expect(umami.track.mock.calls).toEqual([
      ['calculator_opened', undefined],
      ['link_copied', undefined],
    ]);
  });

  it('drops the queue when the script fails to load', () => {
    const script = addScript();
    mod.track('calculator_opened');
    script.dispatchEvent(new Event('error'));
    const umami = { track: vi.fn() };
    window.umami = umami;
    script.dispatchEvent(new Event('load'));
    expect(umami.track).not.toHaveBeenCalled();
  });

  it(`keeps at most ${20} queued events`, () => {
    const script = addScript();
    for (let i = 0; i < 30; i++) mod.track('link_copied');
    const umami = { track: vi.fn() };
    window.umami = umami;
    script.dispatchEvent(new Event('load'));
    expect(umami.track).toHaveBeenCalledTimes(mod.MAX_QUEUED_EVENTS);
  });

  it('never throws when the provider throws', () => {
    window.umami = {
      track: () => {
        throw new Error('blocked');
      },
    };
    expect(() => mod.track('waitlist_submitted', { interest: 'none' })).not.toThrow();
  });
});
