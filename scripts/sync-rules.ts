// pnpm sync-rules: mirror ../backend/rules/ into rules/ byte for byte and record checksums in
// rules.lock.json. The backend is only read. Never edit rules/ by hand.

import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  LOCK_FILE,
  combinedChecksum,
  hashFiles,
  isRulesFile,
  latestRuleSetVersion,
  listFiles,
  type RulesLock,
} from './rules-lock.ts';

const ROOT = join(import.meta.dirname, '..');
const SOURCE_REL = '../backend/rules';
const SOURCE = join(ROOT, SOURCE_REL);
const TARGET = join(ROOT, 'rules');

function fail(message: string): never {
  console.error(`sync-rules: ${message}`);
  process.exit(1);
}

function git(args: string[]): string | null {
  try {
    return execFileSync('git', ['-C', join(ROOT, '..', 'backend'), ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

if (!existsSync(SOURCE)) fail(`${SOURCE_REL} not found`);

const sourceFiles = listFiles(SOURCE).filter(isRulesFile);
for (const required of ['README.md', 'schema.json', 'case.schema.json']) {
  if (!sourceFiles.includes(required)) fail(`${SOURCE_REL}/${required} is missing`);
}
if (!sourceFiles.some((p) => p.startsWith('cases/'))) fail(`${SOURCE_REL}/cases/ is empty`);
for (const p of sourceFiles.filter((f) => f.endsWith('.json'))) {
  try {
    JSON.parse(readFileSync(join(SOURCE, p), 'utf8'));
  } catch (e) {
    fail(`${SOURCE_REL}/${p} is not valid JSON: ${(e as Error).message}`);
  }
}
const version = latestRuleSetVersion(sourceFiles);

// Mirror: remove files that no longer exist in the source, then copy everything.
if (existsSync(TARGET)) {
  for (const p of listFiles(TARGET)) {
    if (!sourceFiles.includes(p)) rmSync(join(TARGET, p));
  }
}
for (const p of sourceFiles) {
  mkdirSync(dirname(join(TARGET, p)), { recursive: true });
  copyFileSync(join(SOURCE, p), join(TARGET, p));
}

const files = hashFiles(TARGET, sourceFiles);
const commit = git(['rev-parse', 'HEAD']);
const status = commit === null ? null : git(['status', '--porcelain', '--', 'rules']);
const lock: RulesLock = {
  source: SOURCE_REL,
  backend_commit: commit,
  backend_dirty: status === null ? null : status.length > 0,
  rule_set_version: version,
  checksum: combinedChecksum(files),
  files,
};
writeFileSync(join(ROOT, LOCK_FILE), JSON.stringify(lock, null, 2) + '\n');

console.log(
  `sync-rules: ${sourceFiles.length} files, rule set ${version}, checksum ${lock.checksum.slice(0, 12)}` +
    (lock.backend_dirty ? ' (backend rules have uncommitted changes)' : ''),
);
