import { rickMortyApi } from '../services/api/rickMortyApi';
import { updateItemsPerPage } from '../state/itemsPerPage/itemsPerPageSlice';
import {
  SEARCH_TERM_NAME,
  updateSearchTerm,
} from '../state/searchTerm/searchTermSlice';
import {
  VIEW_MODE_GRID,
  VIEW_MODE_LIST,
  setGrid,
  setList,
} from '../state/viewMode/viewModeSlice';
import Cookies from 'cookies';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const serverSidePropsCallback = (store) => async (context) => {
  const getQueryValue = (name: string) => context.query[name];

  const getStateValue = (name: string) => {
    const state = store.getState();
    return state[name].value;
  };

  const cookies = new Cookies(context.req, context.res);

  let characterData;
  const characterID = getQueryValue('characterID');
  const pageID = getQueryValue('pageID');

  let searchTermQ = getQueryValue('searchTerm');
  searchTermQ = isString(searchTermQ)
    ? searchTermQ
    : cookies.get(SEARCH_TERM_NAME);
  const itemsPerPageQ =
    getQueryValue('itemsPerPage') || cookies.get('itemsPerPage');
  const viewModeQ = getQueryValue('viewMode') || cookies.get('viewMode');

  if (searchTermQ) {
    store.dispatch(updateSearchTerm(searchTermQ));
    cookies.set(SEARCH_TERM_NAME, searchTermQ);
  } else {
    store.dispatch(updateSearchTerm(null));
    cookies.set(SEARCH_TERM_NAME, null);
  }
  if (itemsPerPageQ) {
    store.dispatch(updateItemsPerPage(itemsPerPageQ));
    cookies.set('itemsPerPage', itemsPerPageQ);
  }
  if (viewModeQ) {
    if (viewModeQ === VIEW_MODE_GRID) store.dispatch(setGrid());
    if (viewModeQ === VIEW_MODE_LIST) store.dispatch(setList());
    cookies.set('viewMode', viewModeQ);
  }

  const searchTerm = getStateValue('searchTerm') || '';
  const itemsPerPage = getStateValue('itemsPerPage');
  const viewMode = getStateValue('viewMode');

  const listData = await store.dispatch(
    rickMortyApi.endpoints.getData.initiate({
      searchTerm,
      page: pageID,
      itemsPerPage,
    })
  );

  if (characterID) {
    characterData = await store.dispatch(
      rickMortyApi.endpoints.getCharacterData.initiate(characterID)
    );
  }

  await Promise.all(store.dispatch(rickMortyApi.util.getRunningQueriesThunk()));

  return {
    props: {
      searchTerm,
      itemsPerPage,
      viewMode,
      listData: listData?.data ?? null,
      characterData: characterData?.data ?? null,
    },
  };
};
