import { configureStore } from '@reduxjs/toolkit';
import { countryListSlice } from './countryList/countryListSlice';
import { useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    countryList: countryListSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

type Keys = 'countryList';

export function useAppSelector<K extends Keys>(key: K): RootState[K]['value'] {
  return useSelector((state: RootState) => state[key]['value']);
}
