import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterData } from '../src/types/types';
import { TEST_ID as CHRCTR_DTLS_TEST_ID } from '../src/components/CharacterDetails/CharacterDetails';
import { API_URL } from '../src/services/api/settings';
import { gsspCtx } from './utils/utils';
import { server } from '../src/services/api/__mocks__/server';
import { getHandlersByMockedArray } from '../src/services/api/__mocks__/handler';
import DetailsPage, {
  getServerSideProps,
} from '../pages/page/[pageID]/details/[characterID]';

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
      characterID: 8,
    },
    pathname: `/page/1/details/8`,
    push: vi.fn(),
  }),
}));

describe('Opening Details', () => {
  it('triggers an additional API call to fetch detailed information.', async () => {
    const requestSpy = vi.fn();
    server.events.on('request:start', requestSpy);

    server.use(...getHandlersByMockedArray([character]));

    const res = await getServerSideProps(
      gsspCtx({
        query: {
          characterID: `${character.id}`,
        },
      })
    );

    render(<DetailsPage {...res.props} />);

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({
          url: `${API_URL}/${character.id}`,
        }),
      })
    );

    const details = screen.getByTestId(CHRCTR_DTLS_TEST_ID);
    expect(details).toBeInTheDocument();
  });
});
