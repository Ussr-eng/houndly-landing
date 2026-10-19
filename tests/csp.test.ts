import { describe, expect, it } from 'vitest';
import { buildCsp, inlineScripts, insertCsp } from '../src/lib/csp';

describe('inlineScripts', () => {
  it('returns executable inline scripts only', () => {
    const html = `
      <script>a()</script>
      <script type="module">b()</script>
      <script src="/x.js"></script>
      <script type="application/ld+json">{"@type":"Article"}</script>
      <script defer data-analytics src="https://cloud.umami.is/script.js"></script>
      <script> </script>`;
    expect(inlineScripts(html)).toEqual(['a()', 'b()']);
  });
});

describe('buildCsp', () => {
  const csp = buildCsp({
    scriptHashes: ['bbb=', 'aaa=', 'aaa='],
    scriptHosts: ['https://cloud.umami.is', 'https://challenges.cloudflare.com'],
    connectHosts: ['https://cloud.umami.is'],
    frameHosts: ['https://challenges.cloudflare.com'],
  });

  it('allows inline scripts by hash only', () => {
    expect(csp).toContain(
      "script-src 'self' 'sha256-aaa=' 'sha256-bbb=' https://challenges.cloudflare.com https://cloud.umami.is",
    );
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
  });

  it('locks down everything else', () => {
    for (const directive of [
      "default-src 'self'",
      "form-action 'self'",
      "base-uri 'none'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      'frame-src https://challenges.cloudflare.com',
      "connect-src 'self' https://cloud.umami.is",
    ]) {
      expect(csp).toContain(directive);
    }
  });
});

describe('buildCsp report-only', () => {
  it('omits upgrade-insecure-requests, which browsers reject in report-only policies', () => {
    const base = { scriptHashes: [], scriptHosts: [], connectHosts: [], frameHosts: [] };
    expect(buildCsp(base)).toContain('upgrade-insecure-requests');
    expect(buildCsp({ ...base, reportOnly: true })).not.toContain('upgrade-insecure-requests');
  });
});

describe('insertCsp', () => {
  it('adds the header to the /* block', () => {
    const out = insertCsp(
      '# c\n\n/*\n  X-A: 1\n\n/x/*\n  X-B: 2\n',
      'Content-Security-Policy',
      "default-src 'self'",
    );
    expect(out).toBe(
      "# c\n\n/*\n  Content-Security-Policy: default-src 'self'\n  X-A: 1\n\n/x/*\n  X-B: 2\n",
    );
  });

  it('fails without a /* block', () => {
    expect(() => insertCsp('/x/*\n', 'Content-Security-Policy', 'x')).toThrow();
  });
});
