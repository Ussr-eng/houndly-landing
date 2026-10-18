import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyticsEvents, track } from '../src/lib/analytics';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('track', () => {
  it('lists exactly the events defined in CLAUDE.md', () => {
    expect([...analyticsEvents].sort()).toEqual(
      [
        'buy_clicked',
        'calculator_calculated',
        'calculator_opened',
        'ics_downloaded',
        'kit_requested',
        'link_copied',
        'waitlist_submitted',
      ].sort(),
    );
  });

  it('does nothing without a window (SSR)', () => {
    expect(() => track('link_copied')).not.toThrow();
  });

  it('does nothing when no provider script is loaded', () => {
    vi.stubGlobal('window', {});
    expect(() => track('kit_requested')).not.toThrow();
  });

  it('forwards the event and props to Umami', () => {
    const umami = { track: vi.fn() };
    vi.stubGlobal('window', { umami });
    track('buy_clicked', { plan: 'team' });
    track('link_copied');
    expect(umami.track).toHaveBeenNthCalledWith(1, 'buy_clicked', { plan: 'team' });
    expect(umami.track).toHaveBeenNthCalledWith(2, 'link_copied', undefined);
  });

  it('falls back to Plausible when that is the loaded provider', () => {
    const plausible = vi.fn();
    vi.stubGlobal('window', { plausible });
    track('ics_downloaded', { scope: 'all' });
    expect(plausible).toHaveBeenCalledWith('ics_downloaded', { props: { scope: 'all' } });
  });

  it('sends to one provider only', () => {
    const umami = { track: vi.fn() };
    const plausible = vi.fn();
    vi.stubGlobal('window', { umami, plausible });
    track('waitlist_submitted');
    expect(umami.track).toHaveBeenCalledOnce();
    expect(plausible).not.toHaveBeenCalled();
  });

  it('never throws when the provider script throws', () => {
    vi.stubGlobal('window', {
      umami: {
        track: () => {
          throw new Error('blocked');
        },
      },
    });
    expect(() => track('waitlist_submitted')).not.toThrow();
  });
});
