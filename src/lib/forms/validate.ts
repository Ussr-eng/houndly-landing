// Validation for the subscribe forms. Shared by the Pages Function (authoritative) and the
// pages (option lists). Plain TypeScript, no framework or runtime APIs.

import { isPaidPlanId, type PlanId } from '../../config/pricing';

export const LISTS = ['kit', 'waitlist'] as const;
export type ListId = (typeof LISTS)[number];

export const PRODUCT_TYPES = ['device', 'software', 'mobile', 'other'] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export const LAWS = ['CRA', 'NIS2', 'GDPR', 'unsure'] as const;
export type Law = (typeof LAWS)[number];

/** Bumped whenever the consent wording next to the forms changes. */
export const CONSENT_VERSION = '2026-10-19';

export const LIMITS = { email: 254, company: 200, currentProcess: 1000 } as const;

export type FieldError = 'required' | 'invalid' | 'too_long';

export interface SubscribeData {
  list: ListId;
  email: string;
  company: string;
  productType: ProductType | '';
  laws: Law[];
  /** Early access only. */
  currentProcess: string;
  plan: PlanId | '';
  /** Incident Kit only: optional, unticked "Also send me product news". */
  newsConsent: boolean;
  /** Page path the form was sent from. */
  source: string;
}

export type ValidationResult =
  | { ok: true; data: SubscribeData }
  | { ok: false; list: ListId | null; errors: Partial<Record<keyof SubscribeData, FieldError>> };

/** Minimal shape of FormData that this needs (works with FormData and plain maps in tests). */
export interface FormLike {
  get(name: string): unknown;
  getAll(name: string): unknown[];
}

const text = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSubscribe(form: FormLike): ValidationResult {
  const listRaw = text(form.get('list'));
  const list = (LISTS as readonly string[]).includes(listRaw) ? (listRaw as ListId) : null;
  const errors: Partial<Record<keyof SubscribeData, FieldError>> = {};
  if (!list) errors.list = 'invalid';

  const email = text(form.get('email')).toLowerCase();
  if (!email) errors.email = 'required';
  else if (email.length > LIMITS.email) errors.email = 'too_long';
  else if (!EMAIL.test(email)) errors.email = 'invalid';

  const company = text(form.get('company'));
  if (company.length > LIMITS.company) errors.company = 'too_long';

  const productTypeRaw = text(form.get('product_type'));
  const productType = (PRODUCT_TYPES as readonly string[]).includes(productTypeRaw)
    ? (productTypeRaw as ProductType)
    : '';
  if (productTypeRaw && !productType) errors.productType = 'invalid';

  const lawsRaw = form.getAll('laws').map(text).filter(Boolean);
  const laws = [...new Set(lawsRaw)].filter((l): l is Law =>
    (LAWS as readonly string[]).includes(l),
  );
  if (laws.length !== new Set(lawsRaw).size) errors.laws = 'invalid';

  const currentProcess = list === 'waitlist' ? text(form.get('current_process')) : '';
  if (currentProcess.length > LIMITS.currentProcess) errors.currentProcess = 'too_long';

  const planRaw = list === 'waitlist' ? text(form.get('plan')) : '';
  const plan = isPaidPlanId(planRaw) ? planRaw : '';
  if (planRaw && !plan) errors.plan = 'invalid';

  const newsConsent = list === 'kit' && text(form.get('news')) === 'yes';
  const sourceRaw = text(form.get('source'));
  const source = /^\/[a-z0-9/-]{0,80}$/.test(sourceRaw) ? sourceRaw : '';

  if (!list || Object.keys(errors).length) return { ok: false, list, errors };
  return {
    ok: true,
    data: {
      list,
      email,
      company,
      productType,
      laws,
      currentProcess,
      plan,
      newsConsent,
      source,
    },
  };
}
