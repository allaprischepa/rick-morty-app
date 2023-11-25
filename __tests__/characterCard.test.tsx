import { describe, it, expect, vi } from 'vitest';
import { screen, getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_CARD_TEST_ID } from '../src/components/CharacterCard/CharacterCard';
import userEvent from '@testing-library/user-event';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';
import MainPage, { getServerSideProps } from '../pages/page/[pageID]';
import { gsspCtx } from './utils/utils';
import { useRouter } from 'next/router';

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

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {
      pageID: 1,
    },
    pathname: `/page/1`,
    push: vi.fn(),
  }),
}));

describe('Card Component', () => {
  it('renders the relevant card data', async () => {
    server.use(...getHandlersByMockedArray([character]));

    const res = await getServerSideProps(gsspCtx());

    render(<MainPage {...res.props} />);

    const card = screen.getByTestId(CHRCTR_CARD_TEST_ID);
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

    const res = await getServerSideProps(gsspCtx());

    render(<MainPage {...res.props} />);

    const { push } = useRouter();

    const card = screen.getByTestId(CHRCTR_CARD_TEST_ID);
    expect(card).toBeInTheDocument();

    await userEvent.click(card);

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: `/page/1/details/${character.id}` }),
      `/page/1/details/${character.id}`,
      expect.objectContaining({ scroll: false })
    );
  });
});
