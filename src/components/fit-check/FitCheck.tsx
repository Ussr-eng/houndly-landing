// The AI guide on the home page: the visitor describes their problem and sees at once whether
// Within24 covers it (no email). The full analysis comes by email, only when they ask for it.
// The server renders the idle form, so the question box and examples are in the static HTML.
// Nothing is kept in the browser.

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { track } from '../../lib/analytics';
import { pagePath } from '../../lib/cra-check/api';
import {
  FitCheckError,
  highlightModules,
  httpFitApi,
  type FitAnswer,
  type FitCheckApi,
} from '../../lib/fit-check/api';
import { loadTurnstile } from '../../lib/turnstile';
import { t } from '../../i18n';
import type { UiStrings } from '../../i18n/en';
import { localizedPath, type Locale } from '../../i18n/config';
import './fit-check.css';

type Phase = 'idle' | 'thinking' | 'answer' | 'sending' | 'sent';
type Strings = UiStrings['home']['guide'];

interface Props {
  /** Backend origin, e.g. https://api.within24.app. */
  apiOrigin: string;
  turnstileSiteKey?: string | undefined;
  locale?: Locale;
  /** For tests. */
  api?: FitCheckApi;
  /** For tests: no typing animation in the placeholder. */
  animate?: boolean;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPE_MS = 55;
const HOLD_TICKS = 40;

/** Wait briefly for the Turnstile token; go on without it if it does not arrive. */
async function waitForToken(get: () => string, ms = 5000): Promise<string> {
  const started = Date.now();
  while (!get() && Date.now() - started < ms) {
    await new Promise((r) => setTimeout(r, 100));
  }
  return get();
}

function errorText(e: unknown, s: Strings, step: 'ask' | 'email'): string {
  const status = e instanceof FitCheckError ? e.status : -1;
  if (status === 0) return s.errors.network;
  if (status === 403) return s.errors.robot;
  if (status === 409) return s.errors.already;
  if (status === 410) return s.errors.expired;
  if (status === 422) return step === 'email' ? s.errors.email : s.errors.short;
  if (status === 429) return s.errors.tooMany;
  return s.errors.unavailable;
}

function reducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;
}

export default function FitCheck({
  apiOrigin,
  turnstileSiteKey,
  locale = 'en',
  api: injected,
  animate = true,
}: Props) {
  const s = t(locale).home.guide;
  const api = useRef<FitCheckApi>(injected ?? httpFitApi(apiOrigin));
  const [phase, setPhase] = useState<Phase>('idle');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState<FitAnswer | null>(null);
  const [typed, setTyped] = useState('');
  const [focused, setFocused] = useState(false);
  const turnstileToken = useRef('');
  const turnstileSlot = useRef<HTMLDivElement>(null);
  const turnstileStarted = useRef(false);
  const question = useRef<HTMLTextAreaElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  // The placeholder types out example problems while the box is empty and not focused.
  useEffect(() => {
    if (!animate || text || focused || reducedMotion()) return;
    let example = 0;
    let tick = 0;
    const timer = window.setInterval(() => {
      const full = s.examples[example % s.examples.length] ?? '';
      tick += 1;
      if (tick <= full.length) setTyped(full.slice(0, tick));
      else if (tick > full.length + HOLD_TICKS) {
        example += 1;
        tick = 0;
      }
    }, TYPE_MS);
    return () => window.clearInterval(timer);
  }, [animate, text, focused, s.examples]);
  const placeholder = animate && !text && !focused && typed ? typed : (s.examples[0] ?? '');

  // Turnstile loads on the first interaction with the box, not with the page.
  function startTurnstile() {
    if (!turnstileSiteKey || turnstileStarted.current) return;
    turnstileStarted.current = true;
    loadTurnstile()
      .then(() => {
        if (turnstileSlot.current) {
          window.turnstile?.render(turnstileSlot.current, {
            sitekey: turnstileSiteKey,
            callback: (value) => {
              turnstileToken.current = value;
            },
          });
        }
      })
      .catch(() => {
        turnstileStarted.current = false;
      });
  }

  useEffect(() => {
    if (phase === 'answer') result.current?.focus();
  }, [phase]);

  async function ask(event?: FormEvent) {
    event?.preventDefault();
    if (phase === 'thinking') return;
    const value = text.trim();
    if (value.length < 3) {
      setError(s.errors.short);
      question.current?.focus();
      return;
    }
    startTurnstile();
    setError('');
    setPhase('thinking');
    track('fit_check_asked');
    try {
      const turnstile = turnstileSiteKey ? await waitForToken(() => turnstileToken.current) : '';
      // A Turnstile token works once: get a fresh one for any later question.
      turnstileToken.current = '';
      if (turnstile && turnstileSlot.current) window.turnstile?.reset(turnstileSlot.current);
      const got = await api.current.ask(
        value,
        pagePath(window.location.pathname),
        locale,
        turnstile,
      );
      setAnswer(got);
      setPhase('answer');
      highlightModules(got.modules);
      track('fit_check_answered', { verdict: got.verdict });
    } catch (e) {
      setError(errorText(e, s, 'ask'));
      setPhase(answer ? 'answer' : 'idle');
    }
  }

  async function sendEmail(event: FormEvent) {
    event.preventDefault();
    if (!answer) return;
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(s.errors.email);
      emailInput.current?.focus();
      return;
    }
    setError('');
    setPhase('sending');
    try {
      await api.current.email(answer.check_token, value);
      setPhase('sent');
      track('fit_check_emailed');
    } catch (e) {
      setError(errorText(e, s, 'email'));
      setPhase('answer');
    }
  }

  function reset() {
    setPhase('idle');
    setAnswer(null);
    setText('');
    setEmail('');
    setError('');
    highlightModules(null);
    question.current?.focus();
  }

  // Enter sends, Shift+Enter makes a new line.
  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask();
    }
  }

  const busy = phase === 'thinking';
  const answered = answer && (phase === 'answer' || phase === 'sending' || phase === 'sent');

  return (
    <div className="fit-glow">
      <div className="fit">
        <form className="fit__ask" onSubmit={(e) => void ask(e)} noValidate>
          <div className="fit__top">
            <label htmlFor="fit-question">{s.label}</label>
            <span className="fit__free">{s.free}</span>
          </div>
          <div className="fit__row">
            <textarea
              id="fit-question"
              ref={question}
              rows={2}
              maxLength={2000}
              value={text}
              placeholder={placeholder}
              aria-describedby="fit-hint"
              onChange={(e) => setText(e.target.value)}
              onFocus={() => {
                setFocused(true);
                startTurnstile();
              }}
              onBlur={() => setFocused(false)}
              onKeyDown={onKey}
            />
            <button type="submit" className="fit__send" disabled={busy}>
              {s.button}
            </button>
          </div>
          <p id="fit-hint" className="visually-hidden">
            {s.hint}
          </p>
          <div className="fit__chips">
            <span>{s.tryLabel}</span>
            {s.chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="fit__chip"
                onClick={() => {
                  setText(chip.text);
                  question.current?.focus();
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>
          <div className="fit__turnstile" ref={turnstileSlot} />
        </form>

        {busy && (
          <p className="fit__thinking" role="status">
            {s.thinking}
            <span aria-hidden="true">
              <span className="fit__dot">.</span>
              <span className="fit__dot">.</span>
              <span className="fit__dot">.</span>
            </span>
          </p>
        )}

        {error && (
          <p className="fit__error" role="alert">
            {error}
          </p>
        )}

        {answered && (
          <div className="fit__answer" ref={result} tabIndex={-1} aria-labelledby="fit-verdict">
            <p className="fit__summary">
              <span id="fit-verdict" className={`fit__verdict fit__verdict--${answer.verdict}`}>
                {s.verdicts[answer.verdict]}
              </span>{' '}
              <span>{answer.summary}</span>
            </p>
            {answer.needs.length > 0 && (
              <ul className="fit__needs">
                {answer.needs.map((n, i) => (
                  <li key={i}>
                    <span>{n.need}</span>
                    <span className={`fit__status fit__status--${n.status}`}>
                      {s.statuses[n.status]}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {phase === 'sent' ? (
              <p className="fit__sent" role="status">
                <strong>{s.sent.heading}</strong> {s.sent.text}{' '}
                <button type="button" className="fit__again" onClick={reset}>
                  {s.again}
                </button>
              </p>
            ) : (
              <form className="fit__email" onSubmit={(e) => void sendEmail(e)} noValidate>
                <div className="fit__email-copy">
                  <label htmlFor="fit-email">{s.emailLabel}</label>
                  <span>{s.emailHint}</span>
                </div>
                <input
                  id="fit-email"
                  ref={emailInput}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  placeholder={s.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={phase === 'sending'}>
                  {phase === 'sending' ? s.emailSending : s.emailButton}
                </button>
                <p className="fit__consent">
                  {s.consent} <a href={localizedPath(locale, '/privacy/')}>{s.privacy}</a>
                </p>
              </form>
            )}
            {phase !== 'sent' && (
              <button type="button" className="fit__again" onClick={reset}>
                {s.again}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
