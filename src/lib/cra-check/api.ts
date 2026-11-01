// Client for the backend's public CRA check (houndly-backend, POST /public/cra-check/*).
// One small interface, so the widget can be tested with a fake.

export type Verdict = 'in_scope' | 'out_of_scope' | 'depends' | 'off_topic';
export type Category = 'default' | 'important_class_i' | 'important_class_ii' | 'critical';

export const painChoices = [
  'which_reports',
  'reports_take_long',
  'nobody_watches_clock',
  'wrong_person_woken',
  'customers_ask_cra',
  'other',
] as const;
export type PainChoice = (typeof painChoices)[number];

export interface Turn {
  question: string;
  answer: string;
}

export interface Citation {
  id: string;
  label: string;
  url: string;
}

export interface CheckAnswer {
  verdict: Verdict;
  category: Category | null;
  summary: string;
  clarifying_question: string | null;
  citations: Citation[];
  questions_left: number;
}

export interface CraCheckApi {
  start(email: string, page: string, turnstileToken: string): Promise<string>;
  check(token: string, description: string, turns: Turn[]): Promise<CheckAnswer>;
  pain(token: string, choice: PainChoice | null, text: string | null): Promise<void>;
}

/** A failed call. status 0 means the network failed. */
export class CraCheckError extends Error {
  constructor(readonly status: number) {
    super(`cra check failed: ${status}`);
  }
}

/** The page path as the backend accepts it (lower case, letters, digits, / _ -). */
export function pagePath(pathname: string): string {
  const p = pathname.toLowerCase();
  return /^\/[a-z0-9/_-]{0,199}$/.test(p) ? p : '/';
}

export function httpApi(origin: string, fetchImpl: typeof fetch = fetch): CraCheckApi {
  const base = origin.replace(/\/+$/, '');
  async function post(path: string, body: unknown): Promise<Response> {
    let res: Response;
    try {
      res = await fetchImpl(`${base}/public/cra-check${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch {
      throw new CraCheckError(0);
    }
    if (!res.ok) throw new CraCheckError(res.status);
    return res;
  }
  return {
    async start(email, page, turnstileToken) {
      const res = await post('/start', { email, page, turnstile_token: turnstileToken });
      return ((await res.json()) as { check_token: string }).check_token;
    },
    async check(token, description, turns) {
      const res = await post('', { check_token: token, description, turns });
      return (await res.json()) as CheckAnswer;
    },
    async pain(token, choice, text) {
      await post('/pain', { check_token: token, choice, text });
    },
  };
}
