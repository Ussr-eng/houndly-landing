// POST /api/subscribe: shared by both forms. Works with and without JavaScript:
// - fetch with "Accept: application/json" gets JSON;
// - a plain form post gets a 303 redirect to a static page.
// Never logs request bodies or email addresses.

import { selectProvider, type ProviderEnv, type SubscribeOutcome } from './provider';
import { validateSubscribe, type ListId, type FieldError, type SubscribeData } from './validate';

export interface SubscribeEnv extends ProviderEnv {
  TURNSTILE_SECRET_KEY?: string;
}

export interface Deps {
  fetch: typeof fetch;
  now: () => Date;
  log: (event: string, detail?: Record<string, string | number>) => void;
}

export type ErrorReason = 'invalid' | 'verification' | 'unavailable';

const MAX_BODY_BYTES = 16 * 1024;
/** Submissions faster than this after the form appeared are treated as bots. */
export const MIN_FILL_MS = 3000;
export const HONEYPOT_FIELD = 'website';

const SUCCESS_PAGE: Record<ListId, string> = {
  kit: '/incident-kit/check-email/',
  waitlist: '/pricing/thanks/',
};
const CONFIRMED_PAGE: Record<ListId, string> = {
  kit: '/incident-kit/confirmed/',
  waitlist: '/pricing/confirmed/',
};

function wantsJson(request: Request): boolean {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

function respond(
  request: Request,
  outcome:
    | { ok: true; list: ListId }
    | {
        ok: false;
        reason: ErrorReason;
        list: ListId | null;
        status: number;
        fields?: Partial<Record<keyof SubscribeData, FieldError>>;
      },
): Response {
  const origin = new URL(request.url).origin;
  if (wantsJson(request)) {
    const body = outcome.ok
      ? { ok: true }
      : { ok: false, error: outcome.reason, fields: outcome.fields ?? {} };
    return new Response(JSON.stringify(body), {
      status: outcome.ok ? 200 : outcome.status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  const path = outcome.ok ? SUCCESS_PAGE[outcome.list] : `/form-error/${outcome.reason}/`;
  return new Response(null, {
    status: 303,
    headers: { location: origin + path, 'cache-control': 'no-store' },
  });
}

async function verifyTurnstile(token: string, secret: string, deps: Deps): Promise<boolean> {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  // The visitor's IP is deliberately not sent (remoteip is optional).
  try {
    const res = await deps.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

export async function handleSubscribe(
  request: Request,
  env: SubscribeEnv,
  deps: Deps,
): Promise<Response> {
  if (request.method !== 'POST')
    return new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_BODY_BYTES) return new Response('Payload too large', { status: 413 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, { ok: false, reason: 'invalid', list: null, status: 400 });
  }

  const listGuess = form.get('list') === 'waitlist' ? 'waitlist' : 'kit';

  // Bots: answer exactly like a success, store nothing.
  const honeypot = form.get(HONEYPOT_FIELD);
  const elapsed = Number(form.get('elapsed'));
  if (
    (typeof honeypot === 'string' && honeypot.trim() !== '') ||
    (elapsed > 0 && elapsed < MIN_FILL_MS)
  ) {
    deps.log('subscribe_dropped', { reason: honeypot ? 'honeypot' : 'too_fast' });
    return respond(request, { ok: true, list: listGuess });
  }

  const result = validateSubscribe(form);
  if (!result.ok)
    return respond(request, {
      ok: false,
      reason: 'invalid',
      list: result.list,
      status: 400,
      fields: result.errors,
    });

  const token = form.get('cf-turnstile-response');
  if (typeof token === 'string' && token !== '' && env.TURNSTILE_SECRET_KEY) {
    if (!(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, deps)))
      return respond(request, {
        ok: false,
        reason: 'verification',
        list: result.data.list,
        status: 403,
      });
  }

  const provider = selectProvider(env, deps.fetch);
  if (!provider) {
    deps.log('subscribe_unconfigured');
    return respond(request, {
      ok: false,
      reason: 'unavailable',
      list: result.data.list,
      status: 503,
    });
  }

  const origin = new URL(request.url).origin;
  let outcome: SubscribeOutcome;
  try {
    outcome = await provider.subscribe({
      data: result.data,
      redirectionUrl: origin + CONFIRMED_PAGE[result.data.list],
      at: deps.now().toISOString(),
    });
  } catch {
    outcome = { ok: false, status: 0 };
  }
  if (!outcome.ok) {
    deps.log('subscribe_provider_error', {
      provider: provider.name,
      status: outcome.status,
      ...(outcome.code ? { code: outcome.code } : {}),
      ...(outcome.message ? { message: outcome.message } : {}),
    });
    return respond(request, {
      ok: false,
      reason: 'unavailable',
      list: result.data.list,
      status: 502,
    });
  }
  return respond(request, { ok: true, list: result.data.list });
}
