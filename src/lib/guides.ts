import type { GuideData } from '../content/guide-schema';

export interface GuideLike {
  id: string;
  data: Pick<GuideData, 'slug' | 'related' | 'draft'>;
}

/** Published guides; throws if any `related` slug does not point to a published guide. */
export function publishedGuides<G extends GuideLike>(all: G[]): G[] {
  const published = all.filter((g) => !g.data.draft);
  const slugs = new Set(published.map((g) => g.data.slug));
  for (const g of published) {
    const missing = g.data.related.filter((r) => !slugs.has(r));
    if (missing.length)
      throw new Error(
        `Guide "${g.data.slug}" links to missing related guides: ${missing.join(', ')}`,
      );
  }
  return published;
}
