// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { FitAnswer, FitCheckApi } from '../../src/lib/fit-check/api';

vi.mock('../../src/lib/analytics', () => ({ track: vi.fn() }));
const { track } = await import('../../src/lib/analytics');
const { FitCheckError } = await import('../../src/lib/fit-check/api');
const { default: FitCheck } = await import('../../src/components/fit-check/FitCheck');

const ANSWER: FitAnswer = {
  check_token: 'token-1234567890abcdefghij',
  verdict: 'partly',
  summary: 'On-call covers your nights. A status page comes later.',
  needs: [
    { need: 'Phone calls at night', status: 'available', module: 'oncall' },
    { need: 'Status page', status: 'next', module: 'customers' },
  ],
  modules: ['oncall'],
};

function fakeApi(answer: FitAnswer | Error = ANSWER) {
  const api = {
    ask: vi.fn<FitCheckApi['ask']>(),
    email: vi.fn<FitCheckApi['email']>().mockResolvedValue(undefined),
  };
  if (answer instanceof Error) api.ask.mockRejectedValue(answer);
  else api.ask.mockResolvedValue(answer);
  return api;
}

beforeEach(() => {
  vi.mocked(track).mockClear();
  window.history.replaceState(null, '', '/de/');
  document.body.innerHTML = '';
});
afterEach(cleanup);

function mount(api: FitCheckApi, locale: 'en' | 'de' = 'en') {
  const cards = document.createElement('section');
  cards.dataset.fitCards = '';
  cards.innerHTML = '<li data-module="oncall"></li><li data-module="team"></li>';
  document.body.append(cards);
  render(<FitCheck apiOrigin="https://api.test" api={api} locale={locale} animate={false} />);
  return { user: userEvent.setup(), cards };
}

describe('AI guide on the home page', () => {
  it('renders the question box on the server, with a label and examples', () => {
    const html = renderToString(<FitCheck apiOrigin="https://api.test" animate={false} />);
    expect(html).toContain('Describe your problem. See in seconds if we solve it.');
    expect(html).toContain('<textarea');
    expect(html).toContain('Leaving Opsgenie');
  });

  it('shows the short answer without an email and lights up the matching cards', async () => {
    const api = fakeApi();
    const { user, cards } = mount(api);
    await user.type(screen.getByLabelText(/Describe your problem/), 'We need calls at night');
    await user.click(screen.getByRole('button', { name: 'Ask the AI guide' }));

    expect(await screen.findByText('Partly fits')).toBeTruthy();
    expect(screen.getByText(ANSWER.summary)).toBeTruthy();
    expect(screen.getByText('Status page')).toBeTruthy();
    expect(screen.getByText('Next')).toBeTruthy();
    expect(api.ask).toHaveBeenCalledWith('We need calls at night', '/de/', 'en', '');
    expect(cards.dataset.answered).toBe('true');
    expect(cards.querySelector<HTMLElement>('[data-module="oncall"]')?.dataset.fit).toBe('yes');
    expect(cards.querySelector<HTMLElement>('[data-module="team"]')?.dataset.fit).toBeUndefined();
    expect(track).toHaveBeenCalledWith('fit_check_asked');
    expect(track).toHaveBeenCalledWith('fit_check_answered', { verdict: 'partly' });
  });

  it('sends the full analysis only when the visitor gives an email', async () => {
    const api = fakeApi();
    const { user } = mount(api);
    await user.click(screen.getByRole('button', { name: 'Leaving Opsgenie' }));
    await user.click(screen.getByRole('button', { name: 'Ask the AI guide' }));
    await screen.findByText('Partly fits');
    expect(api.email).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText('Get the full analysis by email'), 'nope');
    await user.click(screen.getByRole('button', { name: 'Email me the analysis' }));
    expect(screen.getByRole('alert').textContent).toBe('Enter a valid email address.');
    expect(api.email).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText('Get the full analysis by email'));
    await user.type(screen.getByLabelText('Get the full analysis by email'), 'anna@team.eu');
    await user.click(screen.getByRole('button', { name: 'Email me the analysis' }));
    expect(await screen.findByText('Check your inbox.')).toBeTruthy();
    expect(api.email).toHaveBeenCalledWith(ANSWER.check_token, 'anna@team.eu');
    expect(track).toHaveBeenCalledWith('fit_check_emailed');
  });

  it('asks for a few words before sending an empty question', async () => {
    const api = fakeApi();
    const { user } = mount(api);
    await user.click(screen.getByRole('button', { name: 'Ask the AI guide' }));
    expect(screen.getByRole('alert').textContent).toBe(
      'Describe your problem in a few words first.',
    );
    expect(api.ask).not.toHaveBeenCalled();
  });

  it('says plainly when there are too many questions', async () => {
    const { user } = mount(fakeApi(new FitCheckError(429)));
    await user.type(screen.getByLabelText(/Describe your problem/), 'Something{Enter}');
    expect((await screen.findByRole('alert')).textContent).toBe(
      'Too many questions in a short time. Please try again later.',
    );
  });

  it('clears the answer and the cards when the visitor asks something else', async () => {
    const { user, cards } = mount(fakeApi());
    await user.type(screen.getByLabelText(/Describe your problem/), 'Calls at night{Enter}');
    await screen.findByText('Partly fits');
    await user.click(screen.getByRole('button', { name: 'Ask something else' }));
    expect(screen.queryByText('Partly fits')).toBeNull();
    expect(cards.dataset.answered).toBeUndefined();
  });

  it('speaks German on the German page', async () => {
    const api = fakeApi();
    const { user } = mount(api, 'de');
    await user.type(screen.getByLabelText(/Beschreiben Sie Ihr Problem/), 'Anrufe nachts{Enter}');
    expect(await screen.findByText('Passt teilweise')).toBeTruthy();
    expect(api.ask).toHaveBeenCalledWith('Anrufe nachts', '/de/', 'de', '');
  });
});
