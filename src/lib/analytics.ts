// Typed, provider-agnostic analytics. Safe to call anywhere: it does nothing on the server,
// in dev, or when the provider script is missing or blocked. Events sent before the script
// has loaded are queued (see enqueue) and sent once it loads.

export interface AnalyticsEvents {
  calculator_opened: undefined;
  calculator_calculated: { regimes: string; event_type: string };
  ics_downloaded: { scope: 'single' | 'all' };
  link_copied: undefined;
  kit_requested: undefined;
  buy_clicked: { plan: string };
  waitlist_submitted: undefined;
}

export type AnalyticsEvent = keyof AnalyticsEvents;

export const analyticsEvents = [
  'calculator_opened',
  'calculator_calculated',
  'ics_downloaded',
  'link_copied',
  'kit_requested',
  'buy_clicked',
  'waitlist_submitted',
] as const satisfies readonly AnalyticsEvent[];

type Props = Record<string, string>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Props) => void };
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

/** One adapter per supported provider; the first whose script is present receives the event. */
const providers: ((w: Window, event: string, props: Props | undefined) => boolean)[] = [
  (w, event, props) => {
    if (typeof w.umami?.track !== 'function') return false;
    w.umami.track(event, props);
    return true;
  },
  (w, event, props) => {
    if (typeof w.plausible !== 'function') return false;
    w.plausible(event, props ? { props } : undefined);
    return true;
  },
];

/** Events sent before the provider script has loaded wait here, up to this many. */
export const MAX_QUEUED_EVENTS = 20;
let queue: [string, Props | undefined][] = [];
let waiting = false;

function deliver(event: string, props: Props | undefined): boolean {
  for (const send of providers) if (send(window, event, props)) return true;
  return false;
}

/** Wait for the analytics <script data-analytics> to load, then send queued events once. */
function enqueue(event: string, props: Props | undefined): void {
  const script = document.querySelector<HTMLScriptElement>('script[data-analytics]');
  if (!script) return; // Analytics is not on this page (dev, previews, turned off).
  if (queue.length < MAX_QUEUED_EVENTS) queue.push([event, props]);
  if (waiting) return;
  waiting = true;
  const done = () => {
    waiting = false;
    script.removeEventListener('load', onLoad);
    script.removeEventListener('error', onError);
  };
  const onLoad = () => {
    done();
    const pending = queue;
    queue = [];
    try {
      for (const [e, p] of pending) deliver(e, p);
    } catch {
      // Analytics must never break the page.
    }
  };
  const onError = () => {
    done();
    queue = []; // Blocked or failed: drop.
  };
  script.addEventListener('load', onLoad);
  script.addEventListener('error', onError);
}

type TrackArgs<E extends AnalyticsEvent> = AnalyticsEvents[E] extends undefined
  ? [event: E]
  : [event: E, props: AnalyticsEvents[E]];

export function track<E extends AnalyticsEvent>(...args: TrackArgs<E>): void {
  const [event, props] = args as [E, Props | undefined];
  try {
    if (typeof window === 'undefined') return;
    if (!deliver(event, props)) enqueue(event, props);
  } catch {
    // Analytics must never break the page.
  }
}
