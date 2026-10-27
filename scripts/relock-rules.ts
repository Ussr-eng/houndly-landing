// pnpm relock-rules: record checksums for rules/ as edited in this repository. Used while the
// backend is not deployed and rules/ is the source of truth (see CLAUDE.md); once the backend is
// live again, use `pnpm sync-rules` instead.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
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
const RULES = join(ROOT, 'rules');

const files = listFiles(RULES);
const stray = files.filter((p) => !isRulesFile(p));
if (stray.length) {
  console.error(`relock-rules: unexpected files in rules/: ${stray.join(', ')}`);
  process.exit(1);
}

const hashes = hashFiles(RULES, files);
const lock: RulesLock = {
  source: 'rules (edited in this repository; backend not deployed)',
  backend_commit: null,
  backend_dirty: null,
  rule_set_version: latestRuleSetVersion(files),
  checksum: combinedChecksum(hashes),
  files: hashes,
};
writeFileSync(join(ROOT, LOCK_FILE), JSON.stringify(lock, null, 2) + '\n');
console.log(
  `relock-rules: ${files.length} files, rule set ${lock.rule_set_version}, checksum ${lock.checksum.slice(0, 12)}`,
);
