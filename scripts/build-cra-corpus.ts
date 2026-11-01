// pnpm build-cra-corpus: split the official CRA text (cra-check/source/) into citable chunks and
// write cra-check/corpus.json. Run it after replacing the source text; a test checks that the
// committed corpus.json matches what this script produces.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CRA_ELI_URL, type Corpus } from '../cra-check/corpus.ts';
import { parseCra } from '../cra-check/parse.ts';

const ROOT = join(import.meta.dirname, '..');
export const SOURCE_FILE = 'cra-check/source/cra-2024-2847-en.txt';
export const CORPUS_FILE = 'cra-check/corpus.json';

export function buildCorpus(): Corpus {
  const raw = readFileSync(join(ROOT, SOURCE_FILE), 'utf8');
  return {
    source: 'Regulation (EU) 2024/2847 (Cyber Resilience Act), OJ L, 20.11.2024, English text',
    url: CRA_ELI_URL,
    chunks: parseCra(raw),
  };
}

export function serializeCorpus(corpus: Corpus): string {
  return JSON.stringify(corpus, null, 2) + '\n';
}

if (import.meta.main) {
  const corpus = buildCorpus();
  writeFileSync(join(ROOT, CORPUS_FILE), serializeCorpus(corpus));
  console.log(`build-cra-corpus: ${corpus.chunks.length} chunks written to ${CORPUS_FILE}`);
}
