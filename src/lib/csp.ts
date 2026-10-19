// Content-Security-Policy for the static site. Inline scripts (Astro's island bootstrap and
// any inlined module) are allowed by their sha256 hashes, computed from the built HTML by
// scripts/csp.ts. Pure functions: no file system or crypto imports here.

export interface CspSources {
  scriptHashes: string[];
  scriptHosts: string[];
  connectHosts: string[];
  frameHosts: string[];
  /** Report-only policies must not contain upgrade-insecure-requests (browsers warn). */
  reportOnly?: boolean;
}

const NON_EXECUTABLE = /^(application\/(ld\+)?json|text\/plain)$/i;

/** Contents of inline <script> elements that browsers execute (no src, JS type). */
export function inlineScripts(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1] ?? '';
    const body = m[2] ?? '';
    if (/\ssrc\s*=/i.test(attrs)) continue;
    const type = /\stype\s*=\s*"([^"]*)"/i.exec(attrs)?.[1];
    if (type && NON_EXECUTABLE.test(type)) continue;
    if (body.trim() === '') continue;
    out.push(body);
  }
  return out;
}

export function buildCsp(sources: CspSources): string {
  const uniq = (xs: string[]) => [...new Set(xs)].sort();
  const hashes = uniq(sources.scriptHashes).map((h) => `'sha256-${h}'`);
  return [
    "default-src 'self'",
    ["script-src 'self'", ...hashes, ...uniq(sources.scriptHosts)].join(' '),
    // Inline <style> (inlined CSS, font faces) and React style attributes (timeline positions).
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    ["connect-src 'self'", ...uniq(sources.connectHosts)].join(' '),
    sources.frameHosts.length
      ? ['frame-src', ...uniq(sources.frameHosts)].join(' ')
      : "frame-src 'none'",
    "form-action 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    ...(sources.reportOnly ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

/** Insert the header into the existing "/*" block of a Cloudflare _headers file. */
export function insertCsp(headers: string, name: string, value: string): string {
  const lines = headers.split('\n');
  const i = lines.findIndex((l) => l.trim() === '/*');
  if (i === -1) throw new Error('_headers has no "/*" block');
  lines.splice(i + 1, 0, `  ${name}: ${value}`);
  return lines.join('\n');
}

export function originOf(url: string): string {
  return new URL(url).origin;
}
