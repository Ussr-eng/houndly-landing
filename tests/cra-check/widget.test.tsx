// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { CheckAnswer, CraCheckApi } from '../../src/lib/cra-check/api';

vi.mock('../../src/lib/analytics', () => ({ track: vi.fn() }));
const { track } = await import('../../src/lib/analytics');
const { CraCheckError } = await import('../../src/lib/cra-check/api');
const { default: CraCheck } = await import('../../src/components/cra-check/CraCheck');

const LOCK: CheckAnswer = {
  verdict: 'in_scope',
  category: 'important_class_i',
  summary: 'Smart door locks are important products of class I.',
  clarifying_question: null,
  citations: [{ id: 'art-7-1', label: 'Article 7(1)', url: 'https://eur-lex.europa.eu/x' }],
  questions_left: 3,
};
const QUESTION: CheckAnswer = {
  ...LOCK,
  verdict: 'depends',
  category: null,
  clarifying_question: 'Do people install it?',
  citations: [],
  questions_left: 2,
};

function fakeApi(...answers: (CheckAnswer | Error)[]) {
  const api = {
    start: vi.fn<CraCheckApi['start']>().mockResolvedValue('token-123'),
    check: vi.fn<CraCheckApi['check']>(),
    pain: vi.fn<CraCheckApi['pain']>().mockResolvedValue(undefined),
  };
  for (const a of answers) {
    if (a instanceof Error) api.check.mockRejectedValueOnce(a);
    else api.check.mockResolvedValueOnce(a);
  }
  return api;
}

beforeEach(() => {
  vi.mocked(track).mockClear();
  window.history.replaceState(null, '', '/guides/cra-scope/');
});
afterEach(cleanup);

async function openChat(api: CraCheckApi) {
  const user = userEvent.setup();
  render(<CraCheck apiOrigin="https://api.test" api={api} launcherDelay={0} />);
  await user.click(await screen.findByRole('button', { name: 'Open the CRA check' }));
  return user;
}

async function giveEmail(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Work email'), 'anna@lockworks.eu');
  await user.click(screen.getByRole('button', { name: 'Continue' }));
  await screen.findByLabelText('Describe your product');
}

describe('CRA check chat', () => {
  it('renders nothing visible on the server', () => {
    expect(renderToString(<CraCheck apiOrigin="https://api.test" />)).toBe(
      '<div class="cra-check"></div>',
    );
  });

  it('runs email → product → answer → problem', async () => {
    const api = fakeApi(LOCK);
    const user = await openChat(api);
    expect(screen.getByRole('dialog', { name: 'CRA check' })).toBeTruthy();
    expect(screen.getByText(/step 1 of 4/)).toBeTruthy();

    await giveEmail(user);
    expect(api.start).toHaveBeenCalledWith('anna@lockworks.eu', '/guides/cra-scope/', '');
    expect(screen.getByText(/step 2 of 4/)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Smart door lock' }));
    await user.click(screen.getByRole('button', { name: 'Send' }));
    await screen.findByText('Important product, class I');
    expect(api.check).toHaveBeenCalledWith(
      'token-123',
      expect.stringContaining('smart door lock'),
      [],
    );
    expect(screen.getByText('Yes, the CRA applies')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Article 7(1)' }).getAttribute('href')).toBe(
      'https://eur-lex.europa.eu/x',
    );
    expect(screen.getByText(/24 h · 72 h · 14 days after the fix/)).toBeTruthy();
    expect(screen.getByText(/step 4 of 4/)).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Writing the reports takes too long' }));
    await screen.findByRole('link', { name: 'Get early access' });
    expect(api.pain).toHaveBeenCalledWith('token-123', 'reports_take_long', null);
    expect(screen.getByText(/Check your inbox/)).toBeTruthy();
    expect(vi.mocked(track).mock.calls.map((c) => c[0])).toEqual([
      'cra_check_opened',
      'cra_check_started',
      'cra_check_answered',
      'cra_check_pain',
    ]);
  });

  it('asks the clarifying question and sends the answer as a turn', async () => {
    const api = fakeApi(QUESTION, { ...LOCK, category: 'default' });
    const user = await openChat(api);
    await giveEmail(user);
    await user.type(screen.getByLabelText('Describe your product'), 'We make an app');
    await user.keyboard('{Enter}');
    await screen.findByText('Do people install it?');
    expect(screen.getByText('I can ask 2 more at most.')).toBeTruthy();

    await user.type(screen.getByLabelText('Your answer'), 'Yes, from the stores');
    await user.keyboard('{Enter}');
    await screen.findByText('Default category');
    expect(api.check).toHaveBeenLastCalledWith('token-123', 'We make an app', [
      { question: 'Do people install it?', answer: 'Yes, from the stores' },
    ]);
  });

  it('accepts a problem in the visitor’s own words', async () => {
    const api = fakeApi(LOCK);
    const user = await openChat(api);
    await giveEmail(user);
    await user.type(screen.getByLabelText('Describe your product'), 'A lock');
    await user.keyboard('{Enter}');
    await screen.findByLabelText('Your biggest problem');
    await user.click(screen.getByRole('button', { name: 'Write my own' }));
    await user.type(screen.getByLabelText('Your biggest problem'), 'Nobody owns the report');
    await user.keyboard('{Enter}');
    await screen.findByRole('link', { name: 'Get early access' });
    expect(api.pain).toHaveBeenCalledWith('token-123', null, 'Nobody owns the report');
  });

  it('checks the email before sending it', async () => {
    const api = fakeApi();
    const user = await openChat(api);
    await user.type(screen.getByLabelText('Work email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByRole('alert').textContent).toBe('That does not look like an email address.');
    expect(api.start).not.toHaveBeenCalled();
  });

  it('explains a failed check and keeps the text for another try', async () => {
    const api = fakeApi(new CraCheckError(503), LOCK);
    const user = await openChat(api);
    await giveEmail(user);
    await user.type(screen.getByLabelText('Describe your product'), 'A lock');
    await user.keyboard('{Enter}');
    expect((await screen.findByRole('alert')).textContent).toMatch(/not available right now/);
    expect((screen.getByLabelText('Describe your product') as HTMLTextAreaElement).value).toBe(
      'A lock',
    );
    await user.keyboard('{Enter}');
    await screen.findByText('Important product, class I');
  });

  it('closes with Escape and returns focus to the launcher', async () => {
    const user = await openChat(fakeApi());
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Open the CRA check');
  });

  it('opens from any element marked data-cra-check-open', async () => {
    render(<CraCheck apiOrigin="https://api.test" api={fakeApi()} launcherDelay={999} />);
    const link = document.createElement('a');
    link.href = '#';
    link.dataset['craCheckOpen'] = '';
    document.body.append(link);
    await act(async () => link.click());
    expect(screen.getByRole('dialog', { name: 'CRA check' })).toBeTruthy();
    link.remove();
  });
});
