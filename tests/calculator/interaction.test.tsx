// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/lib/analytics', () => ({ track: vi.fn() }));
const { track } = await import('../../src/lib/analytics');
const { default: Calculator } = await import('../../src/components/calculator/Calculator');

const NOW = new Date('2026-10-18T12:34:56Z');

// Testing Library advances fake timers only through a `jest` global; point it at Vitest.
(globalThis as { jest?: unknown }).jest = {
  advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms),
};

beforeEach(() => {
  vi.useFakeTimers({ now: NOW, shouldAdvanceTime: false });
  vi.mocked(track).mockClear();
  window.history.replaceState(null, '', '/');
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function setup(search = '') {
  window.history.replaceState(null, '', `/${search}`);
  const user = userEvent.setup({ delay: null });
  const utils = render(<Calculator locale="en" />);
  return { user, ...utils };
}

const rows = () => screen.getAllByRole('row').slice(1);
const rowText = () => rows().map((r) => within(r).getByRole('rowheader').textContent);

describe('Calculator', () => {
  it('starts from now in the browser zone and sends calculator_opened once', () => {
    setup();
    expect(screen.getByLabelText('Became aware at')).toHaveProperty('value', '2026-10-19T02:19');
    expect(screen.getByLabelText('Show times in')).toHaveProperty('value', 'Pacific/Chatham');
    expect(screen.getByLabelText('Reporting country')).toHaveProperty('value', 'BE');
    expect(vi.mocked(track).mock.calls).toEqual([['calculator_opened']]);
  });

  it('shows a waiting row with a hint and no date until the anchor is entered', async () => {
    const { user } = setup();
    const waiting = rows().at(-1);
    expect(waiting?.textContent).toContain('Waiting for a fix or mitigation');
    expect(waiting?.textContent).not.toMatch(/\d{4}/);

    await user.type(screen.getByLabelText(/First fix or mitigation/), '2026-10-20T10:00');
    expect(rows().at(-1)?.textContent).not.toContain('Waiting');
    // 20 Oct 10:00 Chatham (UTC+13:45) = 19 Oct 20:15Z; + 336 h = 2 Nov 20:15Z.
    expect(screen.getByText('2026-11-02 20:15 UTC')).toBeTruthy();
  });

  it('ticks boxes from the helper answers and lets the person change them', async () => {
    const { user } = setup();
    await user.click(screen.getByText(/Not sure which boxes apply/));
    // CRA answer stays at its default "No".
    const nis2 = screen.getByRole('group', { name: /essential or important entity/ });
    await user.click(within(nis2).getByRole('radio', { name: 'Yes' }));
    const gdpr = screen.getByRole('group', { name: /breach of personal data/ });
    await user.click(within(gdpr).getByRole('radio', { name: 'Yes' }));
    await user.click(screen.getByRole('button', { name: 'Tick the matching boxes' }));

    expect(screen.getByRole('checkbox', { name: /NIS2: significant incident/ })).toHaveProperty(
      'checked',
      true,
    );
    expect(screen.getByRole('checkbox', { name: /GDPR: personal data breach/ })).toHaveProperty(
      'checked',
      true,
    );
    expect(screen.getByRole('checkbox', { name: /CRA: actively exploited/ })).toHaveProperty(
      'checked',
      false,
    );
    expect(screen.getByText(/Boxes ticked from your answers/)).toBeTruthy();
    expect(rowText()).toEqual([
      'NIS2 early warningSignificant incident · Source',
      'NIS2 notificationSignificant incident · Source',
      'GDPR notificationPersonal data breach · Source',
      'NIS2 final reportSignificant incident · Source',
    ]);

    await user.click(screen.getByRole('checkbox', { name: /GDPR: personal data breach/ }));
    expect(rowText()).toHaveLength(3);
  });

  it('reads state from the link and reports unreadable values', () => {
    setup('?aware=2026-10-01T09:00Z&country=de&events=nis2.significant_incident&sub=nope&rules=v9');
    expect(screen.getByLabelText('Reporting country')).toHaveProperty('value', 'DE');
    expect(screen.getByText(/Some values in the link could not be read/)).toBeTruthy();
    expect(screen.getByText(/made with rules v9/)).toBeTruthy();
    expect(rowText()[0]).toContain('NIS2 early warning');
  });

  it('shows a contract error for an unsupported pair from a link', () => {
    setup('?aware=2026-10-01T09:00Z&events=cra.personal_data_breach');
    expect(screen.getByRole('alert').textContent).toContain('has no rules under that law');
  });

  it('shows notification-before-aware as an error', async () => {
    const { user } = setup('?aware=2026-10-01T09:00Z&events=nis2.significant_incident');
    await user.type(screen.getByLabelText(/Notification submitted at/), '2026-09-01T10:00');
    expect(screen.getByRole('alert').textContent).toContain(
      'earlier than the time you became aware',
    );
  });

  it('hides the ticking countdown from screen readers and gives a coarse text instead', () => {
    setup('?aware=2026-10-18T12:00Z&events=gdpr.personal_data_breach');
    act(() => vi.advanceTimersByTime(1000));
    const cell = screen.getAllByRole('cell').find((c) => c.className.includes('calc-left'));
    const visual = cell?.querySelector('[aria-hidden="true"]');
    expect(visual?.textContent).toBe('2 d 23 h 25 min 03 s');
    expect(cell?.querySelector('.visually-hidden')?.textContent).toBe('Due in 2 days 23 hours');
    expect(cell?.closest('[aria-live]')).toBeNull();
  });

  it('announces a deadline once when it becomes overdue', () => {
    // GDPR notification due 72 h after aware → 2026-10-18T12:35:30Z, 34 s after NOW.
    setup('?aware=2026-10-15T12:35:30Z&events=gdpr.personal_data_breach');
    const live = document.querySelector('[aria-live="polite"]');
    act(() => vi.advanceTimersByTime(30_000));
    expect(live?.textContent).toBe('');
    act(() => vi.advanceTimersByTime(5_000));
    expect(live?.textContent).toBe('GDPR notification is now overdue.');
    // Visible countdown and the screen-reader text both say it.
    expect(screen.getAllByText(/^Overdue by/)).toHaveLength(2);
  });

  it('does not announce deadlines that were already overdue on load or after an edit', async () => {
    const { user } = setup('?aware=2026-10-01T09:00Z&events=gdpr.personal_data_breach');
    const live = document.querySelector('[aria-live="polite"]');
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getAllByText(/^Overdue by/).length).toBeGreaterThan(0);
    expect(live?.textContent).toBe('');
    await user.click(screen.getByRole('checkbox', { name: /NIS2: significant incident/ }));
    act(() => vi.advanceTimersByTime(3000));
    expect(live?.textContent).toBe('');
  });

  it('copies a link with the state but without the display zone', async () => {
    const { user } = setup('?aware=2026-10-01T09:00Z&country=de&events=nis2.significant_incident');
    // user-event installs its own clipboard; spy on it after setup.
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
    await user.click(screen.getByRole('button', { name: 'Copy link to this calculation' }));
    expect(writeText).toHaveBeenCalledWith(
      'http://localhost:3000/?aware=2026-10-01T09:00Z&country=de&events=nis2.significant_incident&rules=v1',
    );
    expect(await screen.findByText('Link copied.')).toBeTruthy();
    expect(track).toHaveBeenCalledWith('link_copied');
  });

  it('falls back to a selectable field when the clipboard is unavailable', async () => {
    const { user } = setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'));
    await user.click(screen.getByRole('button', { name: 'Copy link to this calculation' }));
    expect(await screen.findByLabelText('Copy this link')).toHaveProperty('readOnly', true);
  });

  it('downloads .ics files for one deadline and for all', async () => {
    const blobs: Blob[] = [];
    URL.createObjectURL = vi.fn((b: Blob) => {
      blobs.push(b);
      return 'blob:x';
    }) as typeof URL.createObjectURL;
    URL.revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const { user } = setup('?aware=2026-10-01T09:00Z&events=cra.actively_exploited_vulnerability');

    await user.click(
      screen.getByRole('button', { name: /Download the CRA early warning deadline/ }),
    );
    await user.click(screen.getByRole('button', { name: 'Download all deadlines (.ics)' }));
    expect(click).toHaveBeenCalledTimes(2);
    // Unfold RFC 5545 continuation lines before searching the text.
    const [one, all] = (await Promise.all(blobs.map((b) => b.text()))).map((t) =>
      t.replace(/\r\n /g, ''),
    );
    expect(one?.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    expect(one).toContain('DTSTART:20261002T090000Z');
    // Waiting rows are not exported.
    expect(all?.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(all).toContain('Not legal advice. Rules not yet verified against the official text.');
    expect(vi.mocked(track).mock.calls.filter((c) => c[0] === 'ics_downloaded')).toEqual([
      ['ics_downloaded', { scope: 'single' }],
      ['ics_downloaded', { scope: 'all' }],
    ]);
    click.mockRestore();
  });

  it('sends calculator_calculated once, 2 s after the last change, not on load', async () => {
    const { user } = setup();
    act(() => vi.advanceTimersByTime(5000));
    expect(track).not.toHaveBeenCalledWith('calculator_calculated', expect.anything());
    await user.click(screen.getByRole('checkbox', { name: /GDPR: personal data breach/ }));
    act(() => vi.advanceTimersByTime(1000));
    await user.click(screen.getByRole('checkbox', { name: /NIS2: significant incident/ }));
    act(() => vi.advanceTimersByTime(1999));
    expect(track).not.toHaveBeenCalledWith('calculator_calculated', expect.anything());
    act(() => vi.advanceTimersByTime(10_000));
    expect(vi.mocked(track).mock.calls.filter((c) => c[0] === 'calculator_calculated')).toEqual([
      [
        'calculator_calculated',
        {
          regimes: 'CRA,GDPR,NIS2',
          event_type: 'actively_exploited_vulnerability,personal_data_breach,significant_incident',
        },
      ],
    ]);
  });

  it('can be used with the keyboard', async () => {
    const { user } = setup();
    const box = screen.getByRole('checkbox', { name: /NIS2: significant incident/ });
    box.focus();
    await user.keyboard(' ');
    expect(box).toHaveProperty('checked', true);
    // Native controls only: every interactive element is a button, input, select, summary or link.
    const interactive = document.querySelectorAll('[onclick], [tabindex]:not([tabindex="-1"])');
    expect(interactive).toHaveLength(0);
    fireEvent.change(screen.getByLabelText('Reporting country'), { target: { value: 'FI' } });
    expect(screen.getByText(/clock of this country \(Europe\/Helsinki\)/)).toBeTruthy();
  });
});
