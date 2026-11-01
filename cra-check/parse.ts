// Splits the plain-text export of Regulation (EU) 2024/2847 (Official Journal layout) into chunks.
// The export keeps the page layout: running headers and footers on every page, footnotes at the
// bottom of pages, chapter headings between articles. All of that is removed here.

import type { Chunk } from './corpus.ts';

const PAGE_FOOTER =
  /^\s*(?:\d+\/\d+\s+)?ELI: http:\/\/data\.europa\.eu\/eli\/reg\/2024\/2847\/oj(?:\s+\d+\/\d+)?\s*$/;
const PAGE_HEADER = /^\s*(?:EN\s+)?OJ L, 20\.11\.2024(?:\s+EN)?\s*$/;
// A footnote names the act or Official Journal issue it refers to.
const FOOTNOTE_START =
  /^\s*\((\d+)\)\s+(?:Regulation|Directive|Decision|Council|Commission|OJ|Recommendation|Position|Opinion|Interinstitutional|Judgment)\b/;
const ANNEX_HEADING = /^\s*ANNEX ([IVX]+)\s*$/;
const ARTICLE_HEADING = /^\s*Article (\d+)\s*$/;
const CHAPTER_HEADING = /^\s*CHAPTER [IVX]+\s*$/;

/** Removes page headers, footers and footnotes. Returns the remaining lines in order. */
export function stripLayout(raw: string): string[] {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let page: string[] = [];
  // Footnotes are numbered through the body; each annex starts again at (1).
  let nextFootnote = 1;

  const flushPage = () => {
    let cut = page.length;
    for (let i = 0; i < page.length; i++) {
      const m = FOOTNOTE_START.exec(page[i] ?? '');
      if (m && Number(m[1]) === nextFootnote) {
        cut = i;
        break;
      }
    }
    for (let i = cut; i < page.length; i++) {
      const m = /^\s*\((\d+)\)\s/.exec(page[i] ?? '');
      if (m && Number(m[1]) === nextFootnote) nextFootnote++;
    }
    out.push(...page.slice(0, cut));
    page = [];
  };

  for (const line of lines) {
    if (PAGE_FOOTER.test(line)) {
      flushPage();
      continue;
    }
    if (PAGE_HEADER.test(line)) continue;
    if (ANNEX_HEADING.test(line)) {
      flushPage();
      nextFootnote = 1;
    }
    page.push(line);
  }
  flushPage();
  return out;
}

/** Joins wrapped lines into one paragraph of text. */
export function joinText(lines: string[]): string {
  let text = '';
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (!text) text = line;
    else if (text.endsWith('-') && /^[a-z]/.test(line)) text += line;
    else text += ' ' + line;
  }
  return text.replace(/\s+/g, ' ').trim();
}

function sliceBetween(lines: string[], start: RegExp, end: RegExp): string[] {
  const from = lines.findIndex((l) => start.test(l));
  const to = lines.findIndex((l, i) => i > from && end.test(l));
  if (from < 0 || to < 0) throw new Error(`cra parse: section ${start} … ${end} not found`);
  return lines.slice(from + 1, to);
}

function parseRecitals(lines: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  let current: { n: number; lines: string[] } | null = null;
  const push = () => {
    if (current)
      chunks.push({
        id: `recital-${current.n}`,
        label: `Recital ${current.n}`,
        kind: 'recital',
        title: null,
        text: joinText(current.lines),
      });
  };
  for (const line of lines) {
    const m = /^\s*\((\d+)\)\s+(.*)$/.exec(line);
    const expected: number = (current?.n ?? 0) + 1;
    if (m && Number(m[1]) === expected) {
      push();
      current = { n: expected, lines: [m[2] ?? ''] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  push();
  return chunks;
}

/** Drops chapter headings (`CHAPTER II` plus its upper-case title lines). */
function dropChapterHeadings(lines: string[]): string[] {
  const out: string[] = [];
  let inHeading = false;
  for (const line of lines) {
    if (CHAPTER_HEADING.test(line)) {
      inHeading = true;
      continue;
    }
    if (inHeading) {
      const t = line.trim();
      if (!t) continue;
      if (t === t.toUpperCase() && /[A-Z]/.test(t)) continue;
      inHeading = false;
    }
    out.push(line);
  }
  return out;
}

function parseArticles(lines: string[]): Chunk[] {
  const body = dropChapterHeadings(lines);
  const articles: { n: number; title: string; lines: string[] }[] = [];
  for (let i = 0; i < body.length; i++) {
    const m = ARTICLE_HEADING.exec(body[i] ?? '');
    if (m && Number(m[1]) === articles.length + 1) {
      let j = i + 1;
      while (j < body.length && !(body[j] ?? '').trim()) j++;
      articles.push({ n: Number(m[1]), title: (body[j] ?? '').trim(), lines: [] });
      i = j;
      continue;
    }
    articles.at(-1)?.lines.push(body[i] ?? '');
  }

  const chunks: Chunk[] = [];
  for (const art of articles) {
    // Article 3 is a numbered list of definitions; the others use numbered paragraphs.
    const marker = art.n === 3 ? /^\s*\((\d+)\)\s+(.*)$/ : /^\s*(\d+)\.\s+(.*)$/;
    const parts: { n: number; lines: string[] }[] = [];
    const lead: string[] = [];
    for (const line of art.lines) {
      const m = marker.exec(line);
      if (m && Number(m[1]) === parts.length + 1)
        parts.push({ n: parts.length + 1, lines: [m[2] ?? ''] });
      else if (parts.length) parts.at(-1)?.lines.push(line);
      else lead.push(line);
    }
    if (!parts.length) {
      chunks.push({
        id: `art-${art.n}`,
        label: `Article ${art.n}`,
        kind: 'article',
        title: art.title,
        text: joinText(lead),
      });
      continue;
    }
    const intro = joinText(lead);
    for (const p of parts) {
      const text = joinText(p.lines);
      chunks.push({
        id: `art-${art.n}-${p.n}`,
        label: `Article ${art.n}(${p.n})`,
        kind: 'article',
        title: art.title,
        // Article 3 opens with "For the purposes of this Regulation, the following definitions apply:".
        text: intro && p.n === 1 ? `${intro} ${text}` : text,
      });
    }
  }
  return chunks;
}

function annexTitle(lines: string[]): { title: string; rest: string[] } {
  let i = 0;
  while (i < lines.length && !(lines[i] ?? '').trim()) i++;
  const titleLines: string[] = [];
  while (i < lines.length) {
    const t = (lines[i] ?? '').trim();
    if (!t || t !== t.toUpperCase() || !/[A-Z]/.test(t)) break;
    titleLines.push(t);
    i++;
  }
  const raw = titleLines.join(' ');
  const title = (raw.charAt(0) + raw.slice(1).toLowerCase()).replace(/\beu\b/g, 'EU');
  return { title, rest: lines.slice(i) };
}

function parseListAnnex(roman: string, title: string, lines: string[]): Chunk[] {
  // Annex III (classes I and II) and Annex IV: one chunk per numbered product category.
  const chunks: Chunk[] = [];
  let cls: string | null = null;
  let current: { n: number; cls: string | null; lines: string[] } | null = null;
  const push = () => {
    if (!current) return;
    const clsId = current.cls ? `class-${current.cls.toLowerCase()}-` : '';
    const clsLabel = current.cls ? `class ${current.cls}, ` : '';
    chunks.push({
      id: `annex-${roman.toLowerCase()}-${clsId}${current.n}`,
      label: `Annex ${roman}, ${clsLabel}point ${current.n}`,
      kind: 'annex',
      title,
      text: joinText(current.lines),
    });
    current = null;
  };
  for (const line of lines) {
    const c = /^\s*Class (I|II)\s*$/.exec(line);
    if (c) {
      push();
      cls = c[1] ?? null;
      continue;
    }
    const m = /^\s*(\d+)\.\s+(.*)$/.exec(line);
    const expected: number = current && current.cls === cls ? current.n + 1 : 1;
    if (m && Number(m[1]) === expected) {
      push();
      current = { n: expected, cls, lines: [m[2] ?? ''] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  push();
  return chunks;
}

function parsePartAnnex(roman: string, title: string, lines: string[]): Chunk[] {
  // Annexes I and VIII are split into Parts; the other annexes stay whole.
  const parts: { part: string | null; heading: string; lines: string[] }[] = [];
  for (const line of lines) {
    const m = /^\s*Part ([IVX]+)\s+(\S.*)$/.exec(line);
    if (m && !/\bof Annex\b/.test(line)) {
      parts.push({ part: m[1] ?? null, heading: (m[2] ?? '').trim(), lines: [] });
    } else if (parts.length) {
      parts.at(-1)?.lines.push(line);
    } else {
      parts.push({ part: null, heading: '', lines: [line] });
    }
  }
  return parts
    .map((p) => ({ ...p, text: joinText(p.lines) }))
    .filter((p) => p.text)
    .map((p) => ({
      id: p.part
        ? `annex-${roman.toLowerCase()}-part-${p.part.toLowerCase()}`
        : `annex-${roman.toLowerCase()}`,
      label: p.part ? `Annex ${roman}, Part ${p.part}` : `Annex ${roman}`,
      kind: 'annex' as const,
      title: p.heading ? `${title}: ${p.heading}` : title,
      text: p.text,
    }));
}

function parseAnnexes(lines: string[]): Chunk[] {
  const chunks: Chunk[] = [];
  const starts = lines.flatMap((l, i) => {
    const m = ANNEX_HEADING.exec(l);
    return m ? [{ roman: m[1] ?? '', i }] : [];
  });
  starts.forEach(({ roman, i }, k) => {
    const end = starts[k + 1]?.i ?? lines.length;
    const { title, rest } = annexTitle(lines.slice(i + 1, end));
    if (roman === 'III' || roman === 'IV') chunks.push(...parseListAnnex(roman, title, rest));
    else chunks.push(...parsePartAnnex(roman, title, rest));
  });
  return chunks;
}

export function parseCra(raw: string): Chunk[] {
  const lines = stripLayout(raw);
  const recitals = parseRecitals(
    sliceBetween(lines, /^\s*Whereas:\s*$/, /HAVE ADOPTED THIS REGULATION/),
  );
  const firstAnnex = lines.findIndex((l) => ANNEX_HEADING.test(l));
  const adopted = lines.findIndex((l) => /HAVE ADOPTED THIS REGULATION/.test(l));
  // The enacting terms end with the signatures ("Done at Strasbourg, …").
  const done = lines.findIndex((l, i) => i > adopted && /^\s*Done at /.test(l));
  const articles = parseArticles(
    lines.slice(adopted + 1, done > 0 && done < firstAnnex ? done : firstAnnex),
  );
  const annexes = parseAnnexes(lines.slice(firstAnnex));
  return [...recitals, ...articles, ...annexes];
}
