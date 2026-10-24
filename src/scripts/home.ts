// The calculator moved from / to /deadlines/. Links copied before the move carry the calculator
// state in the query (see src/lib/calculator/query.ts); forward them with the query intact.

const CALCULATOR_KEYS = ['aware', 'country', 'events', 'fix', 'sub', 'rules'];

export function calculatorTarget(search: string): string | null {
  const params = new URLSearchParams(search);
  return CALCULATOR_KEYS.some((key) => params.has(key)) ? `/deadlines/${search}` : null;
}

export function forwardCalculatorLink(): void {
  const target = calculatorTarget(window.location.search);
  if (target) window.location.replace(target);
}
