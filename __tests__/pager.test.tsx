import { describe, it, vi, expect } from 'vitest';
import { screen, getByTitle } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import DataLoader from '../src/services/dataLoader/__mocks__/dataLoader';
import { getCharactersArray, renderWithProviders } from './utils/utils';
import { TEST_ID as PAGER_TEST_ID } from '../src/components/Pager/Pager';
import userEvent from '@testing-library/user-event';

vi.mock('../src/services/dataLoader/dataLoader');

describe('Pagination Сomponent:', () => {
  it('updates URL query parameter when page changes', async () => {
    const characters = getCharactersArray(500);
    DataLoader.setResults(characters);

    renderWithProviders(<App />);

    const pager = await screen.findByTestId(PAGER_TEST_ID);
    expect(pager).toBeInTheDocument();
    expect(location.pathname).toContain('page/1');

    const nextPage = getByTitle(pager, 'page 2');
    expect(nextPage).toBeInTheDocument();

    await userEvent.click(nextPage);

    expect(location.pathname).toContain('page/2');
  });
});
