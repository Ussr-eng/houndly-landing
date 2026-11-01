// The CRA text base for the applicability check: Regulation (EU) 2024/2847 split into small,
// citable pieces. `scripts/build-cra-corpus.ts` builds corpus.json from the official text in
// source/; the AI check may cite only ids that exist here.

export const CRA_ELI_URL = 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj';

export type ChunkKind = 'recital' | 'article' | 'annex';

export interface Chunk {
  /** Stable id, e.g. `recital-12`, `art-2-2`, `art-3-13`, `annex-iii-class-i-17`, `annex-i-part-ii`. */
  id: string;
  /** Human label, e.g. `Recital 12`, `Article 2(2)`, `Annex III, class I, point 17`. */
  label: string;
  kind: ChunkKind;
  /** Article or annex title, e.g. `Scope`, `Important products with digital elements`. */
  title: string | null;
  text: string;
}

export interface Corpus {
  source: string;
  url: string;
  chunks: Chunk[];
}

export function chunkIndex(corpus: Corpus): Map<string, Chunk> {
  return new Map(corpus.chunks.map((c) => [c.id, c]));
}
