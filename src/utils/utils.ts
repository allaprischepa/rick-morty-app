import { rickMortyApi } from '../services/api/rickMortyApi';
import { updateItemsPerPage } from '../state/itemsPerPage/itemsPerPageSlice';
import { updateSearchTerm } from '../state/searchTerm/searchTermSlice';
import {
  VIEW_MODE_GRID,
  VIEW_MODE_LIST,
  setGrid,
  setList,
} from '../state/viewMode/viewModeSlice';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const serverSidePropsCallback = (store) => async (context) => {
  const getQueryContextValue = (name: string) =>
    context.query[name] || context.params[name];

  const getStateValue = (name: string) => {
    const state = store.getState();
    return state[name].value;
  };

  let characterData;
  const characterID = getQueryContextValue('characterID');
  const pageID = getQueryContextValue('pageID');
  const searchTermQuery = getQueryContextValue('searchTerm');
  const itemsPerPageQuery = getQueryContextValue('itemsPerPage');
  const viewModeQuery = getQueryContextValue('viewMode');

  if (searchTermQuery) store.dispatch(updateSearchTerm(searchTermQuery));
  if (itemsPerPageQuery) store.dispatch(updateItemsPerPage(itemsPerPageQuery));
  if (viewModeQuery === VIEW_MODE_GRID) store.dispatch(setGrid());
  if (viewModeQuery === VIEW_MODE_LIST) store.dispatch(setList());

  const searchTerm = getStateValue('searchTerm');
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
