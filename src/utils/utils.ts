import { rickMortyApi } from '../services/api/rickMortyApi';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const serverSidePropsCallback = (store) => async (context) => {
  const getValue = (name: string) => {
    const state = store.getState();
    const value =
      context.query[name] || context.params[name] || state[name].value;

    return value;
  };

  const characterID = context.params?.characterID || context.query.characterID;
  const pageID = context.params?.pageID || context.query.pageID;
  const searchTerm = getValue('searchTerm');
  const itemsPerPage = getValue('itemsPerPage');
  const viewMode = getValue('viewMode');

  const listData = await store.dispatch(
    rickMortyApi.endpoints.getData.initiate({
      searchTerm,
      page: pageID,
      itemsPerPage,
    })
  );

  const characterData = await store.dispatch(
    rickMortyApi.endpoints.getCharacterData.initiate(characterID)
  );

  await Promise.all(store.dispatch(rickMortyApi.util.getRunningQueriesThunk()));

  return {
    props: {
      searchTerm,
      itemsPerPage,
      viewMode,
      listData: listData.data,
      characterData: characterData.data,
    },
  };
};
