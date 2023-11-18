import { describe, it, expect } from 'vitest';
import { screen, getByText } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_CARD_TEST_ID } from '../src/components/CharacterCard/CharacterCard';
import userEvent from '@testing-library/user-event';
import { TEST_ID as CHRCTR_DTLS_TEST_ID } from '../src/components/CharacterDetails/CharacterDetails';
import { renderWithProviders } from './utils/utils';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';

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

describe('Card Component', () => {
  it('renders the relevant card data', async () => {
    server.use(...getHandlersByMockedArray([character]));

    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    expect(getByText(card, character.name)).toBeInTheDocument();
    expect(getByText(card, character.status)).toBeInTheDocument();
    expect(getByText(card, character.species)).toBeInTheDocument();
    expect(getByText(card, character.location.name)).toBeInTheDocument();
  });
});

describe('Click On A Card', () => {
  it('opens a detailed card component', async () => {
    server.use(...getHandlersByMockedArray([character]));

    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    const details = await screen.findByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();
  });
});
