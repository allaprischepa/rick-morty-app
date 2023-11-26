import { describe, it, vi, expect, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SEARCH_TERM_NAME } from '../src/state/searchTerm/searchTermSlice';
import MainPage, { getServerSideProps } from '../pages/page/[pageID]';
import { gsspCtx } from './utils/utils';
import Cookies from 'cookies';

afterEach(() => {
  localStorage.clear();
});

describe('Search button', () => {
  it('saves the entered value to the cookie', async () => {
    const textToType = 'Nunc nulla';
    const setSpyOn = vi.spyOn(Cookies.prototype, 'set');

    const { props } = await getServerSideProps(
      gsspCtx({
        query: {
          searchTerm: textToType,
        },
      })
    );

    render(<MainPage {...props} />);

    expect(setSpyOn).toHaveBeenCalledWith(SEARCH_TERM_NAME, textToType);
  });
});

describe('Search Сomponent', () => {
  it('retrieves the value from the cookie', async () => {
    const text = 'Vivamus elementum';

    const getSpyOn = vi.spyOn(Cookies.prototype, 'get');
    getSpyOn.mockReturnValue(text);

    const { props } = await getServerSideProps(
      gsspCtx({
        query: {
          searchTerm: null,
        },
      })
    );

    render(<MainPage {...props} />);

    expect(getSpyOn).toHaveBeenCalledWith(SEARCH_TERM_NAME);

    expect(props.searchTerm).toEqual(text);
  });
});
