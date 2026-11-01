// Loads Cloudflare Turnstile once per page, on demand. Used by the forms and the CRA check.

import { site } from '../config/site';

export interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
}

interface Turnstile {
  render(el: HTMLElement, options: TurnstileOptions): string;
  reset(el?: HTMLElement | string): void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<void> | null = null;

export function loadTurnstile(): Promise<void> {
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = site.turnstile.scriptSrc;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error('turnstile'));
    };
    document.head.append(script);
  });
  return loading;
}
