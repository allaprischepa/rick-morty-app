import { describe, it, vi, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_CARD_TEST_ID } from '../src/components/CharacterCard/CharacterCard';
import userEvent from '@testing-library/user-event';
import { TEST_ID as CHRCTR_DTLS_TEST_ID } from '../src/components/CharacterDetails/CharacterDetails';
import { API_URL, httpStatus } from '../src/services/dataLoader/settings';
import { renderWithProviders } from './utils/utils';

const character: CharacterData = {
  id: 6,
  name: 'Fusce',
  status: 'Accumsan',
  species: 'Posuere',
  type: 'Porttitor',
  gender: 'Vitae',
  origin: {
    name: 'Praesent porttitor',
    url: 'Mauris',
  },
  location: {
    name: 'Dignissim dolor',
    url: 'Nulla',
  },
  image: 'Vestibulum',
};

vi.mock('node-fetch');
const fetchMock = vi.fn();

fetchMock.mockImplementation(async (url: string) => {
  if (url === `${API_URL}/${character.id}`) {
    return {
      status: httpStatus.OK,
      json: async () => Promise.resolve(character),
    };
  } else {
    return {
      status: httpStatus.OK,
      json: async () =>
        Promise.resolve({
          results: [character],
          pages: 1,
        }),
    };
  }
});

global.fetch = fetchMock;

describe('Click On A Card', () => {
  it('triggers an additional API call to fetch detailed information.', async () => {
    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/${character.id}`);

    const details = await screen.findByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();
  });
});
