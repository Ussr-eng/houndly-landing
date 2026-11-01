// The CRA check chat in the page corner: email → product → answer → the visitor's problem.
// Desktop: a pill launcher and a panel in the bottom-right corner. Phone (< 48rem): a bar at the
// bottom and a full-screen chat. Nothing is kept in the browser: a reload starts over.

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { track } from '../../lib/analytics';
import {
  CraCheckError,
  httpApi,
  pagePath,
  painChoices,
  type CheckAnswer,
  type CraCheckApi,
  type PainChoice,
  type Turn,
} from '../../lib/cra-check/api';
import { loadTurnstile } from '../../lib/turnstile';
import { fill, t } from '../../i18n';
import './cra-check.css';

type Phase =
  'email' | 'starting' | 'describe' | 'thinking' | 'clarify' | 'pain' | 'sending' | 'done';

type Message =
  | { kind: 'bot'; text: string; small?: string }
  | { kind: 'visitor'; text: string }
  | { kind: 'answer'; answer: CheckAnswer }
  | { kind: 'done' };

interface Props {
  /** Backend origin, e.g. https://api.within24.app. */
  apiOrigin: string;
  turnstileSiteKey?: string | undefined;
  /** For tests. */
  api?: CraCheckApi;
  /** Seconds before the launcher shows by itself (it also shows after half a page). */
  launcherDelay?: number;
}

const s = t('en').craCheck;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THINKING_STEP_MS = 900;

/** Wait briefly for the Turnstile token; go on without it if it does not arrive. */
async function waitForToken(get: () => string, ms = 5000): Promise<string> {
  const started = Date.now();
  while (!get() && Date.now() - started < ms) {
    await new Promise((r) => setTimeout(r, 100));
  }
  return get();
}

const fresh = (): Message[] => [
  { kind: 'bot', text: s.greeting },
  { kind: 'bot', text: s.askEmail, small: s.askEmailSmall },
];

function errorText(e: unknown): string {
  const status = e instanceof CraCheckError ? e.status : -1;
  if (status === 0) return s.errors.network;
  if (status === 403) return s.errors.robot;
  if (status === 410) return s.errors.expired;
  if (status === 422) return s.errors.email;
  if (status === 429) return s.errors.tooMany;
  return s.errors.unavailable;
}

function stepOf(phase: Phase): number {
  if (phase === 'email' || phase === 'starting') return 1;
  if (phase === 'pain' || phase === 'sending') return 4;
  if (phase === 'done') return 5;
  return 2;
}

export default function CraCheck({
  apiOrigin,
  turnstileSiteKey,
  api: injected,
  launcherDelay = 20,
}: Props) {
  const api = useRef<CraCheckApi>(injected ?? httpApi(apiOrigin));
  const [open, setOpen] = useState(false);
  const [launcher, setLauncher] = useState(false);
  const [launcherHidden, setLauncherHidden] = useState(false);
  const [phase, setPhase] = useState<Phase>('email');
  const [messages, setMessages] = useState<Message[]>(fresh);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [thinkingStep, setThinkingStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const token = useRef('');
  const description = useRef('');
  const turns = useRef<Turn[]>([]);
  const question = useRef('');
  const questionsLeft = useRef(0);
  const turnstileToken = useRef('');
  const turnstileSlot = useRef<HTMLDivElement>(null);
  const turnstileRendered = useRef(false);
  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const launcherButton = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);

  // The launcher shows after a delay or half a page of scrolling, whichever comes first.
  useEffect(() => {
    const show = () => setLauncher(true);
    const timer = window.setTimeout(show, launcherDelay * 1000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [launcherDelay]);

  const openChat = useCallback(() => {
    setOpen(true);
    setLauncher(true);
    if (!opened.current) {
      opened.current = true;
      track('cra_check_opened');
    }
  }, []);

  // Any element with data-cra-check-open (for example at the end of a guide) opens the chat.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-cra-check-open]')) {
        event.preventDefault();
        openChat();
      }
    };
    document.addEventListener('click', onClick);
    // A link to #cra-check opens it too.
    const timer = window.setTimeout(() => {
      if (window.location.hash === '#cra-check') openChat();
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('click', onClick);
    };
  }, [openChat]);

  // Turnstile loads when the chat first opens.
  useEffect(() => {
    if (!open || !turnstileSiteKey || turnstileRendered.current) return;
    turnstileRendered.current = true;
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
        turnstileRendered.current = false;
      });
  }, [open, turnstileSiteKey]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open, phase]);

  useEffect(() => {
    const el = log.current;
    if (!el) return;
    // When the answer arrives, show its top; otherwise follow the newest message.
    const answers = phase === 'pain' ? el.querySelectorAll<HTMLElement>('.cra-answer') : [];
    const answer = answers[answers.length - 1];
    el.scrollTop = answer ? answer.offsetTop - 16 : el.scrollHeight;
  }, [messages, phase, thinkingStep]);

  useEffect(() => {
    if (phase !== 'thinking') return;
    const timer = window.setInterval(
      () => setThinkingStep((n) => Math.min(n + 1, s.thinkingSteps.length - 1)),
      THINKING_STEP_MS,
    );
    return () => window.clearInterval(timer);
  }, [phase]);

  const say = (...list: Message[]) => setMessages((m) => [...m, ...list]);

  const close = () => setOpen(false);

  // Escape closes the chat.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // After closing, focus goes back to the launcher (it is rendered again only then).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) launcherButton.current?.focus();
    wasOpen.current = open;
  }, [open]);

  const restart = () => {
    token.current = '';
    description.current = '';
    turns.current = [];
    setMessages(fresh());
    setPhase('email');
    setText('');
    setError('');
  };

  async function submitEmail(value: string) {
    if (!EMAIL.test(value)) {
      setError(s.errors.email);
      return;
    }
    setPhase('starting');
    try {
      const turnstile = turnstileSiteKey ? await waitForToken(() => turnstileToken.current) : '';
      // A Turnstile token works once: get a fresh one for any later attempt.
      turnstileToken.current = '';
      if (turnstile && turnstileSlot.current) window.turnstile?.reset(turnstileSlot.current);
      token.current = await api.current.start(value, pagePath(window.location.pathname), turnstile);
      say({ kind: 'visitor', text: value }, { kind: 'bot', text: s.askProduct });
      setText('');
      setPhase('describe');
      track('cra_check_started');
    } catch (e) {
      setError(errorText(e));
      setPhase('email');
    }
  }

  async function runCheck() {
    setThinkingStep(0);
    setPhase('thinking');
    try {
      const answer = await api.current.check(token.current, description.current, turns.current);
      if (answer.verdict === 'depends' && answer.clarifying_question) {
        question.current = answer.clarifying_question;
        questionsLeft.current = answer.questions_left;
        say({
          kind: 'bot',
          text: answer.clarifying_question,
          small: fill(s.questionsLeft, { n: answer.questions_left }),
        });
        setPhase('clarify');
        return;
      }
      say({ kind: 'answer', answer }, { kind: 'bot', text: s.askPain, small: s.askPainSmall });
      setPhase('pain');
      track('cra_check_answered', { verdict: answer.verdict });
    } catch (e) {
      setError(errorText(e));
      setPhase(turns.current.length ? 'clarify' : 'describe');
      // The answer that failed is asked again on the next send.
      if (turns.current.length) {
        const last = turns.current.pop();
        if (last) setText(last.answer);
      } else {
        setText(description.current);
      }
    }
  }

  async function sendPain(choice: PainChoice | null, value: string | null) {
    setPhase('sending');
    try {
      await api.current.pain(token.current, choice, value);
      say(
        { kind: 'visitor', text: value ?? s.pains[choice ?? 'other'] },
        { kind: 'bot', text: s.thanks, small: s.checkInbox },
        { kind: 'done' },
      );
      setText('');
      setPhase('done');
      track('cra_check_pain', { choice: choice ?? 'text' });
    } catch (e) {
      setError(errorText(e));
      setPhase('pain');
    }
  }

  function send() {
    const value = text.trim();
    if (!value) return;
    setError('');
    if (phase === 'email') {
      void submitEmail(value);
    } else if (phase === 'describe') {
      description.current = value;
      say({ kind: 'visitor', text: value });
      setText('');
      void runCheck();
    } else if (phase === 'clarify') {
      turns.current = [...turns.current, { question: question.current, answer: value }];
      say({ kind: 'visitor', text: value });
      setText('');
      void runCheck();
    } else if (phase === 'pain') {
      void sendPain(null, value);
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  const copyAnswer = (answer: CheckAnswer) => {
    const lines = [
      s.verdicts[answer.verdict],
      answer.category ? s.categories[answer.category] : '',
      answer.summary,
      answer.citations.map((c) => c.label).join(', '),
    ].filter(Boolean);
    navigator.clipboard?.writeText(lines.join('\n')).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const pickPain = (choice: PainChoice) => {
    if (choice === 'other') {
      setText('');
      input.current?.focus();
      return;
    }
    setError('');
    void sendPain(choice, null);
  };

  const step = stepOf(phase);
  const busy = phase === 'starting' || phase === 'thinking' || phase === 'sending';
  const isEmail = phase === 'email' || phase === 'starting';
  const canType = phase !== 'done';
  const inputLabel = isEmail
    ? s.emailLabel
    : phase === 'clarify'
      ? s.answerLabel
      : phase === 'pain' || phase === 'sending'
        ? s.painLabel
        : s.productLabel;
  const placeholder =
    phase === 'clarify'
      ? s.answerPlaceholder
      : phase === 'pain' || phase === 'sending'
        ? s.painPlaceholder
        : s.productPlaceholder;

  return (
    <div className="cra-check">
      {!open && launcher && !launcherHidden && (
        <div className="cra-launcher">
          <button
            ref={launcherButton}
            type="button"
            className="cra-launcher-open"
            onClick={openChat}
            aria-label={s.launcherOpen}
          >
            <span className="cra-launcher-text">{s.launcher}</span>
            <span className="cra-launcher-icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            className="cra-launcher-hide"
            onClick={() => setLauncherHidden(true)}
            aria-label={s.hideLauncher}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      )}

      {open && (
        <section className="cra-panel" role="dialog" aria-label={s.title}>
          <header className="cra-head">
            <div className="cra-head-row">
              <h2 className="cra-title">
                {s.title}{' '}
                <span className="cra-step">
                  · {step > 4 ? s.stepDone : fill(s.stepOf, { n: step })}
                </span>
              </h2>
              <button type="button" className="cra-icon" onClick={restart} aria-label={s.restart}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button type="button" className="cra-icon" onClick={close} aria-label={s.close}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <ol className="cra-steps" aria-label={s.stepsLabel}>
              {s.steps.map((label, i) => (
                <li
                  key={label}
                  className={i + 1 < step ? 'is-done' : i + 1 === step ? 'is-current' : undefined}
                  aria-current={i + 1 === step ? 'step' : undefined}
                >
                  <span className="cra-steps-bar" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ol>
          </header>

          <div className="cra-log" ref={log} aria-live="polite">
            {messages.map((m, i) => {
              if (m.kind === 'bot')
                return (
                  <div key={i} className="cra-msg cra-bot">
                    <p>{m.text}</p>
                    {m.small && <p className="cra-small">{m.small}</p>}
                  </div>
                );
              if (m.kind === 'visitor')
                return (
                  <div key={i} className="cra-msg cra-visitor">
                    <span className="visually-hidden">{s.you}: </span>
                    {m.text}
                  </div>
                );
              if (m.kind === 'done')
                return (
                  <a key={i} className="cra-cta" href="/early-access/?interest=cra">
                    {s.earlyAccess}
                  </a>
                );
              const a = m.answer;
              return (
                <article key={i} className={`cra-answer is-${a.verdict}`}>
                  <p className="cra-verdict">{s.verdicts[a.verdict]}</p>
                  {a.category && <h3 className="cra-category">{s.categories[a.category]}</h3>}
                  <p className="cra-summary">{a.summary}</p>
                  {a.verdict === 'in_scope' && (
                    <div className="cra-clocks">
                      <p className="cra-small">{s.clocks.intro}</p>
                      <dl className="cra-lanes">
                        {s.clocks.lanes.map((lane, n) => (
                          <div key={lane} className="cra-lane">
                            <dt>{lane}</dt>
                            <dd>
                              <span className={`cra-lane-bar is-${n}`} aria-hidden="true" />
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="cra-small cra-lane-caption">
                        {s.clocks.caption}. <a href="/deadlines/">{s.clocks.link}</a>
                      </p>
                    </div>
                  )}
                  {a.citations.length > 0 && (
                    <ul className="cra-cites">
                      {a.citations.map((c) => (
                        <li key={c.id}>
                          <a href={c.url} target="_blank" rel="noopener">
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <button type="button" className="cra-copy" onClick={() => copyAnswer(a)}>
                    {copied ? s.copied : s.copy}
                  </button>
                </article>
              );
            })}
            {phase === 'thinking' && (
              <ul className="cra-msg cra-bot cra-thinking" aria-label={s.thinking}>
                {s.thinkingSteps.map((label, i) => (
                  <li
                    key={label}
                    className={
                      i < thinkingStep ? 'is-done' : i === thinkingStep ? 'is-current' : undefined
                    }
                  >
                    <span className="cra-dot" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
            {(phase === 'pain' || phase === 'sending') && (
              <div className="cra-chips cra-chips-log">
                {painChoices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    className="cra-chip"
                    disabled={busy}
                    onClick={() => pickPain(choice)}
                  >
                    {s.pains[choice]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="cra-foot">
            {phase === 'describe' && (
              <div className="cra-chips">
                {s.examples.map((ex) => (
                  <button
                    key={ex.label}
                    type="button"
                    className="cra-chip"
                    onClick={() => {
                      setText(ex.text);
                      input.current?.focus();
                    }}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            )}
            {error && (
              <p className="cra-error" role="alert">
                {error}
              </p>
            )}
            {canType && (
              <form className="cra-form" onSubmit={onSubmit} noValidate>
                <label htmlFor="cra-input" className="visually-hidden">
                  {inputLabel}
                </label>
                {isEmail ? (
                  <input
                    ref={input}
                    id="cra-input"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={254}
                    placeholder={s.emailPlaceholder}
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      setError('');
                    }}
                    disabled={busy}
                  />
                ) : (
                  <textarea
                    ref={input}
                    id="cra-input"
                    rows={2}
                    maxLength={phase === 'describe' ? 2000 : 1000}
                    placeholder={placeholder}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={busy}
                  />
                )}
                {isEmail ? (
                  <button type="submit" className="cra-send-text" disabled={busy}>
                    {s.continue}
                  </button>
                ) : (
                  <button type="submit" className="cra-send" disabled={busy} aria-label={s.send}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 12l16-8-6 16-2.5-6.5z" />
                    </svg>
                  </button>
                )}
              </form>
            )}
            <p className="cra-small cra-note">
              {phase === 'done' ? s.source : s.footnote} <a href="/privacy/">{s.privacy}</a>
            </p>
            <div className="cra-turnstile" ref={turnstileSlot} />
          </div>
        </section>
      )}
    </div>
  );
}
