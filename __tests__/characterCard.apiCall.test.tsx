import { describe, it, vi, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_CARD_TEST_ID } from '../src/components/CharacterCard/CharacterCard';
import userEvent from '@testing-library/user-event';
import { TEST_ID as CHRCTR_DTLS_TEST_ID } from '../src/components/CharacterDetails/CharacterDetails';
import { API_URL } from '../src/services/api/settings';
import { renderWithProviders } from './utils/utils';
import { server } from '../src/services/api/__mocks__/server';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';

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

describe('Click On A Card', () => {
  it('triggers an additional API call to fetch detailed information.', async () => {
    const requestSpy = vi.fn();
    server.events.on('request:start', requestSpy);

    server.use(...getHandlersByMockedArray([character]));

    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({
          url: `${API_URL}/${character.id}`,
        }),
      })
    );

    const details = await screen.findByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();
  });
});
