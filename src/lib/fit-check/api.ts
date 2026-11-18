// Client for the backend's fit check (houndly-backend, POST /public/fit-check and
// /public/fit-check/email): "does Within24 solve my problem?". One small interface, so the
// AI guide can be tested with a fake.

import type { Locale } from '../../i18n/config';

export type FitVerdict = 'fits' | 'partly' | 'not_yet' | 'not_for_us';
export type FitStatus = 'available' | 'building' | 'next' | 'not_planned' | 'unknown';

export interface FitNeed {
  need: string;
  status: FitStatus;
  module: string | null;
}

export interface FitAnswer {
  check_token: string;
  verdict: FitVerdict;
  summary: string;
  needs: FitNeed[];
  modules: string[];
}

export interface FitCheckApi {
  ask(question: string, page: string, language: Locale, turnstileToken: string): Promise<FitAnswer>;
  email(token: string, email: string): Promise<void>;
}

/** A failed call. status 0 means the network failed. */
export class FitCheckError extends Error {
  constructor(readonly status: number) {
    super(`fit check failed: ${status}`);
  }
}

export function httpFitApi(origin: string, fetchImpl: typeof fetch = fetch): FitCheckApi {
  const base = origin.replace(/\/+$/, '');
  async function post(path: string, body: unknown): Promise<Response> {
    let res: Response;
    try {
      res = await fetchImpl(`${base}/public/fit-check${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new FitCheckError(0);
    }
    if (!res.ok) throw new FitCheckError(res.status);
    return res;
  }
  return {
    async ask(question, page, language, turnstileToken) {
      const res = await post('', {
        site: 'within24',
        page,
        language,
        question,
        turnstile_token: turnstileToken,
      });
      return (await res.json()) as FitAnswer;
    },
    async email(token, email) {
      await post('/email', { check_token: token, email });
    },
  };
}

/**
 * Light up the module cards that cover the visitor's problem and dim the rest.
 * Cards carry `data-module="<id>"`; the section carries `data-fit-cards`.
 * An empty list (or a reset) clears the state.
 */
export function highlightModules(ids: readonly string[] | null, root: ParentNode = document): void {
  const section = root.querySelector<HTMLElement>('[data-fit-cards]');
  if (!section) return;
  if (ids === null) {
    delete section.dataset.answered;
  } else {
    section.dataset.answered = 'true';
  }
  for (const card of section.querySelectorAll<HTMLElement>('[data-module]')) {
    const hit = ids !== null && ids.includes(card.dataset.module ?? '');
    if (hit) card.dataset.fit = 'yes';
    else delete card.dataset.fit;
  }
}
