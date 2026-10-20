// Form provider adapter. The Pages Function only talks to this interface, so the provider can
// be swapped by replacing one implementation.

import type { SubscribeData } from './validate';
import { CONSENT_VERSION } from './validate';

export interface SubscribeRequest {
  data: SubscribeData;
  /** Absolute URL the confirmation link sends the person to. */
  redirectionUrl: string;
  /** ISO timestamp of the sign-up. */
  at: string;
}

export type SubscribeOutcome =
  | { ok: true }
  | {
      ok: false;
      status: number;
      /** Provider error code and message, already safe to log (see safeErrorText). */
      code?: string;
      message?: string;
    };

export interface FormProvider {
  readonly name: string;
  subscribe(request: SubscribeRequest): Promise<SubscribeOutcome>;
}

export interface ProviderEnv {
  FORM_PROVIDER?: string;
  BREVO_API_KEY?: string;
  BREVO_LIST_KIT?: string;
  BREVO_LIST_WAITLIST?: string;
  BREVO_TEMPLATE_KIT?: string;
  BREVO_TEMPLATE_WAITLIST?: string;
}

/** Accepts everything and stores nothing. For previews and tests until the domain exists. */
export const fakeProvider: FormProvider = {
  name: 'fake',
  async subscribe() {
    return { ok: true };
  },
};

/**
 * Contact attributes as created in Brevo (names must exist there; see README). Empty strings are
 * left out: they carry nothing, and an existing contact keeps its earlier values.
 */
export function brevoAttributes(req: SubscribeRequest): Record<string, string | boolean> {
  const d = req.data;
  const all: Record<string, string | boolean> = {
    COMPANY: d.company,
    PRODUCT_TYPE: d.productType,
    LAWS: d.laws.join(','),
    CURRENT_PROCESS: d.currentProcess,
    PLAN: d.plan,
    SOURCE: `${d.list}:${d.source}`,
    CONSENT_VERSION,
    NEWS_CONSENT: d.newsConsent,
    SIGNUP_AT: req.at,
  };
  return Object.fromEntries(Object.entries(all).filter(([, v]) => v !== ''));
}

const MAX_ERROR_TEXT = 200;
const EMAIL_LIKE = /[^\s@"'<>(),;:]+@[^\s@"'<>(),;:]+/g;

/** Provider error text for the log: email-like parts redacted, at most 200 characters. */
export function safeErrorText(value: unknown): string | undefined {
  if (typeof value !== 'string' || value === '') return undefined;
  return value.replace(EMAIL_LIKE, '[redacted]').slice(0, MAX_ERROR_TEXT);
}

/** Reads Brevo's error body ({ code, message }) without ever failing. */
async function brevoError(res: Response): Promise<{ code?: string; message?: string }> {
  try {
    const json = (await res.json()) as { code?: unknown; message?: unknown };
    const code = safeErrorText(json.code);
    const message = safeErrorText(json.message);
    return { ...(code ? { code } : {}), ...(message ? { message } : {}) };
  } catch {
    return {};
  }
}

const positiveInt = (v: string | undefined) => (v && /^\d+$/.test(v) ? Number(v) : null);

/**
 * Brevo double opt-in: POST /v3/contacts/doubleOptinConfirmation. Brevo sends the confirmation
 * email; the contact joins the list once confirmed.
 */
export function brevoProvider(env: ProviderEnv, fetchImpl: typeof fetch): FormProvider | null {
  const key = env.BREVO_API_KEY;
  const lists = {
    kit: positiveInt(env.BREVO_LIST_KIT),
    waitlist: positiveInt(env.BREVO_LIST_WAITLIST),
  };
  const templates = {
    kit: positiveInt(env.BREVO_TEMPLATE_KIT),
    waitlist: positiveInt(env.BREVO_TEMPLATE_WAITLIST),
  };
  if (!key || !lists.kit || !lists.waitlist || !templates.kit || !templates.waitlist) return null;
  return {
    name: 'brevo',
    async subscribe(req) {
      const res = await fetchImpl('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
        method: 'POST',
        headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          email: req.data.email,
          attributes: brevoAttributes(req),
          includeListIds: [lists[req.data.list]],
          templateId: templates[req.data.list],
          redirectionUrl: req.redirectionUrl,
        }),
      });
      // 201 created; 204 has been seen for existing contacts. TODO(verify) against the API.
      if (res.ok) return { ok: true };
      return { ok: false, status: res.status, ...(await brevoError(res)) };
    },
  };
}

/** The configured provider, or null when it is not (fully) configured. */
export function selectProvider(env: ProviderEnv, fetchImpl: typeof fetch): FormProvider | null {
  if (env.FORM_PROVIDER === 'fake') return fakeProvider;
  if (env.FORM_PROVIDER === 'brevo') return brevoProvider(env, fetchImpl);
  return null;
}
