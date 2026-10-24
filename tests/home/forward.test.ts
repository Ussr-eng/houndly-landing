import { describe, expect, it } from 'vitest';
import { calculatorTarget } from '../../src/scripts/home';

describe('calculatorTarget', () => {
  it('forwards an old calculator link with its query', () => {
    const search = '?aware=2026-10-01T09:00Z&country=be&events=cra.severe_incident&rules=v1';
    expect(calculatorTarget(search)).toBe(`/deadlines/${search}`);
  });

  it('keeps the home page for other queries', () => {
    expect(calculatorTarget('')).toBeNull();
    expect(calculatorTarget('?plan=team')).toBeNull();
  });
});
