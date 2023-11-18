import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { searchTermReducer } from './searchTerm/searchTermSlice';
import { itemsPerPageReducer } from './itemsPerPage/itemsPerPageSlice';
import { useSelector } from 'react-redux';
import {
  rickMortyApi,
  rickMortyApiReducer,
} from '../services/api/rickMortyApi';

const rootReducer = combineReducers({
  searchTerm: searchTermReducer,
  itemsPerPage: itemsPerPageReducer,
  rickMortyApi: rickMortyApiReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickMortyApi.middleware),
  });
};

export const store = setupStore({});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function useSelectorCustom<K extends 'searchTerm' | 'itemsPerPage'>(
  key: K
): RootState[K]['value'] {
  return useSelector((state: RootState) => state[key]['value']);
}
