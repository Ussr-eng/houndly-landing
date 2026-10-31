// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/lib/analytics', () => ({ track: vi.fn() }));
const { track } = await import('../../src/lib/analytics');
const { enhanceSubscribeForms } = await import('../../src/scripts/subscribe-form');
const { enhancePlanButtons } = await import('../../src/scripts/pricing');

const errors = {
  summary: 'Please check the highlighted fields.',
  invalid: 'Enter a valid email address, like name@company.com.',
  unavailable: 'Sign-up is not available right now. Please try again later.',
  network: 'The form could not be sent. Check your connection and try again.',
};

function mountForm(event = 'kit_requested') {
  document.body.innerHTML = `
    <form method="post" action="/api/subscribe" data-subscribe data-event="${event}"
      data-success="Check your inbox." data-sending="Sending…" data-errors='${JSON.stringify(errors)}'>
      <p class="form-summary" tabindex="-1" hidden></p>
      <input type="hidden" name="list" value="kit">
      <input type="hidden" name="elapsed" value="">
      <label for="kit-email">Email</label>
      <input type="email" id="kit-email" name="email" value="a@b.eu">
      <p class="form-error" id="kit-email-error" hidden></p>
      <button type="submit">Send me the kit</button>
      <p class="form-status" role="status"></p>
    </form>`;
  enhanceSubscribeForms();
  return document.querySelector('form') as HTMLFormElement;
}

const submit = async (form: HTMLFormElement) => {
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  await vi.waitFor(() => expect(form.querySelector('button')?.disabled).toBe(false));
};

beforeEach(() => vi.mocked(track).mockClear());
afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
});

describe('subscribe form enhancement', () => {
  it('posts with fetch as JSON, shows success and sends the event once', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);
    const form = mountForm();
    await submit(form);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toMatch(/\/api\/subscribe$/);
    expect((init.headers as Record<string, string>).accept).toBe('application/json');
    expect(Number((init.body as FormData).get('elapsed'))).toBeGreaterThanOrEqual(0);
    expect(form.querySelector('[role="status"]')?.textContent).toBe('Check your inbox.');
    expect(vi.mocked(track).mock.calls).toEqual([['kit_requested']]);
  });

  it('shows the email error and focuses the summary on invalid input, no event', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          Response.json(
            { ok: false, error: 'invalid', fields: { email: 'invalid' } },
            { status: 400 },
          ),
        ),
    );
    const form = mountForm();
    await submit(form);
    const summary = form.querySelector('.form-summary') as HTMLElement;
    expect(summary.hidden).toBe(false);
    expect(summary.textContent).toBe(errors.summary);
    expect(document.activeElement).toBe(summary);
    expect(form.querySelector('#kit-email')?.getAttribute('aria-invalid')).toBe('true');
    expect(form.querySelector('#kit-email-error')?.textContent).toBe(errors.invalid);
    expect(track).not.toHaveBeenCalled();
  });

  it('explains a server-side failure and a network failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(Response.json({ ok: false, error: 'unavailable' }, { status: 503 })),
    );
    const form = mountForm('waitlist_submitted');
    await submit(form);
    expect(form.querySelector('.form-summary')?.textContent).toBe(errors.unavailable);

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    await submit(form);
    expect(form.querySelector('.form-summary')?.textContent).toBe(errors.network);
    expect(track).not.toHaveBeenCalled();
  });

  it('sends waitlist_submitted for the early-access form', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ ok: true })));
    await submit(mountForm('waitlist_submitted'));
    expect(vi.mocked(track).mock.calls).toEqual([['waitlist_submitted', { interest: 'none' }]]);
  });

  it('sends the answer to "What do you need first?" with waitlist_submitted', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ ok: true })));
    const form = mountForm('waitlist_submitted');
    form.insertAdjacentHTML(
      'afterbegin',
      '<input type="radio" name="interest" value="oncall" checked>',
    );
    await submit(form);
    expect(vi.mocked(track).mock.calls).toEqual([['waitlist_submitted', { interest: 'oncall' }]]);
  });
});

describe('pricing "Choose" buttons', () => {
  function mountPricing(search = '') {
    window.history.replaceState(null, '', `/pricing/${search}`);
    document.body.innerHTML = `
      <a href="/pricing/?plan=team#early-access" data-choose-plan="team">Choose Team</a>
      <section id="early-access">
        <input type="email" id="waitlist-email">
        <select data-plan-select><option value="">Not sure</option><option value="starter">Starter</option><option value="team">Team</option></select>
      </section>`;
    Element.prototype.scrollIntoView = vi.fn();
    enhancePlanButtons();
  }

  it('sends buy_clicked with the plan, preselects it and focuses the email field', () => {
    mountPricing();
    const link = document.querySelector('a') as HTMLAnchorElement;
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(vi.mocked(track).mock.calls).toEqual([['buy_clicked', { plan: 'team' }]]);
    expect((document.querySelector('select') as HTMLSelectElement).value).toBe('team');
    expect(document.activeElement?.id).toBe('waitlist-email');
    expect(window.location.search).toBe('?plan=team');
  });

  it('preselects the plan from the URL', () => {
    mountPricing('?plan=starter');
    expect((document.querySelector('select') as HTMLSelectElement).value).toBe('starter');
    expect(track).not.toHaveBeenCalled();
  });

  it('follows the link to /early-access/ when the form is not on the page', () => {
    window.history.replaceState(null, '', '/');
    document.body.innerHTML = `<a href="/early-access/?plan=team#early-access" data-choose-plan="team">Choose Team</a>`;
    enhancePlanButtons();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    (document.querySelector('a') as HTMLAnchorElement).dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
    expect(vi.mocked(track).mock.calls).toEqual([['buy_clicked', { plan: 'team' }]]);
  });
});
