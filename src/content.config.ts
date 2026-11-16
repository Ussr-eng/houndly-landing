import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { guideSchema } from './content/guide-schema';

const guides = defineCollection({
  // Ids come from the file path, not the `slug` field: a translation (de/<slug>.md) shares its
  // slug with the English guide and must not replace it.
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/guides',
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: guideSchema,
});

export const collections = { guides };
