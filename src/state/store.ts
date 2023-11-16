import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './searchTerm/searchTermSlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
