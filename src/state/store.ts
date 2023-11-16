import { configureStore } from '@reduxjs/toolkit';
import { searchTermReducer } from './searchTerm/searchTermSlice';
import { itemsPerPageReducer } from './itemsPerPage/itemsPerPageSlice';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    itemsPerPage: itemsPerPageReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useSelectorCustom<K extends keyof RootState>(
  key: K
): RootState[K]['value'] {
  return useSelector((state: RootState) => state[key]['value']);
}
