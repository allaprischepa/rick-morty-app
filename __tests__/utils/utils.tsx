import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { CharacterData } from '../../src/types/types';
import searchTermReducer from '../../src/state/searchTerm/searchTermSlice';

const characterDataMock: CharacterData[] = [
  {
    id: 1,
    name: 'Vivamus',
    status: 'Maecenas',
    species: 'Ut',
    type: 'Sed',
    gender: 'Cras',
    origin: {
      name: 'Fusce',
      url: 'Fusce',
    },
    location: {
      name: 'Praesent',
      url: 'Vestibulum',
    },
    image: 'Phasellus',
  },
];

export const getCharactersArray = (length: number) => {
  return Array.from(Array(length), (_, ind) =>
    Object.assign({}, ...characterDataMock, { id: ind + 1 })
  );
};

export const getRandomCharactersArray = () => {
  const length = Math.ceil(Math.random() * 100 + 30);
  return Array.from(Array(length), (_, ind) =>
    Object.assign({}, ...characterDataMock, { id: ind + 1 })
  );
};

export function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      searchTerm: searchTermReducer,
    },
  });

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
