import { describe, it, vi, expect } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../src/components/App/App';
import '@testing-library/jest-dom';
import { TEST_ID as CHRCTRS_LIST_TEST_ID } from '../src/components/CharactersList/CharactersList';
import DataLoader from '../src/services/dataLoader/__mocks__/dataLoader';

vi.mock('../src/services/dataLoader/dataLoader');

describe('Card List Component', () => {
  it('renders the specified number of cards', async () => {
    const totalAmount = Math.ceil(Math.random() * 100 + 5);
    DataLoader.setTotalAmount(totalAmount);

    render(<App />);

    await waitFor(() => {
      const characterCards = screen.getByTestId(CHRCTRS_LIST_TEST_ID).children;

      expect(characterCards.length > 0).toBe(true);
      expect(characterCards.length).toEqual(totalAmount);
    });
  });
});

describe('Appropriate message', () => {
  it('is displayed if no cards are present', async () => {
    const totalAmount = 0;
    DataLoader.setTotalAmount(totalAmount);

    render(<App />);

    await waitFor(() => {
      const characterCards = screen.getByTestId(CHRCTRS_LIST_TEST_ID).children;

      expect(characterCards.length).toEqual(1);
      expect(screen.getByText('Not found')).toBeInTheDocument();
      expect(
        screen.getByText(/There is no such character/)
      ).toBeInTheDocument();
    });
  });
});
