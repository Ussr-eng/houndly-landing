// "Choose {plan}": without JavaScript the link jumps to the early-access form (on /pricing/ or
// /early-access/) and the person picks the plan there; ?plan= preselects it. With JavaScript: send buy_clicked {plan}, preselect the plan, focus
// the email field, no reload.

import { track } from '../lib/analytics';
import { isPaidPlanId } from '../config/pricing';

function select(plan: string): void {
  const sel = document.querySelector<HTMLSelectElement>('select[data-plan-select]');
  if (sel && isPaidPlanId(plan)) sel.value = plan;
}

export function enhancePlanButtons(): void {
  const fromUrl = new URLSearchParams(window.location.search).get('plan');
  if (fromUrl) select(fromUrl);

  document.querySelectorAll<HTMLAnchorElement>('a[data-choose-plan]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const plan = link.dataset['choosePlan'] ?? '';
      if (!isPaidPlanId(plan)) return;
      track('buy_clicked', { plan });
      // The form is on another page (the home page links to /early-access/): follow the link.
      const section = document.getElementById('early-access');
      if (!section) return;
      event.preventDefault();
      select(plan);
      const url = new URL(window.location.href);
      url.searchParams.set('plan', plan);
      url.hash = 'early-access';
      history.replaceState(null, '', url);
      section.scrollIntoView({ block: 'start' });
      section
        .querySelector<HTMLInputElement>('input[type="email"]')
        ?.focus({ preventScroll: true });
    });
  });
}
