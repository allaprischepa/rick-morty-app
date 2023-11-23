import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('404 Page', () => {
  it.skip('is displayed when navigating to an invalid route', async () => {
    const invalidRoute = '/vivamus-in-erat';
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [invalidRoute],
    });

    render(<RouterProvider router={router} />);

    const notFound = await screen.findByText(/The page is not found/);
    expect(notFound).toBeInTheDocument();
  });
});
