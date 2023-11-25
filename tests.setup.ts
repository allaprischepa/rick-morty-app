import { afterAll, afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './src/services/api/__mocks__/server';

beforeEach(() => {
  vi.mock('next/router', () => ({
    useRouter: vi.fn().mockReturnValue({
      query: {},
      pathname: 'page/1',
      push: vi.fn(),
    }),
  }));

  vi.mock('cookies', () => {
    class MockCookies {
      constructor() {}
      set() {}
      get() {}
    }

    return {
      __esModule: true,
      default: MockCookies,
    };
  });

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  cleanup();
});

afterAll(() => server.close());
