// Typed wrapper around the analytics tool (Plausible). Safe to call anywhere:
// it does nothing on the server, in dev, or when the script is blocked.

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

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

type TrackArgs<E extends AnalyticsEvent> = AnalyticsEvents[E] extends undefined
  ? [event: E]
  : [event: E, props: AnalyticsEvents[E]];

export function track<E extends AnalyticsEvent>(...args: TrackArgs<E>): void {
  const [event, props] = args as [E, Record<string, string> | undefined];
  try {
    if (typeof window === 'undefined' || typeof window.plausible !== 'function') return;
    window.plausible(event, props ? { props } : undefined);
  } catch {
    // Analytics must never break the page.
  }
}
