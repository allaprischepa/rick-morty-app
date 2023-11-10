import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../components/App/App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    screen.debug();
  });
});
