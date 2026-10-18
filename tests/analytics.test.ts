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

  it('does nothing when the script is not loaded', () => {
    vi.stubGlobal('window', {});
    expect(() => track('kit_requested')).not.toThrow();
  });

  it('forwards the event and props to Plausible', () => {
    const plausible = vi.fn();
    vi.stubGlobal('window', { plausible });
    track('buy_clicked', { plan: 'team' });
    track('link_copied');
    expect(plausible).toHaveBeenNthCalledWith(1, 'buy_clicked', { props: { plan: 'team' } });
    expect(plausible).toHaveBeenNthCalledWith(2, 'link_copied', undefined);
  });

  it('never throws when the analytics script throws', () => {
    vi.stubGlobal('window', {
      plausible: () => {
        throw new Error('blocked');
      },
    });
    expect(() => track('waitlist_submitted')).not.toThrow();
  });
});
