// Validation for the subscribe forms. Shared by the Pages Function (authoritative) and the
// pages (option lists). Plain TypeScript, no framework or runtime APIs.

import { isPaidPlanId, type PlanId } from '../../config/pricing';

export const LISTS = ['kit', 'waitlist'] as const;
export type ListId = (typeof LISTS)[number];

export const PRODUCT_TYPES = [
  'mobile',
  'desktop',
  'self_hosted',
  'iot',
  'sdk',
  'saas',
  'other',
] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

/** Early-access segmentation: one click each, all optional. */
export const COMPANY_SIZES = ['1-9', '10-49', '50-249', '250+'] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

export const ONCALL_TOOLS = [
  'pagerduty',
  'opsgenie',
  'grafana_oncall',
  'other_tool',
  'phone_chat',
  'nobody',
] as const;
export type OncallTool = (typeof ONCALL_TOOLS)[number];

export const SELLS_EU = ['yes', 'no', 'unsure'] as const;
export type SellsEu = (typeof SELLS_EU)[number];

export const LAWS = ['CRA', 'NIS2', 'GDPR', 'unsure'] as const;
export type Law = (typeof LAWS)[number];

/** Bumped whenever the consent wording next to the forms changes. */
export const CONSENT_VERSION = '2026-10-19';

export const LIMITS = { email: 254, company: 200, note: 300 } as const;

export type FieldError = 'required' | 'invalid' | 'too_long';

export interface SubscribeData {
  list: ListId;
  email: string;
  company: string;
  productType: ProductType | '';
  laws: Law[];
  /** Early access only. */
  companySize: CompanySize | '';
  currentProcess: OncallTool | '';
  sellsEu: SellsEu | '';
  note: string;
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

/** One value from a closed set: '' when empty, null when not in the set. */
function choice<T extends string>(raw: string, options: readonly T[]): T | '' | null {
  if (!raw) return '';
  return (options as readonly string[]).includes(raw) ? (raw as T) : null;
}

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

  const productType = choice(text(form.get('product_type')), PRODUCT_TYPES);
  if (productType === null) errors.productType = 'invalid';

  const lawsRaw = form.getAll('laws').map(text).filter(Boolean);
  const laws = [...new Set(lawsRaw)].filter((l): l is Law =>
    (LAWS as readonly string[]).includes(l),
  );
  if (laws.length !== new Set(lawsRaw).size) errors.laws = 'invalid';

  const waitlist = list === 'waitlist';
  const companySize = waitlist ? choice(text(form.get('company_size')), COMPANY_SIZES) : '';
  if (companySize === null) errors.companySize = 'invalid';
  const currentProcess = waitlist ? choice(text(form.get('current_process')), ONCALL_TOOLS) : '';
  if (currentProcess === null) errors.currentProcess = 'invalid';
  const sellsEu = waitlist ? choice(text(form.get('sells_eu')), SELLS_EU) : '';
  if (sellsEu === null) errors.sellsEu = 'invalid';
  const note = waitlist ? text(form.get('note')) : '';
  if (note.length > LIMITS.note) errors.note = 'too_long';

  const planRaw = waitlist ? text(form.get('plan')) : '';
  const plan = isPaidPlanId(planRaw) ? planRaw : '';
  if (planRaw && !plan) errors.plan = 'invalid';

  const newsConsent = list === 'kit' && text(form.get('news')) === 'yes';
  const sourceRaw = text(form.get('source'));
  const source = /^\/[a-z0-9/-]{0,80}$/.test(sourceRaw) ? sourceRaw : '';

  if (
    !list ||
    Object.keys(errors).length ||
    productType === null ||
    companySize === null ||
    currentProcess === null ||
    sellsEu === null
  )
    return { ok: false, list, errors };
  return {
    ok: true,
    data: {
      list,
      email,
      company,
      productType,
      laws,
      companySize,
      currentProcess,
      sellsEu,
      note,
      plan,
      newsConsent,
      source,
    },
  };
}
