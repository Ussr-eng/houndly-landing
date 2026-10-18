import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    // An unusual host zone (UTC+12:45/+13:45) proves results never depend on the machine's zone.
    env: { TZ: 'Pacific/Chatham' },
  },
});
