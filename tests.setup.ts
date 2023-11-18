import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './src/services/api/__mocks__/server';
import { store } from './src/state/store';
import { rickMortyApi } from './src/services/api/rickMortyApi';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(rickMortyApi.util.resetApiState());
  cleanup();
});

afterAll(() => server.close());
