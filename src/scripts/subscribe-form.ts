// Progressive enhancement for <form data-subscribe>: send with fetch, show the result inline,
// load Turnstile on first interaction, send the analytics event after the server accepted.
// Without JavaScript the form posts normally and the server redirects to a status page.

import { track } from '../lib/analytics';
import { loadTurnstile } from '../lib/turnstile';

type Errors = Record<string, string>;

/** Wait briefly for the Turnstile token; send without it if it does not arrive. */
async function waitForToken(form: HTMLFormElement, ms = 5000): Promise<void> {
  const slot = form.querySelector<HTMLElement>('.form-turnstile');
  if (!slot) return;
  const started = Date.now();
  while (Date.now() - started < ms) {
    const input = form.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
    if (input?.value) return;
    await new Promise((r) => setTimeout(r, 100));
  }
}

function enhance(form: HTMLFormElement): void {
  const shownAt = Date.now();
  const errors = JSON.parse(form.dataset['errors'] ?? '{}') as Errors;
  const summary = form.querySelector<HTMLElement>('.form-summary');
  const status = form.querySelector<HTMLElement>('.form-status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const email = form.querySelector<HTMLInputElement>('input[name="email"]');
  const emailError = email ? document.getElementById(`${email.id}-error`) : null;
  const slot = form.querySelector<HTMLElement>('.form-turnstile');

  if (slot) {
    form.addEventListener(
      'focusin',
      () => {
        loadTurnstile()
          .then(() => window.turnstile?.render(slot, { sitekey: slot.dataset['sitekey'] ?? '' }))
          .catch(() => {
            // Blocked or offline: the server still accepts the form with its other checks.
          });
      },
      { once: true },
    );
  }

  const clear = () => {
    if (summary) {
      summary.hidden = true;
      summary.textContent = '';
    }
    if (emailError) {
      emailError.hidden = true;
      emailError.textContent = '';
    }
    email?.removeAttribute('aria-invalid');
    if (status) status.textContent = '';
  };

  const showError = (message: string, emailMessage?: string) => {
    if (emailMessage && emailError && email) {
      emailError.textContent = emailMessage;
      emailError.hidden = false;
      email.setAttribute('aria-invalid', 'true');
    }
    if (summary) {
      summary.textContent = message;
      summary.hidden = false;
      summary.focus();
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clear();
    const elapsed = form.querySelector<HTMLInputElement>('input[name="elapsed"]');
    if (elapsed) elapsed.value = String(Date.now() - shownAt);
    const label = button?.textContent ?? '';
    if (button) {
      button.disabled = true;
      button.textContent = form.dataset['sending'] ?? label;
    }
    try {
      await waitForToken(form);
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { accept: 'application/json' },
      });
      const body = (await res.json()) as {
        ok: boolean;
        error?: string;
        fields?: Record<string, string>;
      };
      if (body.ok) {
        form.reset();
        if (status) status.textContent = form.dataset['success'] ?? '';
        const name = form.dataset['event'];
        if (name === 'kit_requested') track(name);
        if (name === 'waitlist_submitted') {
          const interest = data.get('interest');
          track(name, { interest: typeof interest === 'string' && interest ? interest : 'none' });
        }
      } else if (body.error === 'invalid') {
        const code = body.fields?.['email'];
        showError(errors['summary'] ?? '', code ? errors[code] : undefined);
      } else {
        showError(errors[body.error ?? 'unavailable'] ?? errors['unavailable'] ?? '');
      }
    } catch {
      showError(errors['network'] ?? '');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
    }
  });
}

export function enhanceSubscribeForms(root: ParentNode = document): void {
  root.querySelectorAll<HTMLFormElement>('form[data-subscribe]').forEach(enhance);
}
