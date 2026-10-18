import { z } from 'astro/zod';
import { locales } from '../i18n/config';
import { DESCRIPTION_MAX, TITLE_MAX } from '../lib/seo/build';

export const regimes = ['CRA', 'NIS2', 'GDPR'] as const;

export const sourcePublishers = [
  'EUR-Lex',
  'ENISA',
  'European Commission',
  'National authority',
  'Other',
] as const;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'lowercase English slug');

export const guideSchema = z
  .object({
    title: z.string().min(1).max(TITLE_MAX),
    description: z.string().min(1).max(DESCRIPTION_MAX),
    slug,
    locale: z.enum(locales).default('en'),
    regimes: z.array(z.enum(regimes)).min(1),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    // null until a person has checked the guide against the official texts.
    lastVerified: z.coerce.date().nullable(),
    author: z.object({ name: z.string().min(1), url: z.url().optional() }).optional(),
    sources: z
      .array(
        z.object({
          title: z.string().min(1),
          url: z.url({ protocol: /^https$/ }),
          publisher: z.enum(sourcePublishers),
        }),
      )
      .min(1),
    related: z.array(slug).min(2).max(3),
    draft: z.boolean().default(false),
  })
  .refine((g) => g.dateModified >= g.datePublished, {
    message: 'dateModified must not be before datePublished',
    path: ['dateModified'],
  })
  .refine((g) => !g.related.includes(g.slug), {
    message: 'a guide cannot list itself as related',
    path: ['related'],
  });

export type GuideData = z.infer<typeof guideSchema>;
