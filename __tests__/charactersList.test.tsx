import { describe, it, expect } from 'vitest';
import { waitFor, screen } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { TEST_ID as CHRCTRS_LIST_TEST_ID } from '../src/components/CharactersList/CharactersList';
import { renderWithProviders } from './utils/utils';
import {
  getHandlersByMockedArray,
  getRandomCharactersArray,
} from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';
import { setupStore } from '../src/state/store';

describe('Card List Component', () => {
  it('renders the specified number of cards', async () => {
    const characters = getRandomCharactersArray();
    server.use(...getHandlersByMockedArray(characters));

    const store = setupStore({
      itemsPerPage: {
        value: 10000,
      },
    });

    renderWithProviders(<App />, { store });

    await waitFor(() => {
      const characterCards = screen.getByTestId(CHRCTRS_LIST_TEST_ID).children;

      expect(characterCards.length > 0).toBe(true);
      expect(characterCards.length).toEqual(characters.length);
    });
  });
});

describe('Appropriate message', () => {
  it('is displayed if no cards are present', async () => {
    server.use(...getHandlersByMockedArray([]));

    renderWithProviders(<App />);

    await waitFor(() => {
      const characterCards = screen.getByTestId(CHRCTRS_LIST_TEST_ID).children;

      expect(characterCards.length).toEqual(1);
      expect(screen.getByText('Not found')).toBeInTheDocument();
      expect(
        screen.getByText(/There is no such character/)
      ).toBeInTheDocument();
    });
  });
});
