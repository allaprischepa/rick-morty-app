import { rickMortyApi } from '../services/api/rickMortyApi';
import { API_ITEMS_PER_PAGE } from '../services/api/settings';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const serverSidePropsCallback = (store) => async (context) => {
  const characterID = context.params?.characterID || context.query.characterID;
  const id = isString(characterID) ? characterID : '';
  const page = context.params?.pageID;
  const searchTerm = context.params?.searchTerm;
  const itemsPerPage = context.params?.itemsPerPage;

  store.dispatch(
    rickMortyApi.endpoints.getData.initiate({
      searchTerm: isString(searchTerm) ? searchTerm : '',
      page: +(page || 1),
      itemsPerPage: +(itemsPerPage ?? API_ITEMS_PER_PAGE),
    })
  );

  store.dispatch(rickMortyApi.endpoints.getCharacterData.initiate(id));

  await Promise.all(store.dispatch(rickMortyApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
};
