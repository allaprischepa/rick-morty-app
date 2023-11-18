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
import { loadingListReducer } from './loadingList/loadingListSlice';
import { loadingDetailsReducer } from './loadingDetails/loadingDetailsSlice';
import { viewModeSliceReducer } from './viewMode/viewModeSlice';

const rootReducer = combineReducers({
  searchTerm: searchTermReducer,
  itemsPerPage: itemsPerPageReducer,
  rickMortyApi: rickMortyApiReducer,
  loadingList: loadingListReducer,
  loadingDetails: loadingDetailsReducer,
  viewMode: viewModeSliceReducer,
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

type Keys =
  | 'searchTerm'
  | 'itemsPerPage'
  | 'loadingList'
  | 'loadingDetails'
  | 'viewMode';
export function useSelectorCustom<K extends Keys>(
  key: K
): RootState[K]['value'] {
  return useSelector((state: RootState) => state[key]['value']);
}
