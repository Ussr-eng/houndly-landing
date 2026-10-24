// Pricing fake door (/pricing/ and the home page). Prices are a hypothesis the owner may change; plan names,
// descriptions and features are copy and live in src/i18n/en.ts under pricing.plans.
// No Product/Offer structured data: these prices cannot be bought yet.

export type PlanId = 'free' | 'starter' | 'team';

export interface Plan {
  id: PlanId;
  /** Whole euros per period; 0 for free. */
  price: number;
  period: 'month' | null;
  highlighted: boolean;
  /** 'early-access' opens the early-access form; 'calculator' links to the calculator. */
  action: 'early-access' | 'calculator';
}

export const plans: readonly Plan[] = [
  { id: 'free', price: 0, period: null, highlighted: false, action: 'calculator' },
  { id: 'starter', price: 29, period: 'month', highlighted: false, action: 'early-access' },
  { id: 'team', price: 99, period: 'month', highlighted: true, action: 'early-access' },
];

export const paidPlanIds = plans.filter((p) => p.action === 'early-access').map((p) => p.id);

export function isPaidPlanId(value: string): value is PlanId {
  return (paidPlanIds as string[]).includes(value);
}
