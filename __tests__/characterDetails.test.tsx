import { describe, it, expect, vi } from 'vitest';
import { screen, getByText, getByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import {
  TEST_ID as CHRCTR_DTLS_TEST_ID,
  CLOSE_BTN_TEST_ID,
} from '../src/components/CharacterDetails/CharacterDetails';
import { gsspCtx } from './utils/utils';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';
import { server } from '../src/services/api/__mocks__/server';
import DetailsPage, {
  getServerSideProps,
} from '../pages/page/[pageID]/details/[characterID]';
import { useRouter } from 'next/router';

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

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {
      pageID: 1,
      characterID: 8,
    },
    pathname: `/page/1/details/8`,
    push: vi.fn(),
  }),
}));

describe('Detailed Card Component', () => {
  it('correctly displays the detailed card data', async () => {
    server.use(...getHandlersByMockedArray([character]));

    const res = await getServerSideProps(
      gsspCtx({
        query: {
          characterID: `${character.id}`,
        },
      })
    );

    render(<DetailsPage {...res.props} />);

    const details = screen.getByTestId(CHRCTR_DTLS_TEST_ID);
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

    const res = await getServerSideProps(
      gsspCtx({
        query: {
          characterID: `${character.id}`,
        },
      })
    );

    render(<DetailsPage {...res.props} />);

    const { push } = useRouter();

    const details = screen.getByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();

    const closeBtn = getByTestId(details, CLOSE_BTN_TEST_ID);
    expect(closeBtn).toBeInTheDocument();

    await userEvent.click(closeBtn);

    expect(push).toHaveBeenCalledWith(
      expect.objectContaining({ pathname: '/page/1' }),
      '/page/1',
      expect.objectContaining({ scroll: false, shallow: true })
    );
  });
});
