import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { guideSchema } from './content/guide-schema';

const guides = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/guides' }),
  schema: guideSchema,
});

export const collections = { guides };
