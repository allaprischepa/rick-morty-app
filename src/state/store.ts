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
import { createWrapper } from 'next-redux-wrapper';

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

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof setupStore>['dispatch'];

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

export const wrapper = createWrapper<AppStore>(setupStore);
