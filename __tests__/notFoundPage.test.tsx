import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../pages/_error';

describe('404 Page', () => {
  it('is displayed when navigating to an invalid route', async () => {
    render(<Error statusCode={404} />);

    const notFound = await screen.findByText(/The page is not found/);
    expect(notFound).toBeInTheDocument();
  });
});
