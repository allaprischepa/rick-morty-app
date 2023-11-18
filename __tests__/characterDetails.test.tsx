import { describe, it, expect } from 'vitest';
import { screen, getByText, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../src/components/App/App';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_CARD_TEST_ID } from '../src/components/CharacterCard/CharacterCard';
import {
  TEST_ID as CHRCTR_DTLS_TEST_ID,
  CLOSE_BTN_TEST_ID,
} from '../src/components/CharacterDetails/CharacterDetails';
import { TEST_ID as LOADER_TEST_ID } from '../src/components/Loader/Loader';
import { renderWithProviders } from './utils/utils';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';

const character: CharacterData = {
  id: 8,
  name: 'Praesent',
  status: 'Proin faucibus',
  species: 'Sed',
  type: 'Magna',
  gender: 'Aenean',
  origin: {
    name: 'Congue erat at massa',
    url: 'Vestibulum',
  },
  location: {
    name: 'Purus nec pulvinar',
    url: 'Facilisis',
  },
  image: 'In',
};

describe('Loading Indicator', () => {
  it('is displayed while fetching the Details data', async () => {
    server.use(...getHandlersByMockedArray([character]));

    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    userEvent.click(card);

    const loader = await screen.findByTestId(LOADER_TEST_ID);
    expect(loader).toBeInTheDocument();
  });
});

describe('Detailed Card Component', () => {
  it('correctly displays the detailed card data', async () => {
    server.use(...getHandlersByMockedArray([character]));
    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    const details = await screen.findByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();

    expect(getByText(details, character.name)).toBeInTheDocument();
    expect(getByText(details, character.status)).toBeInTheDocument();
    expect(getByText(details, character.species)).toBeInTheDocument();
    expect(getByText(details, character.type)).toBeInTheDocument();
    expect(getByText(details, character.gender)).toBeInTheDocument();
    expect(getByText(details, character.origin.name)).toBeInTheDocument();
    expect(getByText(details, character.location.name)).toBeInTheDocument();
  });
});

describe('Clicking On The Close Button', () => {
  it('hides the Details component', async () => {
    server.use(...getHandlersByMockedArray([character]));

    renderWithProviders(<App />);

    const card = await screen.findByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    const details = await screen.findByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();

    const closeBtn = getByTestId(details, CLOSE_BTN_TEST_ID);
    expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);

    expect(screen.queryByTestId(CHRCTR_DTLS_TEST_ID)).toBeNull();
  });
});
