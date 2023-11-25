import { describe, it, expect } from 'vitest';
import { waitFor, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TEST_ID as CHRCTRS_LIST_TEST_ID } from '../src/components/CharactersList/CharactersList';
import { gsspCtx } from './utils/utils';
import {
  getHandlersByMockedArray,
  getRandomCharactersArray,
} from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';
import MainPage, { getServerSideProps } from '../pages/page/[pageID]';
import { rickMortyApi } from '../src/services/api/rickMortyApi';

describe('Card List Component', () => {
  it('renders the specified number of cards', async () => {
    const characters = getRandomCharactersArray();
    server.use(...getHandlersByMockedArray(characters));

    const res = await getServerSideProps(
      gsspCtx({
        query: {
          itemsPerPage: '1000',
        },
      })
    );

    render(<MainPage {...res.props} />);

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

    const res = await getServerSideProps(
      gsspCtx({
        query: {
          searchTerm: 'some not existed value',
        },
      })
    );

    render(<MainPage {...res.props} />);

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
