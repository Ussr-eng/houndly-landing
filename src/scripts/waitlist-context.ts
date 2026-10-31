// Context for the early-access form: ?interest= preselects "What do you need first?", and the
// page the person came from on this site replaces the form's own path as SOURCE. Without
// JavaScript the form keeps its own path and no answer is preselected.

import { INTERESTS, type Interest } from '../lib/forms/validate';

/** The interest named in the query string, or null. */
export function interestFromQuery(search: string): Interest | null {
  const value = new URLSearchParams(search).get('interest');
  return (INTERESTS as readonly string[]).includes(value ?? '') ? (value as Interest) : null;
}

/** Path of a same-site referrer, in the shape the server accepts as source; otherwise null. */
export function sourceFromReferrer(referrer: string, origin: string): string | null {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    if (url.origin !== origin) return null;
    return /^\/[a-z0-9/-]{0,80}$/.test(url.pathname) ? url.pathname : null;
  } catch {
    return null;
  }
}

export function applyWaitlistContext(): void {
  const interest = interestFromQuery(window.location.search);
  const source = sourceFromReferrer(document.referrer, window.location.origin);
  document.querySelectorAll<HTMLFormElement>('form[data-subscribe]').forEach((form) => {
    if (form.querySelector('input[name="list"]')?.getAttribute('value') !== 'waitlist') return;
    if (interest) {
      const radio = form.querySelector<HTMLInputElement>(
        `input[name="interest"][value="${interest}"]`,
      );
      if (radio) radio.checked = true;
    }
    const field = form.querySelector<HTMLInputElement>('input[name="source"]');
    if (field && source && source !== window.location.pathname) field.value = source;
  });
}
