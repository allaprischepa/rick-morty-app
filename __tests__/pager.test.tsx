import { describe, it, expect } from 'vitest';
import { screen, getByTitle } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utils/utils';
import { TEST_ID as PAGER_TEST_ID } from '../src/components/Pager/Pager';
import userEvent from '@testing-library/user-event';

describe('Pagination Сomponent:', () => {
  it.skip('updates URL query parameter when page changes', async () => {
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
