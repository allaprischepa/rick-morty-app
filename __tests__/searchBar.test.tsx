import { describe, it, vi, expect } from 'vitest';
import { getByRole, render, screen } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { TEST_ID as SEARCH_BAR_TEST_ID } from '../src/components/SearchBar/SearchBar';
import userEvent from '@testing-library/user-event';
import { SEARCH_TERM_NAME } from '../src/components/pages/MainPage/MainPage';

vi.mock('../src/services/dataLoader/dataLoader');

window.localStorage = {
  length: 1,
  key: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  getAll: vi.fn(),
};

describe('Search button', () => {
  it('saves the entered value to the local storage', async () => {
    const textToType = 'Nunc nulla';
    const setItemSpy = vi.spyOn(localStorage, 'setItem');

    render(<App />);

    const searchForm = screen.getByTestId(SEARCH_BAR_TEST_ID);

    const searchInput = getByRole(searchForm, 'textbox');
    await userEvent.type(searchInput, textToType);

    const searchButton = getByRole(searchForm, 'button');

    await userEvent.click(searchButton);

    expect(setItemSpy).toHaveBeenCalledWith(SEARCH_TERM_NAME, textToType);
  });
});

describe('Search Сomponent', () => {
  it('retrieves the value from the local storage upon mounting', () => {
    const getItemSpy = vi.spyOn(localStorage, 'getItem');

    render(<App />);

    expect(getItemSpy).toHaveBeenCalledWith(SEARCH_TERM_NAME);
  });
});
