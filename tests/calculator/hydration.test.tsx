// @vitest-environment jsdom
// The server HTML must hydrate without mismatches, and the switch to "now" and the browser zone
// after hydration must not change the result rows (no layout shift).

import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Calculator from '../../src/components/calculator/Calculator';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  vi.useFakeTimers({ now: new Date('2026-10-18T12:34:56Z') });
  window.history.replaceState(null, '', '/');
});
afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

const rowNames = (root: Element) =>
  [...root.querySelectorAll('tbody tr')].map((tr) => tr.querySelector('th')?.textContent);

async function hydrate() {
  const html = renderToString(<Calculator locale="en" />);
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.append(container);
  const serverRows = rowNames(container);
  const errors: unknown[] = [];
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  await act(async () => {
    hydrateRoot(container, <Calculator locale="en" />, {
      onRecoverableError: (e) => errors.push(e),
    });
  });
  const logged = consoleError.mock.calls;
  consoleError.mockRestore();
  return { html, container, serverRows, errors, logged };
}

describe('Calculator hydration', () => {
  it('server-renders the form, labels, notices and the example result', () => {
    const html = renderToString(<Calculator locale="en" />);
    expect(html).not.toContain('Rules not yet verified');
    expect(html).not.toContain('not legal advice');
    for (const text of [
      'Became aware at',
      'Reporting country',
      'Show times in',
      'Example: aware at 1 October 2026, 09:00 UTC',
      'Fri 2 Oct 2026, 11:00 (UTC+02:00)',
      'Waiting for a fix or mitigation.',
    ]) {
      expect(html).toContain(text);
    }
  });

  it('hydrates without recoverable errors or console errors', async () => {
    const { errors, logged } = await hydrate();
    expect(errors).toEqual([]);
    expect(logged).toEqual([]);
  });

  it('renders the timeline on the server and keeps its lanes after hydration', async () => {
    const html = renderToString(<Calculator locale="en" />);
    const server = document.createElement('div');
    server.innerHTML = html;
    const lanes = (root: Element) =>
      [...root.querySelectorAll('.tl-lane .tl-label')].map((l) => l.textContent);
    expect(lanes(server)).toEqual(['CRA · vulnerability']);
    expect(server.querySelector('.tl-now')).toBeNull();
    const { container } = await hydrate();
    expect(lanes(container)).toEqual(['CRA · vulnerability']);
    const tl = container.querySelector('.tl');
    expect(tl?.getAttribute('aria-hidden')).toBe('true');
    expect(tl?.querySelectorAll('a, button, input, select, [tabindex]')).toHaveLength(0);
    // After hydration the clock runs: the "now" marker appears.
    expect(container.querySelector('.tl-now')).not.toBeNull();
  });

  it('keeps the same rows after switching to now and the browser zone', async () => {
    const { container, serverRows } = await hydrate();
    expect(serverRows).toHaveLength(3);
    expect(rowNames(container)).toEqual(serverRows);
    // Now in the browser zone (vitest runs with TZ=Pacific/Chatham, UTC+13:45 in October).
    expect(container.textContent).toContain('Aware at Mon 19 Oct 2026, 02:19 (UTC+13:45)');
    expect(container.querySelector('select[id$="-zone"]')).toHaveProperty(
      'value',
      'Pacific/Chatham',
    );
  });
});
