// Cloudflare Pages Function: POST /api/subscribe. Logic lives in src/lib/forms/handler.ts.

import { handleSubscribe, type SubscribeEnv } from '../../src/lib/forms/handler';

interface Context {
  request: Request;
  env: SubscribeEnv;
}

export const onRequestPost = (context: Context): Promise<Response> =>
  handleSubscribe(context.request, context.env, {
    fetch: (input, init) => fetch(input, init),
    now: () => new Date(),
    log: (event, detail) => console.log(JSON.stringify({ event, ...detail })),
  });

export const onRequest = (): Response =>
  new Response('Method not allowed', { status: 405, headers: { allow: 'POST' } });
