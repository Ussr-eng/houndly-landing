// The committed rules/ copy must match rules.lock.json (written by `pnpm sync-rules`) and the
// shared JSON schemas. Never edit rules/ by hand: change ../backend/rules and run the sync.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import { describe, expect, it } from 'vitest';
import {
  LOCK_FILE,
  combinedChecksum,
  hashFiles,
  isRulesFile,
  latestRuleSetVersion,
  listFiles,
  type RulesLock,
} from '../scripts/rules-lock';
import { currentRuleSet } from '../src/lib/deadlines/rules';

const ROOT = join(import.meta.dirname, '..');
const RULES = join(ROOT, 'rules');
const lock = JSON.parse(readFileSync(join(ROOT, LOCK_FILE), 'utf8')) as RulesLock;
const files = listFiles(RULES);
const readJson = (p: string): unknown => JSON.parse(readFileSync(join(RULES, p), 'utf8'));

describe('rules/ copy', () => {
  it('contains exactly the files recorded in the lock', () => {
    expect(files).toEqual(Object.keys(lock.files).sort());
    expect(files.every(isRulesFile)).toBe(true);
  });

  it.each(files)('%s matches its recorded checksum', (p) => {
    expect(hashFiles(RULES, [p])[p]).toBe(lock.files[p]);
  });

  it('matches the combined checksum', () => {
    expect(combinedChecksum(hashFiles(RULES, files))).toBe(lock.checksum);
  });

  it('records the rule set version the calculator uses', () => {
    expect(lock.rule_set_version).toBe(latestRuleSetVersion(files));
    expect(currentRuleSet.rule_set_version).toBe(lock.rule_set_version);
  });

  it('was synced from a clean backend', () => {
    expect(lock.backend_dirty).not.toBe(true);
  });
});

describe('rules/ schemas', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validateRuleSet = ajv.compile(readJson('schema.json') as object);
  const validateCase = ajv.compile(readJson('case.schema.json') as object);

  it.each(files.filter((p) => /^v\d+\.json$/.test(p)))('%s is a valid rule set', (p) => {
    expect(validateRuleSet(readJson(p)), JSON.stringify(validateRuleSet.errors)).toBe(true);
  });

  it.each(files.filter((p) => p.startsWith('cases/')))('%s is a valid case', (p) => {
    const data = readJson(p) as { id: string };
    expect(validateCase(data), JSON.stringify(validateCase.errors)).toBe(true);
    expect(`cases/${data.id}.json`).toBe(p);
  });

  it('has unique rule ids and verified_at/TODO(verify) consistency', () => {
    const ids = currentRuleSet.rules.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of currentRuleSet.rules) {
      if (r.verified_at === null) expect(r.notes).toContain('TODO(verify)');
    }
  });
});
