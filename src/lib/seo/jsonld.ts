// schema.org JSON-LD builders. FAQPage is deliberately absent (see CLAUDE.md SEO rule 5).

type JsonLd = Record<string, unknown>;

export interface Person {
  name: string;
  url?: string | null | undefined;
}

export function webApplication(input: {
  name: string;
  url: string;
  description: string;
  inLanguage: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: input.name,
    url: input.url,
    description: input.description,
    inLanguage: input.inLanguage,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
}

export function article(input: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: Date;
  dateModified: Date;
  author: Person;
  publisher: { name: string; url: string };
  inLanguage: string;
}): JsonLd {
  if (input.dateModified < input.datePublished)
    throw new Error(`JSON-LD: dateModified is before datePublished for "${input.headline}"`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    url: input.url,
    image: [input.image],
    datePublished: input.datePublished.toISOString(),
    dateModified: input.dateModified.toISOString(),
    author: {
      '@type': input.author.url ? 'Person' : 'Organization',
      name: input.author.name,
      ...(input.author.url ? { url: input.author.url } : {}),
    },
    publisher: { '@type': 'Organization', name: input.publisher.name, url: input.publisher.url },
    inLanguage: input.inLanguage,
  };
}

export function breadcrumbList(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> body; "<" is escaped so nothing can close the tag. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
