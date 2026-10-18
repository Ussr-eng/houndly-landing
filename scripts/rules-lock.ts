// Checksums for the committed copy of the deadline rules (rules/). Shared by
// scripts/sync-rules.ts (writes rules.lock.json) and tests/rules-sync.test.ts (verifies it).

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const LOCK_FILE = 'rules.lock.json';

export interface RulesLock {
  source: string;
  backend_commit: string | null;
  backend_dirty: boolean | null;
  rule_set_version: string;
  checksum: string;
  files: Record<string, string>;
}

/** Files that belong in rules/: README, both schemas, every vN.json and every case. */
export function isRulesFile(path: string): boolean {
  return (
    path === 'README.md' ||
    path === 'schema.json' ||
    path === 'case.schema.json' ||
    /^v[1-9][0-9]*\.json$/.test(path) ||
    /^cases\/[^/]+\.json$/.test(path)
  );
}

/** All files under `dir`, as sorted POSIX paths relative to it. */
export function listFiles(dir: string): string[] {
  const walk = (d: string): string[] =>
    readdirSync(d).flatMap((name) => {
      const full = join(d, name);
      return statSync(full).isDirectory() ? walk(full) : [relative(dir, full).split(sep).join('/')];
    });
  return walk(dir).sort();
}

export function sha256(data: Buffer | string): string {
  return createHash('sha256').update(data).digest('hex');
}

export function hashFiles(dir: string, paths: string[]): Record<string, string> {
  return Object.fromEntries(paths.map((p) => [p, sha256(readFileSync(join(dir, p)))]));
}

/** Combined checksum over the sorted "path\0sha256\n" lines. */
export function combinedChecksum(files: Record<string, string>): string {
  return sha256(
    Object.keys(files)
      .sort()
      .map((p) => `${p}\0${files[p]}\n`)
      .join(''),
  );
}

/** Highest rule set version among the vN.json files, e.g. "v1". */
export function latestRuleSetVersion(paths: string[]): string {
  const versions = paths
    .map((p) => /^v([1-9][0-9]*)\.json$/.exec(p)?.[1])
    .filter((v): v is string => v !== undefined)
    .map(Number);
  if (!versions.length) throw new Error('No vN.json rule set found');
  return `v${Math.max(...versions)}`;
}
